# Bellini Degree Explorer Beta: Production Readiness

Updated October 7, 2026. This checklist applies to the current public degree-explorer beta. It replaces the previous checklist for accounts, private profiles, and transcript processing.

## Implemented Locally

- [x] Public user-group selection goes directly to dashboards without simulated login.
- [x] Obsolete login/signup/account code and the generic placeholder dashboard have been removed; old URLs redirect to the public entry flow.
- [x] Shared degree links use a validated source context and work without saved browser state.
- [x] Bellini's only active dashboard tool is Degree Explorer for Major Changes.
- [x] Visible picture placeholders have been removed.
- [x] Missing-page and app-error recovery screens have been added.
- [x] Page titles, page description, and a neutral degree-explorer favicon are configured.
- [x] Skip navigation, route focus, filter selection semantics, comparison-table relationships, mobile degree labels, and reduced-motion styles are implemented.
- [x] Large logo image has been reduced and pages load in separate code chunks.
- [x] Regression checks and offline external URL syntax checks are available through `npm run check`.
- [x] Public source links have an online review report and known broken links have been corrected.
- [x] Current scope, content-update instructions, and handoff questions are documented.

Implementation does not substitute for manual accessibility or academic approval. See [beta-local-readiness-report.md](beta-local-readiness-report.md) for verification results and limitations.

## Remaining Local or Reviewer Checks

- [ ] Test keyboard navigation and visible focus in a browser, including filters, comparison selection/removal, and back/forward navigation.
- [ ] Test mobile layouts and 200% zoom visually.
- [ ] Perform screen-reader and automated browser accessibility checks.
- [ ] Measure loading performance on a mobile connection.
- [ ] Manually review resources that return an interstitial or require a university login.
- [ ] Complete academic review of coursework, career/salary information, program availability, and catalog years.
- [ ] Confirm approved branding and feedback/support destination.
- [ ] Assign technical and academic maintenance owners.

## Depends on Webmaster Answers and Staging

- [ ] Confirm final URL and integration method.
- [ ] Configure Vite base path, router basename, and app-scoped route fallback or an agreed alternative.
- [ ] Integrate the university layout or verify iframe behavior, as applicable.
- [ ] Confirm HTTPS, Content Security Policy, font origins, and other response headers.
- [ ] Verify HTML/asset caching and updates after a release.
- [ ] Verify all published routes, assets, direct links, and refreshes on staging.
- [ ] Decide the published route/group scope and coming-soon presentation.
- [ ] Confirm indexing and any analytics requirements.
- [ ] Prepare final build, deployment instructions, and rollback package.
- [ ] Obtain publication approval from the designated website owner.

## Scope Boundary

The app currently requires no Supabase project, database migration, upload bucket, Microsoft SSO, or email service. Private student-data features remain unavailable. If that scope changes, create a new review plan before introducing data collection.

Use [beta-webmaster-handoff.md](beta-webmaster-handoff.md) as the detailed task list.
