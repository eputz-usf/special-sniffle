# Interdisciplinary Degree Cards: Implementation and Review Checklist

Updated October 8, 2026. **Implementation done.** Automated checks pass; manual browser verification and Bellini academic approval remain pending. No publication has been performed.

This is the detailed record for section G of [beta-webmaster-handoff.md](beta-webmaster-handoff.md).

## Current Experience

Both `/high-school/degrees` and `/degrees` show the five main computing programs and seven interdisciplinary options. Shared-explorer links retain the transfer, current USF, or current Bellini `from` context. High-school links stay within the high-school explorer.

The seven options are:

- Computer Science and Criminology.
- Computer Science and Interdisciplinary Social Sciences.
- Computer Science and Business: Accountancy and Analytics concentration.
- Computer Science and Business: Business Analytics and Information Systems concentration.
- Computer Science and Business: Digital Marketing and Analytics concentration.
- Computer Science and Business: Fintech concentration.
- Computer Science and Business: Supply Chain Management concentration.

The main explorer has an **Interdisciplinary Computing Majors** section and an **Interdisciplinary** filter. “All” includes all 12 cards. Other subject filters hide the interdisciplinary section when it has no matching cards.

The **Anticipated Degrees for 2027** shortcut opens `/degrees/future-options` or `/high-school/degrees/future-options`. Those pages contain only Computer Science and Anthropology and Computer Science and Economics, with estimated timing and incomplete-content wording. These two options cannot be compared. They are not repeated on the main explorer. The future-options routes render useful content; they do not redirect to the main section.

## Completed Implementation

### Cards, Layout, and Filters

- [x] Show all seven interdisciplinary cards once in each explorer alongside the main five.
- [x] Use shared identifiers, official catalog links, and two-/four-year planning resources.
- [x] Remove the older generic interdisciplinary records to prevent duplicates.
- [x] Preserve degree versus concentration wording in program names.
- [x] Match the main-degree card styling and actions.
- [x] Use brief best-fit interests and one-sentence card descriptions; keep fuller information on Learn More pages.
- [x] Use the category/filter label **Interdisciplinary**, rather than “Business + Interdisciplinary.”
- [x] Include all 12 cards in “All” and the seven interdisciplinary options in their filter.
- [x] Remove “Coming soon” tags and “Admissions status pending confirmation” text from interdisciplinary cards, as requested. Card display does not establish admissions availability; that remains an academic-review question.

### Learn More Content

- [x] Provide working detail pages for all seven slugs in both explorers.
- [x] Summarize the catalog text supplied by the user for all seven programs/concentrations.
- [x] Include informative overviews, fit and preparation/challenge guidance, skills, career context, and internship/research/master’s opportunities.
- [x] Match the main five’s section order for each audience. High-school pages show career information earlier; shared pages place it after comparison.
- [x] Reuse green headings, cream resource cards, and the gold comparison panel.
- [x] Reduce long interdisciplinary detail titles to a responsive 26–40px size.
- [x] Add a program-specific “Want to Compare…?” section and a context-preserving return link.
- [x] Keep official catalog and available two-/four-year planning links.
- [x] Remove “Coursework at a Glance,” “Choosing Electives,” “Important Program Notes,” and the admissions-status note from detail pages. Detailed course and policy information stays behind the catalog link.
- [x] Remove the “Electives coming soon / Official elective information is not yet available” resource card.
- [x] Keep unsupported salary and regional employment information clearly unavailable; do not invent figures.

### High-School Wording

- [x] Use short sentences and familiar words across interdisciplinary cards, Learn More pages, and comparison fields.
- [x] Explain terms such as concentration, criminology, fintech, supply chain, logistics, auditing, and algorithmic trading.
- [x] Use simpler skills labels, resource labels, compare instructions, advising questions, and anticipated-2027 wording.
- [x] Preserve academic meaning, official program names, identifiers, and URLs.
- [x] Keep separate audience content so high-school simplifications do not replace shared-group wording.

### Comparisons and Navigation

- [x] Allow main-to-interdisciplinary and interdisciplinary-to-interdisciplinary comparisons.
- [x] Reuse the two-program selection bar with duplicate prevention, removal, clearing, and button states.
- [x] Resolve all seven concentration/program slugs, including direct comparison URLs.
- [x] Preserve Bellini’s major-change context and source-specific navigation.
- [x] Return interdisciplinary comparisons to the relevant main-explorer section.
- [x] Add comparison-table roles, column/row associations, and mobile degree labels.
- [x] Keep missing comparison information labeled. High-school interdisciplinary comparisons use the new plain-language skills and career summaries; some shared comparison fields still use missing-information wording pending review.
- [x] Keep profiles, transcripts, course overlap, quizzes, and other unavailable tools unavailable.

### Documentation and Automated Verification

- [x] Update page titles, README descriptions, and content-maintenance guidance.
- [x] Record supplied sources, editorial summaries, and review dates in [content-review.md](content-review.md).
- [x] Verify both 12-card explorers, filter membership, official resource destinations in rendered content, and detail navigation across shared groups.
- [x] Verify main-to-interdisciplinary and every distinct interdisciplinary comparison pair, accessible table associations, and return links.
- [x] Verify future-options pages show only the two anticipated degrees.
- [x] Verify audience-specific section order, styling classes, and separate high-school wording.
- [x] Run `npm run check` successfully: lint, 21 tests, external-URL syntax checks, and production build.
- [x] Refresh the external-link report during implementation. No program/catalog or planning URLs were changed. Automated URL checks do not establish academic accuracy or guarantee external document usability.

## Remaining Work We Can Do Now

Implementation completion is separate from these required manual checks. Browser verification has not been completed in this session.

- [ ] Test card selection, the two-program limit, duplicate prevention, removal, clearing, and compare-button states in a browser.
- [ ] Test keyboard navigation, visible focus, filter announcements, and comparison-table reading with assistive technology.
- [ ] Check long names, card spacing, resource cards, and action placement on narrow mobile screens and at 200% zoom.
- [ ] Check detail-page ordering and colors visually for both audiences.
- [ ] Test all shared group contexts, high-school navigation, future-options pages, direct links, refreshes, and browser back/forward.
- [ ] Manually inspect official catalog and planning resources, including access challenges and document usability.

## Awaiting Bellini Academic Review

- [ ] Confirm official degree/concentration names, admissions and launch status, catalog years, and planning-resource applicability.
- [ ] Approve card descriptions, overviews, fit/preparation guidance, course-derived skills, career context, opportunities, and comparison content.
- [ ] Review the high-school simplifications for accuracy and clarity.
- [ ] Confirm Economics and Anthropology’s inclusion and estimated 2027 timing.
- [ ] Review shared comparison fields that still show missing-information labels against the supplied Learn More content.
- [ ] Assign an academic content owner and record the reviewer and approval date in `content-review.md` before publication.

## Content Maintenance

- `src/data/highSchoolFutureDegreeOptions.ts`: canonical program identifiers, official names, focus, short shared card summaries, catalog URLs, and planning resources.
- `src/data/interdisciplinaryDetailContent.ts`: shared-group Learn More summaries of supplied catalog information.
- `src/data/highSchoolInterdisciplinaryContent.ts`: plain-language high-school cards, details, and comparison content.
- `src/components/InterdisciplinaryDegreeDetail.tsx`: shared layout, audience-specific section order, resource links, and navigation.
- `src/components/AnticipatedDegreeOptions.tsx`: the two anticipated 2027 degree cards.
- `tests/interdisciplinary.test.mjs`: interdisciplinary coverage, navigation, resource links, comparisons, and audience regression checks.

Keep resource identifiers and URLs shared, preserve the concise card format, and put detailed academic rules behind the official catalog links. Record future source updates and approvals in `content-review.md`.
