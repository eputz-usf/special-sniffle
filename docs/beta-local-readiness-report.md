# Local Beta Readiness Report

Prepared October 7, 2026 for the current public Bellini Degree Explorer beta.

## Completed Work

- Removed simulated login/signup/account code. User-group selection navigates directly to dashboards. Legacy account and home URLs redirect to user-group selection; the generic template-dashboard URL redirects to the explorer.
- Made direct explorer/detail/comparison links independent of browser storage. Unknown source parameters use Bellini context; recognized groups retain their context. Blocked browser storage no longer prevents public group navigation.
- Preserved the Bellini degree explorer and disabled coming-soon tools. Removed picture placeholders and unfinished default dashboard text.
- Added missing-page and application-error recovery screens, an explorer favicon, description, and per-page titles.
- Added skip navigation, main-content focus after route changes, selected-filter semantics, comparison-table roles, degree labels in stacked mobile comparisons, and reduced-motion handling.
- Resized the logo and split routes into page chunks.
- Corrected the malformed AI program URL and the parent-page experiential-learning URL using official USF sources.
- Added regression tests, URL syntax checks, and an optional online link-report command.
- Updated the README, production readiness checklist, access request, and detailed handoff checklist for the current static beta.

## Verification Results

| Check | Result | Limits |
| --- | --- | --- |
| Clean install | `npm ci --offline` passed | Verified on local Node 25.1.0; `.nvmrc` selects Node 22 for the recommended build environment. Node 22 execution still needs verification on that environment. |
| Lint and production build | Passed through `npm run check` | Does not prove CMS integration or production routing. |
| Automated regressions | 16 tests passed | Node-based logic and server-rendered component checks; not browser end-to-end tests. |
| URL syntax | 66 unique external references checked | Source-reference check, not full rendered-site crawling. |
| Online links | 53 HTTP 200 responses; 13 HTTP 202 responses; no HTTP 4xx/5xx responses after corrections | HTTP 202 interstitials and login-gated resources require manual inspection. A success code does not verify content correctness. |
| Dependency review | Compatible fixes applied; npm reported zero advisories afterward | Snapshot of the registry review; rerun before publishing. |
| Basic credential-pattern review | No matches in application source/documentation | Not a full Git-history audit. Final delivery archive must exclude `.env.local` and private/local files. |

The automated regressions cover source validation, unavailable browser storage, public explorer links, Bellini's disabled tools, all five detailed degrees, valid/invalid comparisons, comparison selection limits and replacement, source-preserving comparison URLs, and missing-page recovery.

## Build Size Changes

- Logo asset: **1,129.83 KB → 71.44 KB** (approximately 94% smaller).
- Main JavaScript entry: **487.11 KB → 238.33 KB** (approximately 51% smaller; approximately 76.34 KB gzip).
- Other pages now load in separate chunks. These numbers describe build artifacts, not measured download time or Core Web Vitals.

## Checks Still Needed

Browser access was unavailable to the agent in this session, so the following checks have not been claimed as passed:

- Keyboard interaction, comparison selection/removal in the browser, and back/forward behavior.
- Visual focus, contrast, mobile layouts, 200% zoom, and logo quality at the displayed size.
- Screen-reader checks and automated browser accessibility scans.
- Console/network inspection and mobile performance measurements.

The current styles still load Google Fonts. The webmaster must approve the external font origins or provide approved local alternatives.

Academic review remains pending for detailed coursework, credit totals, catalog-year consistency, salary/employment figures, future-program status, and the scope of program coverage. See [content-review.md](content-review.md).

## Depends on Webmaster Answers

Final URL/base-path configuration, route fallback, CMS/iframe integration, university layout, published route/group scope, support contact, indexing, response headers, caching, staging tests, and launch approval remain pending.

See [beta-webmaster-handoff.md](beta-webmaster-handoff.md) for the checked task list.
