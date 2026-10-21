# Design rationale

This document explains the current Bellini Degree Explorer beta’s implementation choices and their maintenance implications. It reflects the source and project decisions reviewed on October 20, 2026. Where an original technology-selection decision was not recorded, the explanation below describes the practical role and tradeoffs of the current implementation rather than claiming a historical evaluation of alternatives.

For implementation details, see [infrastructure.md](infrastructure.md). For diagnosis and repair, see [troubleshooting.md](troubleshooting.md).

## 1. A focused, public information beta

The initial release supports degree exploration, degree details, official resources, and two-program comparisons. These features help students prepare for advising without requiring an account or access to student records.

The beta therefore has no authentication service, backend API, database, email service, or transcript-upload endpoint. This keeps the current handoff focused on static website delivery and academic content review. It reduces the operational components needed for this scope; it does not establish that a static app is free of security or privacy concerns. Dependencies, repository contents, external requests, and hosting policies still require review.

**Maintenance implication:** Do not introduce student-data collection as a small extension to the public beta. Saved profiles, transcripts, and persistent personalized plans require separately agreed architecture, institutional approvals, and security/testing requirements.

## 2. React, TypeScript, and a static Vite build

The existing React implementation represents dashboards, filters, detail pages, and comparisons as components. TypeScript describes data shapes and catches type errors during the build. Vite supplies development tooling and produces deployable static files, including separately loaded page chunks.

The build produces static output in `dist/`. A production application server is unnecessary for the implemented features.

**Tradeoffs:** The interface depends on browser JavaScript. Source files cannot simply be copied into a web folder and interpreted as standalone HTML pages. Content and code updates require a build. The repository does not record a comparative framework-selection study.

## 3. Audience-specific dashboards and language

The four audiences have different starting questions: prospective students exploring college, students transferring from another institution, current USF students outside Bellini, and current Bellini students considering a change. Separate dashboards make their relevant entry points and guidance easier to present.

The high-school route family uses simpler explanations and its own degree dataset. Shared degree pages retain context through a `from` query parameter so return links and advising guidance correspond to the originating audience. Unknown or missing shared context defaults to Bellini, allowing a direct link to work without prior audience selection.

**Tradeoff:** Parallel wording and page implementations can drift. Review affected audiences together when updating a program or resource. Shared identity/resource records reduce duplication, but the source does not centralize every field or page layout.

## 4. Source-controlled academic content

Degree information is bundled from TypeScript data and page components. This makes content changes reviewable with code changes and avoids introducing a runtime CMS or database for the beta.

Canonical interdisciplinary slugs, names, and official resources are shared between explorers. Audience-specific editorial descriptions remain separate. Main-degree detail pages also embed academic content directly, so updating a card dataset alone is not enough to guarantee a consistent change everywhere.

**Tradeoffs:** Content editors currently need repository/build assistance. A change must be checked across cards, details, comparisons, and audience variants, then rebuilt and deployed. The file map and source/reviewer records in [content-review.md](content-review.md) are part of the maintenance process. A future CMS would be a separate architecture decision.

## 5. Program exploration stays distinct from academic decisions

Comparisons present program topics, skills, resources, and advising questions. Similar topics do not establish equivalent courses, transferable credits, remaining requirements, eligibility, or a guaranteed graduation timeline. Wording was revised to avoid presenting the explorer as a personalized degree audit.

Official catalog and planning links give students access to detailed requirements without duplicating every academic rule in the app. Academic approval of summaries and program coverage remains necessary. Career/salary context and audience simplifications also need review; linking a source does not automatically validate the summary.

**Maintenance implication:** Preserve advising cautions when changing comparison copy. Do not fill missing skills, career figures, or coursework with plausible guesses. Resolve those gaps with the academic content owner.

## 6. Two-program comparison and shareable URLs

Limiting comparison to two distinct programs keeps the table and selection interaction bounded on desktop and mobile. The URL records the pair using canonical `first` and `second` slugs, making the result directly navigable and shareable without a saved account. Shared pages also carry audience context.

Missing, unknown, and duplicate slugs lead to a recovery view rather than a broken comparison. Explorer filters and selections remain temporary component state; they reset on remount/reload, while the comparison URL preserves its explicit pair.

**Tradeoff:** There is no saved shortlist across devices or sessions. Renaming a slug can break existing links, so preserve identifiers or provide an intentional compatibility path when changing them.

## 7. Limited browser persistence

The `cicUserType` local-storage value records an audience preference. It is not a user identity or authorization boundary. Storage access is guarded so blocked storage does not prevent public navigation.

This avoids server-side session infrastructure for an informational audience choice. URL context remains important: a remembered audience does not override the shared degree page’s `from` parameter.

**Tradeoff:** The preference is specific to a browser and origin, can be cleared, and is not synchronized. Future student information must not be treated like this simple preference or added to local storage without an approved design.

## 8. Visible future-feature cards

The current project decision is to retain clearly labeled, disabled “Coming soon” cards. They communicate planned direction while keeping unfinished tools unavailable in the beta. Their presence is intentional; it does not mean the underlying features are implemented or approved.

**Tradeoff:** Visitors may expect those tools to arrive. Keep labels and interaction states unambiguous, and do not activate a card until its implementation and required reviews are complete. This document does not promise delivery dates.

Anticipated degree options are a separate content concern: Economics and Anthropology have their own future-options page and are excluded from selectable comparisons. Review their inclusion and estimated timing academically; do not infer program availability from a card’s display.

## 9. Reusable layout with accessibility support

Shared components and styles provide consistent dashboard and degree interactions. Skip navigation, route focus/title updates, visible focus styling, reduced-motion handling, and comparison roles/labels support navigation and comprehension across page changes.

**Tradeoff:** Component reuse does not prove every audience/page is accessible. Layout changes can affect keyboard order, zoom, narrow viewports, and screen readers. Preserve semantics and verify the changed journey in addition to running automated checks. Recorded evidence and its limits are in [beta-verification.md](beta-verification.md).

## 10. Performance changes with retained evidence

Page modules load lazily to avoid loading every page module at entry. The header uses the supplied transparent USF logo without an added background. Font discovery was improved by moving Google Fonts loading into the HTML with preconnect hints. Original Lighthouse reports remain available as a baseline.

**Tradeoffs:** Lazy page loading introduces chunk requests that must remain consistent with the deployed entry HTML. Google Fonts introduce external requests. A Lighthouse run is evidence for its tested route and conditions, not a guarantee for every device or future release.

## Keeping decisions current

When an implementation decision changes, update this document with the new behavior, reason, tradeoffs, and affected maintenance requirements. Update infrastructure and troubleshooting guidance where appropriate. Record academic sources/approvals in the content-review record and actual check results in the verification record. Preserve the distinction between planned work, implemented behavior, and tested evidence.
