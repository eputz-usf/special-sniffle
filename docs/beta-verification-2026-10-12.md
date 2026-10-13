# Beta verification and handoff evidence

Updated October 12, 2026. Local working-tree evidence, not staging or publication approval. [beta_checklist.md](beta_checklist.md) is the sole task-status checklist.

## Build and source checks

`npm run check` passed after the font-loading change: lint, 22 regression tests, syntax of 65 external references, TypeScript and Vite build. Runtime: Node 25.1.0/npm 11.6.2. Recommended Node 22 verification remains pending. Tests use Node/server rendering and logic checks, not browser end-to-end execution.

Tests cover public context/storage recovery, explorer/details, selection and comparison URLs, invalid selections, disabled tools, interdisciplinary resources/pairs, audience wording and advising cautions. Earlier installation, dependency and link evidence is in [earlier local review](#earlier-local-readiness-review).

## Accessibility and browser evidence

| Check | Evidence | Limits |
| --- | --- | --- |
| Manual structure/labels, keyboard journey, visible focus, contrast, reduced motion, 200% zoom, narrow layout | User reported no issues | Prescribed sample: group selection, Bellini dashboard, explorer, main-degree detail, interdisciplinary detail and comparison. Exact routes/device/tool versions not recorded; not an exhaustive audit. |
| Desktop comparison Lighthouse Accessibility | User reported 100/100, 25 passed audits | Exact pair/export absent; compatible-element ARIA best-practice details not supplied. |
| Degree-page Lighthouse Accessibility | User reported 100/100, 22 passed audits | Explorer versus detail and device mode unconfirmed. Pasted ARIA check was passed. |
| Dashboard Lighthouse Accessibility | User reported 100/100 | Exact route/device/export absent. |
| Console | User reported no red errors after refresh and filter/add/remove/comparison journey | Interactive failed-request check not confirmed. |

Agent Chrome access was not approved. No agent-run browser pass is claimed. Screen-reader testing, remaining automated accessibility coverage, fresh-session/direct-link/query/refresh/history checks and target-device image/loading inspection remain open. Repeat relevant checks on staging.

## Mobile performance

User-supplied Lighthouse 13.4.1 reports, October 12 at 11:19–11:24 PM Eastern, with no run warnings:

| Page/build | Score | FCP | LCP | TBT | CLS | Speed Index | Report |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Prospective dashboard, before fonts change | 91 | 2.6 s | 2.6 s | 0 ms | 0.089 | 2.6 s | [Baseline](performance/prospective-dashboard-mobile-2026-10-12.json) |
| Prospective dashboard, after | 93 | 1.8 s | 2.7 s | 0 ms | 0.089 | 1.8 s | [Rescan](performance/prospective-dashboard-mobile-after-font-change-2026-10-12.json) |
| High-school explorer | 91 | 2.3 s | 3.2 s | 0 ms | 0 | 2.3 s | [Explorer](performance/high-school-explorer-mobile-2026-10-12.json) |
| High-school Computer Science detail | 90 | 2.3 s | 3.3 s | 0 ms | 0 | 2.3 s | [Detail](performance/high-school-computer-science-detail-mobile-2026-10-12.json) |

Reports use mobile form factor and simulated network/4× CPU slowdown, with screen emulation disabled. They do not prove actual phone loading or viewport behavior. Comparison performance scan was skipped at the user's request, not passed. Shared/Bellini performance coverage remains pending.

Moved Google Fonts from CSS import to an HTML stylesheet link, added preconnect hints and removed unused Epilogue. Updated asset hashes confirm the rescans used the change. Initial rendering improved in one dashboard run; LCP did not. Single-run differences are not guaranteed gains. Fonts remain a modeled render-blocking opportunity (450 ms dashboard, 1,050/1,090 ms explorer/detail); unused entry JavaScript is estimated at 30–34 KiB. No further change is inferred solely from these estimates.

Explorer/detail reports contain no HTTP 4xx/5xx or status-zero requests for their recorded loads. They include Performance only, not console or accessibility audits.

## Handoff and limitations

Local source snapshot: `handoff/bellini-beta-source-2026-10-12.zip`; manifest and checksum are alongside it. Allowlisted source/assets/tests/scripts/docs/configuration include package.json and lockfile; exclude Git history, node_modules, dist, environment files, credentials/private configuration, Supabase remnants and machine artifacts. The archive is refreshed when these docs change.

Unavailable profiles, guides/planners, overlap tools, transcript upload/extraction, intake quizzes and personalized recommendations are listed in the project README. Some non-Bellini dashboards still contain picture placeholders. Academic approval, external-font policy, final host/path, published scope and deployment/support ownership remain unresolved. Final deployment/rollback instructions and production build depend on hosting answers; no publication occurred.

## Earlier local readiness review

The earlier review removed simulated accounts and retired tools, added public-link recovery and accessibility semantics, corrected source URLs, split route chunks and optimized the logo.

Historical evidence retained:

- `npm ci --offline` passed on Node 25.1.0; recommended Node 22 execution still needs confirmation.
- Online link review: 53 HTTP 200 and 13 HTTP 202 responses, no HTTP 4xx/5xx after corrections. Interstitials and authenticated resources need human review.
- Dependency review reported zero advisories after fixes; rerun before publishing.
- Basic source/document credential-pattern review found no matches; it was not a Git-history audit.
- Logo reduced from 1,129.83 KB to 71.44 KB; main JavaScript entry from 487.11 KB to about 238 KB.

Picture-placeholder removal applied to the Bellini dashboard; other audience dashboards still require approved images. Earlier “browser checks unavailable” status has been superseded by the user-reported checks in the current verification record.
