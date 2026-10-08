# Bellini Degree Explorer Beta: Access and Decisions Needed

Updated October 7, 2026. This document describes the current public degree-explorer beta.

## Current Architecture

The application serves degree content and comparisons from a static React/Vite build. No database, document storage, student records, email service, authentication provider, or backend secrets are needed for this scope. Former profile/transcript infrastructure has been removed from the application.

## Questions and Access Needed from the Webmaster

- [ ] Confirm the CMS and hosting platform and whether it supports the built app.
- [ ] Confirm the production URL and folder path.
- [ ] Choose a dedicated section, iframe, or direct CMS integration.
- [ ] Confirm app-scoped route fallback support or agree an alternative routing strategy.
- [ ] Provide a staging location and agreed method for delivering releases.
- [ ] Provide approved branding, header/footer requirements, and accessibility requirements.
- [ ] Decide which groups/routes and coming-soon cards should appear publicly.
- [ ] Decide indexing and analytics requirements.
- [ ] Identify deployment ownership, rollback procedure, and support contact.

## Decisions Needed from Bellini Content Owners

- [ ] Assign an academic content reviewer and ongoing content owner.
- [ ] Confirm program availability, catalog-year context, and planned-program wording.
- [ ] Review course, career, salary, and comparison content for accuracy.
- [ ] Confirm approved beta name and public entry page.
- [ ] Approve publication after staging and accessibility review.

## Budget and Services

Use the existing university website infrastructure if the webmaster confirms it supports this app. A separate paid database, upload service, email provider, or domain is not required for the current beta. Ask about additional hosting cost only if existing hosting cannot support the agreed integration.

## Future Features

If private student profiles, uploads, personalized records, or restricted access return, define and review their authentication, ownership, retention, security, privacy, and service requirements separately before implementation.

The detailed question list and task checklist are in [beta-webmaster-handoff.md](beta-webmaster-handoff.md).
