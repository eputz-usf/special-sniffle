import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = await Promise.all(entries.map(async entry => {
    const file = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(file) : /\.(tsx?|css)$/.test(file) ? [file] : [];
  }));
  return results.flat();
}

const links = new Map();
const malformed = [];
for (const file of await sourceFiles('src')) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/https?:\/\/[^'"`\s<>]+/g)) {
    const url = match[0].replace(/[),;]+$/, '');
    const locations = links.get(url) ?? [];
    locations.push(`${file}:${source.slice(0, match.index).split('\n').length}`);
    links.set(url, locations);
    try {
      const parsed = new URL(url);
      if (/\s|%20\.aspx/.test(parsed.href) || /\/\.aspx$/.test(parsed.pathname)) malformed.push({ url, file });
    } catch { malformed.push({ url, file }); }
  }
  if (/https?:\/\/[^'"`\n]*\s+\.aspx/.test(source)) malformed.push({ file, reason: 'Whitespace in program URL' });
}

console.log(`Checked URL syntax for ${links.size} unique external references.`);
if (malformed.length) {
  console.error(malformed);
  process.exitCode = 1;
}

// Explicit opt-in: online checks transmit only public URLs already in source.
// Authentication gates, rate limits, and bot protection require manual review.
if (process.argv.includes('--online')) {
  const report = [];
  const queue = [...links];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const [url, locations] = queue.shift();
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(12000), redirect: 'follow' });
        await response.body?.cancel();
        report.push({ url, locations, status: response.status, finalUrl: response.url });
      } catch (error) {
        report.push({ url, locations, error: error.message });
      }
    }
  }));
  const destination = resolve('docs/external-link-report.json');
  await writeFile(destination, JSON.stringify({ checkedAt: new Date().toISOString(), results: report }, null, 2) + '\n');
  console.log(`Wrote ${report.length} results to ${destination}. Review non-2xx results manually.`);
}
