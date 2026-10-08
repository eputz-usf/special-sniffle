import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { before, after, test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createServer } from 'vite';
let server, options, filterDegrees;
const audiences = [];
before(async () => {
  server = await createServer({ cacheDir: join(tmpdir(), `cic-beta-vite-tests-${process.pid}`), server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' });
  options = (await server.ssrLoadModule('/src/data/highSchoolFutureDegreeOptions.ts')).plannedHighSchoolFutureDegreeOptions;
  filterDegrees = (await server.ssrLoadModule('/src/utils/degreeFilters.ts')).filterDegrees;
  for (const high of [false, true]) {
    const base = high ? '/high-school/degrees' : '/degrees';
    const dir = high ? '/src/pages/highSchool/degrees/HighSchool' : '/src/pages/degrees/';
    audiences.push({ base, high, data: (await server.ssrLoadModule(high ? '/src/data/highSchoolDegrees.ts' : '/src/data/degrees.ts')).degrees,
      explorer: (await server.ssrLoadModule(`${dir}DegreeInformation.tsx`)).default,
      detail: (await server.ssrLoadModule(`${dir}DegreeDetail.tsx`)).default,
      comparison: (await server.ssrLoadModule(`${dir}DegreeComparison.tsx`)).default });
  }
});
after(async () => { await server?.close(); });
function render(Component, path, route = '*') {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(Routes, null, React.createElement(Route, { path: route, element: React.createElement(Component) }))));
}
test('both explorers show the main five and all seven distinct interdisciplinary cards', () => {
  assert.equal(options.length, 7);
  for (const audience of audiences) {
    assert.equal(audience.data.length, 12);
    assert.equal(new Set(audience.data.map(d => d.slug)).size, 12);
    const html = render(audience.explorer, audience.base);
    assert.equal((html.match(/class="degree-card"/g) ?? []).length, 12);
    assert.equal((html.match(/id="interdisciplinary-heading"/g) ?? []).length, 1);
    for (const option of options) {
      assert.equal((html.match(new RegExp(`href="${audience.base}/${option.slug}(?:\\?[^\"]*)?"`, 'g')) ?? []).length, 1);
    }
    assert.equal(filterDegrees(audience.data, 'All').length, 12);
    assert.deepEqual(filterDegrees(audience.data, 'Interdisciplinary').map(d => d.slug), options.map(d => d.slug));
    for (const category of ['Software', 'AI/Data', 'Cybersecurity', 'IT/Systems']) {
      assert.ok(filterDegrees(audience.data, category).every(d => !d.status && d.category === category));
    }
    assert.deepEqual(filterDegrees(audience.data, 'unknown'), []);
  }
});
test('every detail page retains official resources, unavailable labels, and audience navigation', () => {
  for (const audience of audiences) for (const from of audience.high ? ['prospective-student'] : ['transfer-student', 'current-usf-student', 'current-bellini-student']) for (const option of options) {
    const html = render(audience.detail, `${audience.base}/${option.slug}?from=${from}`, `${audience.base}/:degreeSlug`);
    assert.doesNotMatch(html, /Choosing Electives|Important Program Notes|Admissions status pending confirmation/);
    assert.doesNotMatch(html, /Electives coming soon|Official elective information is not yet available/);
    const headings = audience.high
      ? ['What This Degree Focuses On', 'Jobs You Could Explore', 'This Degree May Be a Good Fit', 'Skills Students May Build', 'Class Plans and Official Details', 'Want to Compare', 'Questions to Ask an Advisor']
      : ['What This Degree Focuses On', 'This Degree May Be a Good Fit', 'Skills Students May Build', 'Flowcharts, Plans, and Electives', 'Want to Compare', 'Career Outlook', 'Questions to Ask an Advisor'];
    for (let i = 1; i < headings.length; i++) assert.ok(html.indexOf(headings[i - 1]) < html.indexOf(headings[i]), `${option.slug}: ${headings[i]} section order`);
    for (const style of ['computer-science-detail', 'cs-hero', 'degree-overview-card', 'degree-fit-grid', 'resource-card', 'degree-next-steps', 'degree-catalog-action']) assert.ok(html.includes(style));

    for (const url of [option.programUrl, ...option.planningResources.map(r => r.url)]) assert.ok(html.includes(url.replaceAll('&', '&amp;')));
    assert.ok(html.includes(`${audience.base}${audience.high ? '' : `?from=${from}`}#interdisciplinary`));
    assert.doesNotMatch(html, /Add to Profile|course-overlap|transcript-upload/);
  }
});
test('direct main/interdisciplinary and every distinct interdisciplinary pair resolve in both explorers', () => {
  for (const audience of audiences) for (const first of ['computer-science', ...options.map(d => d.slug)]) for (const second of options.map(d => d.slug)) {
    if (first === second) continue;
    const html = render(audience.comparison, `${audience.base}/compare?first=${first}&second=${second}&from=current-bellini-student`);
    assert.match(html, /role="table"/);
    assert.match(html, /aria-labelledby="comparison-first comparison-/);
    assert.match(html, /#interdisciplinary/);
    if (audience.high) {
      assert.match(html, /Writing code/);
      assert.doesNotMatch(html, /Program-specific skills pending academic review/);
    } else assert.match(html, /Program-specific skills pending academic review/);
    assert.doesNotMatch(html, /Select Two Degrees to Compare/);
  }
});
test('future-options pages contain only the two anticipated degrees and retain audience context', async () => {
  for (const audience of audiences) {
    const file = audience.high ? '/src/pages/highSchool/degrees/HighSchoolFutureDegreeOptions.tsx' : '/src/pages/degrees/FutureDegreeOptions.tsx';
    const Component = (await server.ssrLoadModule(file)).default;
    const html = render(Component, `${audience.base}/future-options?from=transfer-student`);
    assert.equal((html.match(/class="degree-card"/g) ?? []).length, 2);
    assert.match(html, /Computer Science and Anthropology/);
    assert.match(html, /Computer Science and Economics/);
    assert.match(html, /Anticipated Degrees for 2027/);
    assert.doesNotMatch(html, /Add to Compare|Criminology|Fintech/);
    assert.ok(html.includes(`href="${audience.base}${audience.high ? '' : '?from=transfer-student'}"`));
    const explorer = render(audience.explorer, audience.base);
    assert.ok(explorer.includes(`${audience.base}/future-options`));
  }
});

test('high-school interdisciplinary text is distinct and keeps all seven names and resources', async () => {
  const plain = (await server.ssrLoadModule('/src/data/highSchoolInterdisciplinaryContent.ts')).highSchoolInterdisciplinaryContent;
  assert.deepEqual(Object.keys(plain).sort(), options.map(o => o.slug).sort());
  for (const option of options) {
    const high = audiences.find(a => a.high);
    const shared = audiences.find(a => !a.high);
    const highCard = high.data.find(d => d.slug === option.slug);
    assert.equal(highCard.description, plain[option.slug].cardDescription);
    assert.equal(highCard.name, option.name);
    assert.equal(shared.data.find(d => d.slug === option.slug).description, option.cardDescription);
    const html = render(high.detail, `${high.base}/${option.slug}`, `${high.base}/:degreeSlug`);
    assert.match(html, /Choose Add to Compare on this card and one other card/);
    assert.match(html, /Ask an advisor which plan/);
    assert.doesNotMatch(html, /interdisciplinary capstone|synthesize|academic review|catalog-year applicability/);
    for (const paragraph of plain[option.slug].overview) assert.ok(html.includes(paragraph.replaceAll('&', '&amp;')));
  }
});
