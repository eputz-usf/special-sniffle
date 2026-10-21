# Troubleshooting and repair

For maintainers of the current static Bellini Degree Explorer beta. Reviewed against the source on October 20, 2026. Commands run from the repository root. This guide describes repair procedures; it is not evidence that a new verification run has passed.

See [infrastructure.md](infrastructure.md) for application architecture, [content-review.md](content-review.md) for content ownership, and [beta-verification.md](beta-verification.md) for recorded checks.

## Start by locating the problem

Record the affected URL, audience, steps to reproduce, expected/actual behavior, browser/device, and deployed release or commit. Open browser Developer Tools and inspect **Console** and **Network** while reproducing the issue. Record the first relevant error and the failing request’s URL, HTTP status, and response type. Do not include personal information or credentials in shared screenshots or logs.

| Symptom | First place to investigate | Primary owner |
| --- | --- | --- |
| Install, lint, type-check, or test failure | Terminal output and named source file | Application maintainer |
| Blank page or “We couldn’t load this page” | Console, failed entry/chunk requests | Application maintainer |
| Missing images, fonts, or styling | Asset paths and response types | Application maintainer |
| Incorrect text, resource link, or comparison field | Dataset and page rendering source | Application maintainer and academic reviewer |
| Unexpected dashboard context | Route family and `from` parameter | Application maintainer |

Reproduce locally using the same source revision where possible. Record whether the failure occurs in development or production-build preview.

## Dependency installation or development server fails

**Diagnose:** Check that the terminal is in the directory containing `package.json`. Run:

```bash
node --version
npm --version
```

The documented setup is Node 22.12 or later in the Node 22 line; `.nvmrc` selects Node 22. If using an installed Node version manager that supports it, `nvm use` selects that version. Install dependencies with:

```bash
npm ci
npm run dev
```

**Repair:**

- For an unsupported runtime error, switch to the documented Node version before retrying.
- For registry, DNS, proxy, or certificate errors, resolve network/access configuration; changing source or the lockfile will not fix connectivity.
- For a manifest/lockfile mismatch, determine whether the dependency change was intentional. Restore the matching files from a known-good revision, or intentionally update dependencies and review the resulting lockfile. Do not delete the lockfile merely to suppress an error.
- If the development URL differs from the usual port, use the URL Vite prints. Check for an existing server before starting additional instances.

`npm ci` replaces the installed dependency directory; it does not require a Supabase service, database, or `.env` file for this beta.

**Verify:** Open the printed URL, select an audience, and open its explorer. Confirm the terminal and browser Console contain no relevant errors.

## Build, lint, or regression checks fail

Run the failing stage separately so its error is visible:

```bash
npm run lint
npm run test
npm run build
```

**Diagnose and repair:**

- **ESLint:** Fix the named rule violation in the reported file. Review any automatic edits before accepting them; do not disable a rule just to make the command pass.
- **TypeScript:** `build` runs `tsc -b` before Vite. Resolve the reported type, missing export/import, unused symbol, or invalid data shape. Check filename casing, which may behave differently on a deployment/build machine.
- **Missing package/module:** Confirm the import is correct and the package is declared in `package.json`; reinstall from the lockfile if the local installation is incomplete.
- **Regression test:** Read the failing assertion and the behavior it protects in `tests/explorer.test.mjs` or `tests/interdisciplinary.test.mjs`. Determine whether the implementation regressed or an intentional approved change requires updating the assertion. Do not change expected values solely to hide a failure.
- **Vite asset error:** Confirm the imported file exists and its path/case matches the import. Restore a required asset or update the import consistently.

**Verify:** Run `npm run check` after the repair. This covers lint, Node/server-rendering tests, external URL syntax, and a production build. It does not replace browser or host checks.

## Blank page, loading failure, or error boundary

**Diagnose:** In Developer Tools, reload with Network recording enabled. Check the entry HTML, JavaScript, CSS, and lazy page chunks. A failed dynamic import often appears only when opening a particular route. The application error boundary offers reload/return actions; capture the underlying Console error before reloading.

**Repair according to the failure:**

- **File opened with `file://`:** Serve the build through HTTP using `npm run preview` after building. Do not open `dist/index.html` directly from disk.
- **Application exception:** Trace the stack to the component/data change. Repair the invalid lookup or rendering assumption and check affected audiences and program combinations.

**Verify:** Build and preview locally. Open the previously failing route directly and through normal navigation, including a fresh browser session. Confirm response types and Console errors are correct.

## Wrong audience, back link, or lost selection

**Diagnose:** Check the URL before clearing storage. `/high-school/...` selects the prospective-student route family. Shared `/degrees/...` pages use `from=current-usf-student`, `from=current-bellini-student`, or `from=transfer-student` (with legacy `general` also recognized). Missing or invalid `from` defaults to Bellini context by design.

**Repair:** Correct the link that drops or misstates `from`; inspect `src/utils/degreeSource.ts` and the affected page’s link construction. Audience selection is saved by `src/utils/userSession.ts` in `localStorage` under `cicUserType`; it is not authentication and does not override the shared degree-page URL context.

To reset only this app’s stored audience during diagnosis, remove `cicUserType` in Developer Tools → Application/Storage → Local Storage for the app’s origin, then reselect the audience. Avoid clearing all storage for the university website. Storage-blocked browsers should still permit public navigation.

Filter and comparison selections are component state, so resetting after a remount/reload is expected. A comparison URL preserves its pair independently of that explorer state.

**Verify:** Follow dashboard → explorer → detail → comparison and return links for each affected audience. Also open the URL in a fresh session without a stored audience.

## Comparison missing, wrong, or stuck on “Select Two Degrees to Compare”

**Diagnose:** Check that `first` and `second` are two distinct canonical slugs in the appropriate dataset. Missing, unknown, or duplicate parameters deliberately display a recovery screen. Attempting to select a third program deliberately shows a two-program limit.

**Repair:** Inspect `src/utils/degreeComparison.ts`, the audience’s `DegreeInformation.tsx`, and its `DegreeComparison.tsx`. Preserve canonical slugs across datasets and resource lookups. Interdisciplinary identities/resources originate in `src/data/highSchoolFutureDegreeOptions.ts`; plain-language comparison content also uses `src/data/highSchoolInterdisciplinaryContent.ts`. Economics and Anthropology are anticipated options and are not selectable comparison programs.

Do not fill a missing academic field with an assumption: some “coming soon” or unavailable data labels reflect unapproved content. Request academic review where needed.

**Verify:** Compare two main programs, a main/interdisciplinary pair, and two interdisciplinary programs in shared and high-school explorers. Exercise remove/clear actions and invalid/duplicate URL parameters. Run the regression checks after changing selection or lookup logic.

## Incorrect degree text, missing program, or broken external link

**Diagnose:** Locate the relevant content using the file map in [content-review.md](content-review.md). Main-degree detail content also lives directly in the two `DegreeDetail.tsx` pages; changing a card dataset alone may not update the detail page. Confirm which audience and catalog/planning resource are affected.

**Repair:** Update the canonical record and affected audience/detail/comparison copies consistently. Record the source and review date; obtain academic-owner approval for academic changes. Do not infer course equivalency, admissions availability, or graduation outcomes from similar program topics.

Check URL syntax locally:

```bash
npm run check:links
```

For a deliberate network refresh:

```bash
npm run check:links -- --online
```

The online command writes `docs/external-link-report.json`. Inspect status codes, final destinations, and the resource in a browser. HTTP 200/202 responses can still be an interstitial or login screen; 401/403 responses can reflect institutional access or bot protection rather than an invalid link. Confirm an official replacement before changing a destination; do not bypass access controls.

**Verify:** Open the resource through the rendered page, confirm the intended content and audience, and run `npm run check` after source changes. Update the source/review record alongside the change.

## Images, fonts, or layout look wrong

**Diagnose:** Separate intentional “Picture placeholder” areas from broken `<img>` requests. Inspect Network for missing assets, blocked Google Fonts, wrong response types, or mixed content. Inspect the element’s styles at the failing viewport/zoom. If the app is embedded in a website, check for CSS collisions or duplicate navigation.

**Repair:** Use approved images and meaningful alternative text. Update imports/paths to match exact filenames and retain appropriate dimensions. The bundled logo is `src/assets/usflogo-optimized.png`. Google Fonts are linked in `index.html`; check whether their requests succeed and whether an approved replacement is needed. Layout sources include `src/index.css` and `src/styles/`.


**Verify:** Inspect a narrow mobile viewport, desktop, and 200% zoom. Check keyboard focus, headings/labels, and contrast after layout changes. After image/font changes, repeat relevant loading measurements; compare equivalent routes and conditions rather than treating one Lighthouse score as a universal result.

## Repair verification and release handoff

Before handing over a code repair:

1. Record the cause, affected files, fix, and any academic review needed.
2. Run the relevant checks; for source repairs, use `npm run check` before handoff and preview the production build where browser behavior is involved.
3. Reproduce the original steps and confirm the intended behavior, including relevant audience variants and invalid-input recovery.
4. Share the commit/release identifier and concise test evidence. Update documentation if the architecture or operating steps changed.

If a credential or private student information is discovered, stop distributing the affected material and notify the responsible owner. Revoke/rotate exposed credentials before treating file removal as a fix; removing the current file does not remove prior Git history. This beta should not accept real transcript uploads or student accounts.
