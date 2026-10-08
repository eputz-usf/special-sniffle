import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createServer } from 'vite';

let server;
let source;
let comparison;
let session;
let DegreeInformation;
let DegreeDetail;
let DegreeComparison;
let BelliniDashboard;
let NotFound;

before(async () => {
  server = await createServer({ cacheDir: join(tmpdir(), `cic-beta-vite-tests-${process.pid}`), server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' });
  source = await server.ssrLoadModule('/src/utils/degreeSource.ts');
  comparison = await server.ssrLoadModule('/src/utils/degreeComparison.ts');
  session = await server.ssrLoadModule('/src/utils/userSession.ts');
  DegreeInformation = (await server.ssrLoadModule('/src/pages/degrees/DegreeInformation.tsx')).default;
  DegreeDetail = (await server.ssrLoadModule('/src/pages/degrees/DegreeDetail.tsx')).default;
  DegreeComparison = (await server.ssrLoadModule('/src/pages/degrees/DegreeComparison.tsx')).default;
  BelliniDashboard = (await server.ssrLoadModule('/src/pages/belliniStudent/BelliniStudentDashboard.tsx')).default;
  NotFound = (await server.ssrLoadModule('/src/pages/NotFound.tsx')).default;
});
after(async () => { await server?.close(); });

function renderPage(Component, path, route = '*') {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] },
    React.createElement(Routes, null, React.createElement(Route, { path: route, element: React.createElement(Component) }))));
}

test('fresh or unrecognized source gets Bellini context; recognized sources retain their context', () => {
  for (const value of [null, '', '__proto__', 'constructor', 'unknown&first=bad']) {
    assert.equal(source.getDegreeSource(value), 'current-bellini-student');
  }
  assert.equal(source.getDegreeSource('current-usf-student'), 'current-usf-student');
  assert.equal(source.getDegreeUserType('current-bellini-student'), 'current-bellini-student');
});

test('blocked browser storage cannot prevent public navigation', async () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Storage blocked'); } });
  try {
    await session.userSessionStore.saveUserType('current-bellini-student');
    assert.equal(await session.userSessionStore.getUserType(), null);
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  }
});

test('direct explorer link provides details and comparison controls without a stored user group', () => {
  const html = renderPage(DegreeInformation, '/degrees');
  assert.match(html, /degrees\/computer-science\?from=current-bellini-student/);
  assert.match(html, /Add to Compare/);
  assert.match(html, /aria-pressed="true"/);
  assert.doesNotMatch(html, /Add to Profile|Remove from Profile/);
});

test('Bellini dashboard exposes only the explorer tool and disables future tools', () => {
  const html = renderPage(BelliniDashboard, '/dashboard/current-bellini-student');
  assert.match(html, /href="\/degrees\?from=current-bellini-student"/);
  assert.doesNotMatch(html, /href="\/bellini-student\//);
  assert.doesNotMatch(html, /space for picture|Specified text/);
  assert.equal((html.match(/disabled=""/g) ?? []).length, 5);
  assert.ok(html.indexOf('Degree Explorer for Major Changes') < html.indexOf('Major Change Guide'));
});

for (const slug of ['computer-science', 'computer-science-and-engineering', 'artificial-intelligence', 'cybersecurity', 'information-technology']) {
  test(`degree detail ${slug} renders in a fresh browser with Bellini advising context`, () => {
    const html = renderPage(DegreeDetail, `/degrees/${slug}?from=current-bellini-student`, '/degrees/:degreeSlug');
    assert.match(html, /Questions to Ask an Advisor/);
    assert.match(html, /major change within Bellini College/);
    assert.doesNotMatch(html, /Add to Profile|Remove from Profile/);
  });
}

test('valid comparison has labeled rows, degree names, and no retired overlap link', () => {
  const html = renderPage(DegreeComparison, '/degrees/compare?first=computer-science&second=artificial-intelligence&from=current-bellini-student');
  assert.match(html, /role="table"/);
  assert.match(html, /role="rowheader"/);
  assert.match(html, /What Changes If You Switch Between These Majors/);
  assert.match(html, /comparison-degree-name/);
  assert.doesNotMatch(html, /bellini-student\/course-overlap/);
});

for (const query of ['', '?first=computer-science&second=computer-science', '?first=unknown&second=artificial-intelligence']) {
  test(`invalid comparison ${query || '(empty)'} offers recovery`, () => {
    const html = renderPage(DegreeComparison, `/degrees/compare${query}`);
    assert.match(html, /Select Two Degrees to Compare/);
    assert.match(html, /href="\/degrees\?from=current-bellini-student"/);
  });
}

test('missing-page screen links directly to the public explorer', () => {
  const html = renderPage(NotFound, '/unavailable');
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/degrees\?from=current-bellini-student"/);
});

test('comparison selection accepts two distinct programs, rejects a third, and allows replacement after removal', () => {
  const first = comparison.addComparisonSlug([], 'computer-science');
  const duplicate = comparison.addComparisonSlug(first.slugs, 'computer-science');
  assert.deepEqual(duplicate.slugs, ['computer-science']);
  const second = comparison.addComparisonSlug(duplicate.slugs, 'artificial-intelligence');
  const third = comparison.addComparisonSlug(second.slugs, 'cybersecurity');
  assert.deepEqual(third.slugs, ['computer-science', 'artificial-intelligence']);
  assert.match(third.message, /only compare two/);
  const afterRemoval = third.slugs.filter(slug => slug !== 'artificial-intelligence');
  assert.deepEqual(comparison.addComparisonSlug(afterRemoval, 'cybersecurity').slugs, ['computer-science', 'cybersecurity']);
});

test('comparison navigation requires two distinct selections and preserves the Bellini source', () => {
  for (const slugs of [[], ['computer-science'], ['computer-science', 'computer-science'], ['a', 'b', 'c']]) {
    assert.equal(comparison.buildComparisonPath(slugs, 'current-bellini-student'), null);
  }
  const path = comparison.buildComparisonPath(['computer-science', 'artificial-intelligence'], 'current-bellini-student');
  const url = new URL(path, 'https://example.test');
  assert.equal(url.searchParams.get('first'), 'computer-science');
  assert.equal(url.searchParams.get('second'), 'artificial-intelligence');
  assert.equal(url.searchParams.get('from'), 'current-bellini-student');
});
