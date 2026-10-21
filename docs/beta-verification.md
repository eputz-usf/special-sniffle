# Beta verification and handoff evidence

Updated October 20, 2026 for repository handoff. Test measurements below retain their original October 12 dates. This update records project decisions and repository cleanup; it does not represent a new test run, staging verification, or permission to publish.

## Current handoff status

- The project owner’s checklist marks the listed accessibility/usability and performance/technical-quality tasks complete. Performance/technical quality was marked complete at the owner’s request on October 20. Supporting evidence and its limits are documented below.
- Keep unavailable features visible as disabled, clearly labeled “Coming soon” cards. Profiles, transcript uploads, planners, the Major Interest Finder, and personalized recommendations are outside the implemented beta.
- Academic approval and a named academic content owner remain unrecorded. See [content review](content-review.md) for the material requiring review.
- Remaining developer handoff work includes infrastructure, troubleshooting, and design-rationale documentation; an image-needs list; collaborator invitations; and handoff correspondence.
- No staging or production deployment or publication approval has been recorded in the evidence reviewed.

## Build and source checks

`npm run check` passed after the font-loading change: lint, 22 regression tests, syntax of 65 external references, TypeScript and Vite build. Runtime: Node 25.1.0/npm 11.6.2. A separate Node 22 run is not documented in this retained evidence. Tests use Node/server rendering and logic checks, not browser end-to-end execution.

Tests cover public context/storage recovery, explorer/details, selection and comparison URLs, invalid selections, disabled tools, interdisciplinary resources/pairs, audience wording and advising cautions. Earlier installation, dependency and link evidence is in [earlier local review](#earlier-local-readiness-review).

## Accessibility and browser evidence

| Check | Evidence | Limits |
| --- | --- | --- |
| Manual structure/labels, keyboard journey, visible focus, contrast, reduced motion, 200% zoom, narrow layout | User reported no issues | Prescribed sample: group selection, Bellini dashboard, explorer, main-degree detail, interdisciplinary detail and comparison. Exact routes/device/tool versions not recorded; not an exhaustive audit. |
| Desktop comparison Lighthouse Accessibility | User reported 100/100, 25 passed audits | Exact pair/export absent; compatible-element ARIA best-practice details not supplied. |
| Degree-page Lighthouse Accessibility | User reported 100/100, 22 passed audits | Explorer versus detail and device mode unconfirmed. Pasted ARIA check was passed. |
| Dashboard Lighthouse Accessibility | User reported 100/100 | Exact route/device/export absent. |
| Console | User reported no red errors after refresh and filter/add/remove/comparison journey | Interactive failed-request check not confirmed. |

The retained browser evidence is user-reported; no agent-run browser pass is claimed. The current checklist marks the listed accessibility and technical tasks complete, including direct-link/history and target-device checks. Separate reports for those later completions are not attached. Screen-reader coverage and exhaustive automated page/mobile coverage are not established by the retained evidence.

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

The October 12 source archive, manifest, and checksum were removed during handoff cleanup because they were outdated. Use the cleaned source repository for handoff; any future archive must be generated and reviewed from the current source.

Some audience dashboards still contain picture placeholders and require approved images. Academic review remains pending. Ongoing academic-content and user-support contacts have not been recorded.

## Repository privacy and cleanup

The October 20 local review scanned 119 project/build files outside dependency and Git-internal directories, inspected the former source archive, and scanned 481 historical Git file versions. No confirmed private service credential or student record was identified in tracked source or the scanned history. This was a local pattern-based review with targeted inspection, not a guarantee that every possible secret is absent or an audit of unavailable remote history.

Local Supabase connection settings and project metadata were identified and excluded from the handoff. Supabase setup and internal planning documents are now stored under ignored `local-private/`; previously tracked Supabase files and the internal checklist have been removed from the Git index. Earlier committed versions remain accessible in Git history. Git author metadata also retains the contributor’s name and email.

The outdated handoff archive, four unused image assets, and redundant readiness-document link were removed. Dependencies and generated build output remain ignored in their standard locations. Share tracked source and reviewed documentation rather than copying the entire working directory, which contains private local material.

## Earlier local readiness review

The earlier review removed simulated accounts and retired tools, added public-link recovery and accessibility semantics, corrected source URLs, split route chunks and optimized the logo.

Historical evidence retained:

- `npm ci --offline` passed on Node 25.1.0; a separate Node 22 run is not documented in the retained evidence.
- Online link review: 53 HTTP 200 and 13 HTTP 202 responses, no HTTP 4xx/5xx after corrections. Interstitials and authenticated resources need human review.
- Dependency review reported zero advisories after fixes; rerun before publishing.
- The earlier basic source/document credential-pattern review found no matches. The subsequent October 20 review included available Git history, as described above.
- Logo reduced from 1,129.83 KB to 71.44 KB; main JavaScript entry from 487.11 KB to about 238 KB.

Picture-placeholder removal applied to the Bellini dashboard; other audience dashboards still require approved images. Earlier “browser checks unavailable” status has been superseded by the user-reported checks in the current verification record.
