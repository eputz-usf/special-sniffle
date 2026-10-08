# Bellini Degree Explorer Beta: Production and Webmaster Handoff

## Scope

The current beta provides degree exploration, degree details, and comparisons. For current Bellini students considering switching degrees, **Degree Explorer for Major Changes** is the only active dashboard tool. Profiles, major-change guides, course overlap planning, transcript uploads, intake quizzes, and personalized recommendations are labeled “Coming soon.” Their implementations have been removed.

The app is built with React, TypeScript, and Vite. It can be deployed as static files generated in `dist/`. The current beta does not require Supabase, a database, email delivery, student-system integrations, or authentication to provide its public degree content.

This checklist applies to the current beta. Adding accounts, private profiles, or uploads would require a separate production review.

## Status and Work Order

Updated October 8, 2026. The document is grouped by what can be done now, what needs an answer or approval, and what happens after staging. Completed work is checked. Section G’s implementation is done; manual browser review and academic approval are tracked separately.

Next focus: accessibility and browser checks (D), technical verification (E), remaining content/source preparation (C), and handoff preparation. See [beta-local-readiness-report.md](beta-local-readiness-report.md) for the earlier local review and [content-review.md](content-review.md) for later content updates.

## 1. Work We Can Focus On Now

**Work now completion: 63% — 27 of 43 tasks completed; 16 remaining.**

Based on the checkboxes in section 1, including completed section G and handoff preparation. Each checkbox counts equally; this measures completed tasks, not time or effort. Items awaiting answers/approval and final launch checks are excluded. Update these figures when checkbox statuses change.

| Work area | Completed / total | Completion |
| --- | --- | --- |
| B. Public Beta Experience | 7/7 | 100% |
| C. Academic Content Preparation | 7/8 | 88% |
| D. Accessibility and Usability | 2/8 | 25% |
| E. Performance and Technical Quality | 6/11 | 55% |
| F. Documentation | 3/3 | 100% |
| G. Interdisciplinary Degree Cards | 2/2 | 100% |
| Prepare the Handoff Package | 0/4 | 0% |

These tasks can proceed in the standalone app without hosting decisions. Browser checks require an available browser session; academic preparation does not replace final approval.

### B. Public Beta Experience — done

- [x] Remove or bypass the simulated USF login for the public degree explorer. Implement real login only if access restrictions become an explicit requirement.
- [x] Make direct degree-explorer links work without previously selecting a user group.
- [x] Remove unused account/signup helpers and pages that are outside the published scope.
- [x] Replace generic unfinished copy and remove retired feature implementations.
- [x] Add a useful missing-page screen with a link back to the explorer.
- [x] Add a friendly app error screen for unexpected rendering failures.
- [x] Replace the generic browser title and confirm the favicon and page description.

### C. Academic Content Preparation — WORK NOW

- [x] Check the main five’s names and broad focus against official sources, and prepare all seven interdisciplinary summaries from the supplied catalog text.
- [x] Verify external-URL syntax and rendered resource destinations; record network-check results.
- [x] Finish source verification of detailed main-degree coursework, career/salary figures, and the applicability/usability of planning resources.
- [x] Clearly distinguish anticipated 2027 options; record that other interdisciplinary admissions status still needs Bellini confirmation.
- [x] Add advising-confirmation wording to comparisons and keep official course/credit decisions with advising.
- [ ] Complete a page-by-page comparison wording review for implied credit evaluations or guaranteed degree-change outcomes.
- [x] Record official source URLs, supplied catalog context, and technical/source review dates in `content-review.md`.
- [x] Confirm the exact catalog year and applicability of each catalog/planning resource; a catalog identifier alone does not establish its year.

### D. Accessibility and Usability — WORK NOW

- [x] Add comparison-table roles and mobile degree labels, filter state semantics, skip navigation, and route focus.
- [ ] Complete manual heading, landmark, label, and image-alternative review across published pages.
- [ ] Test the full explorer journey using only a keyboard, including filters and comparisons.
- [x] Implement shared focus styles and reduced-motion handling.
- [ ] Verify visible focus, readable contrast, and reduced-motion behavior in a browser.
- [ ] Check the interface at 200% zoom and on narrow mobile screens.
- [ ] Run automated accessibility checks and address findings; perform manual checks as well.
- [ ] Test screen-reader navigation on representative dashboard, degree-detail, and comparison pages.

### E. Performance and Technical Quality — WORK NOW

- [x] Run `npm ci`, `npm run build`, and `npm run lint` in a clean checkout.
- [x] Document the supported Node.js version used for builds and retain the npm lockfile.
- [x] Optimize the large USF logo and split page code into separately loaded chunks.
- [ ] Confirm image quality and loading performance visually on target devices.
- [ ] Measure loading performance on a mobile connection and optimize where needed.
- [ ] Check for browser console errors and failed asset requests.
- [ ] Verify degree filtering, selecting two degrees, removing selections, and comparison navigation.
- [ ] Verify direct links, query parameters, page refreshes, browser back/forward, and navigation from a fresh browser session.
- [x] Add meaningful automated regression checks for the critical explorer journey where practical.
- [x] Review dependency vulnerabilities and resolve findings relevant to the deployed app.
- [x] Run a basic credential-pattern review of application source and documentation.

### F. Documentation — done

- [x] Revise `production-readiness-checklist.md` and `production-access-request.md` to reflect the current public beta and removed backend features.
- [x] Document which features are included in the beta and which are unavailable.
- [x] Document how to update degree content and rebuild the application.

### G. Interdisciplinary Degree Cards — DONE; ACADEMIC REVIEW PENDING

- [x] Display the seven interdisciplinary majors/concentrations as cards matching the main five in both the high-school and shared degree explorers.
- [x] Implement shared identifiers/resources, filters, detail links, two-program comparisons, audience navigation, and automated regression checks from [interdisciplinary-degree-card-tasks.md](interdisciplinary-degree-card-tasks.md).

Completed October 8, 2026. All seven Learn More pages now use the supplied catalog information, with separate plain-language content for high-school students. Cards use short summaries; detailed coursework and requirements remain behind official catalog links. The future-options shortcut opens only the two anticipated 2027 Economics and Anthropology cards. Section order and colors follow the main five. `npm run check` passes with 21 tests.

Implementation is done. Required manual browser checks remain in section D and the detailed task file; academic approval remains in the awaiting-review group below. No publication has been performed.

### Prepare the Handoff Package — WORK NOW

- [ ] Prepare the source repository or source archive, including `package.json` and `package-lock.json`.
- [ ] Prepare a short record of build, lint, functionality, and accessibility checks, with staging checks to be added later.
- [ ] Prepare known limitations and the list of “Coming soon” features.
- [ ] Review the archive to exclude `node_modules/`, `.env.local`, credentials, private files, local machine files, and unnecessary development artifacts.

Content-update and build instructions can be prepared now. Final publishing and rollback instructions depend on the hosting answers.

## 2. Awaiting Answers, Access, or Approval

Keep all dependent decisions and external reviews here. Ask the webmaster questions now; finalize the related implementation after answers arrive.

### Questions for the Webmaster — AWAITING ANSWERS

#### Website and Hosting

- [ ] What CMS and hosting platform does the Bellini website use?
- [ ] Can that platform host a built JavaScript application and its static assets?
- [ ] What exact URL should the beta use, including its folder path?
- [ ] Should it be a dedicated website section, an iframe within an existing page, or a component integrated into the website template?
- [ ] If it is a dedicated section, can requests to app routes be served the app's `index.html` so direct links and page refreshes work?
- [ ] If route fallback is unavailable, is routing with a URL hash acceptable?
- [ ] If it is embedded, does the CMS allow iframes or custom JavaScript, and are there restrictions on their source URLs?
- [ ] Is there a staging URL where we can test before publishing?
- [ ] Who configures HTTPS, response headers, caching, and deployment permissions?

#### Page Design and Navigation

- [ ] Should the app use Bellini's existing header, footer, navigation, fonts, and branding?
- [ ] Are there approved templates, logo assets, or design guidelines we should follow?
- [ ] Should visitors land on user-group selection, the Bellini dashboard, or directly on Degree Explorer for Major Changes?
- [ ] Which other user groups and routes should be included in the published beta?
- [ ] Should “Coming soon” cards appear publicly, or should the beta show only available features?
- [ ] Should the beta be searchable by search engines or accessible only through a shared link?
- [ ] What name and beta label should appear in page titles and navigation?

#### Review, Ownership, and Maintenance

- [ ] What accessibility requirements and review process apply?
- [ ] Who reviews degree content, catalog links, academic wording, and branding before launch?
- [ ] Who gives final permission to publish the beta?
- [ ] Where should the source code live, and who needs access?
- [ ] Does the webmaster want the source repository, a built `dist/` package, or both?
- [ ] Who will build and deploy future updates?
- [ ] Who owns ongoing degree-content updates, and how often should they be reviewed?
- [ ] What browser and device support is expected?
- [ ] Where should users report bugs or content errors?
- [ ] Is analytics required? If so, which university-approved tool and notice should be used?

### A. Match the Agreed Hosting Location — AWAITING ANSWERS

- [ ] Record the chosen integration method, production URL, staging URL, and app entry page.
- [ ] Set Vite's `base` for the production folder path when hosting below the website root.
- [ ] Set React Router's `basename` to match that path when using `BrowserRouter`.
- [ ] Verify asset paths, internal navigation, query parameters, and links back to the dashboard under that path.
- [ ] Coordinate an app-scoped route fallback with the webmaster. It must not capture unrelated pages on the existing website.
- [ ] If fallback is unavailable, implement and verify an agreed alternative such as hash routing.
- [ ] If using an iframe, test sizing, scrolling, keyboard navigation, focus, and the iframe's descriptive title. Confirm framing policies permit the embedding.
- [ ] If integrating directly into a CMS page, adapt the mounting element and scope styles to avoid collisions with the website's styles and layout.
- [ ] Resolve whether the app header and footer should appear alongside the website's own header and footer.

### Public Beta Experience — AWAITING DECISIONS OR REVIEW

- [ ] Confirm the final public entry page with the webmaster.
- [ ] Ensure only approved groups and routes are included in the published experience.
- [ ] Keep unavailable tools disabled and clearly labeled, or hide them according to the agreed beta scope.
- [ ] Provide a feedback or support link approved by Bellini.

### Academic Content Preparation — AWAITING DECISIONS OR REVIEW

- [ ] Assign the academic content owner and record their approval date.
- [ ] Have the assigned Bellini academic reviewer approve the beta content.

### Accessibility and Usability — AWAITING DECISIONS OR REVIEW

- [ ] Confirm the embedded or integrated version remains usable inside the actual website layout.

### Documentation — AWAITING DECISIONS OR REVIEW

- [ ] Update the README with the final URL path, integration method, build instructions, and deployment steps.
- [ ] Record known limitations, review dates, support contacts, and deployment ownership.

### Interdisciplinary Academic Approval — AWAITING BELLINI REVIEW

- [ ] Confirm exact degree/concentration names, admissions and launch status, catalog years, and planning-resource applicability.
- [ ] Approve descriptions, fit/preparation guidance, skills, career context, comparison wording, and high-school simplifications.
- [ ] Confirm inclusion and estimated 2027 timing for Economics and Anthropology.
- [ ] Record the reviewer, approval date, and content owner in `content-review.md` before publication.

### Hosting and Staging Coordination — AWAITING ANSWERS AND ACCESS

- [ ] Webmaster: replace dashboard picture placeholders with approved images before publication.
- [ ] Create a staging deployment using the intended integration method and URL structure.
- [ ] Confirm HTTPS and the website's applicable response-header policies.
- [ ] Verify Content Security Policy permits the app's scripts, styles, images, and approved links. Determine whether CSS changes are needed for inline styles.
- [ ] Configure route fallback only for the app's section, if required.
- [ ] Configure caching so new HTML loads after deployment and versioned assets can be cached appropriately.
- [ ] Confirm framing headers and policies if embedding in an iframe.
- [ ] Confirm indexing behavior for the beta with the website owner.
- [ ] Add approved navigation links from the existing website to the beta.
- [ ] Test on the actual staging host, including direct degree-page links and refreshes.
- [ ] Agree how releases are delivered, deployed, verified, and rolled back.
- [ ] Identify the person responsible for publication and future maintenance.

### Final Handoff Details — AWAITING ANSWERS AND STAGING

- [ ] Generate the final production build for the agreed URL path: the contents of `dist/`.
- [ ] Finalize deployment instructions, including route fallback and caching requirements.
- [ ] Record the approved entry URL and list of published routes/features.
- [ ] Add staging check results to the prepared verification record.
- [ ] Record the content owner, technical maintainer, and feedback/support contact.
- [ ] Finalize instructions for updating content, rebuilding, publishing, and rolling back.

Build commands once the agreed production configuration is set:

```bash
npm ci
npm run build
```

`npm run dev` and `npm run preview` are for local development and verification. Production hosting should serve the built files through the approved website infrastructure.

## 3. Final Launch Checks — AFTER STAGING AND REVIEWS

- [ ] The webmaster has confirmed the URL, hosting method, and deployment ownership.
- [ ] All published routes work on staging, including refreshes and direct links.
- [ ] The beta contains no misleading login or unfinished visible placeholders.
- [ ] Degree content and branding have been reviewed by the assigned owners.
- [ ] Accessibility and mobile usability findings have been resolved or accepted through the university's review process.
- [ ] Build and lint pass, and critical explorer interactions work.
- [ ] Production deployment and rollback instructions are available.
- [ ] A support contact and content-maintenance owner are assigned.
- [ ] The named website owner has approved publication.

## Technical References — AVAILABLE NOW

- [Vite: static deployment](https://vite.dev/guide/static-deploy.html)
- [Vite: public base path](https://vite.dev/guide/build.html#public-base-path)
- [React Router: BrowserRouter and basename](https://reactrouter.com/api/declarative-routers/BrowserRouter)
