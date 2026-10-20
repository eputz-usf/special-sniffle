# Bellini Degree Explorer Beta: Webmaster Meeting Questions

Prepared for October 20, 2026, from [beta_checklist.md](beta_checklist.md). This meeting sheet collects the webmaster questions and follow-ups needed to resolve hosting, review, and launch dependencies. The original checklist remains the task-status record.

## Project context to share

The beta is a React, TypeScript, and Vite application delivered as static files in `dist/`. It provides public degree exploration, degree details, and two-program comparisons. It currently requires no login, database, email delivery, or student-system integration. Other tools are labeled “Coming soon.”

## 1. Website, hosting, and staging — ask first

- [ ] What CMS and hosting platform does the Bellini website use?
- [ ] Can that platform host a built JavaScript application and its static assets?
- [ ] What exact production URL should the beta use, including its folder path?
- [ ] Should the app be a dedicated website section, an iframe within an existing page, or a component integrated into the website template?
- [ ] If it is a dedicated section, can requests to app routes serve the app's `index.html` so direct links and page refreshes work? Can that fallback be limited to the app's section?
- [ ] If route fallback is unavailable, is routing with a URL hash acceptable?
- [ ] If embedded, does the CMS allow iframes or custom JavaScript, and are there restrictions on their source URLs?
- [ ] Is there a staging URL where we can test the intended integration and folder structure before publishing?
- [ ] Who creates the staging deployment, and what access or files do they need from us?

Answers / owner / follow-up date:

> 

## 2. Design, entry page, and public scope

- [ ] Should the app use Bellini's existing header, footer, navigation, fonts, and branding? Should the app's own header and footer remain visible inside the website?
- [ ] Are there approved templates, logo assets, or design guidelines we should follow?
- [ ] Which approved images should replace the dashboard picture placeholders, and who will supply and insert them before publication?
- [ ] Should visitors land on user-group selection, the Bellini dashboard, or directly on Degree Explorer for Major Changes?
- [ ] Which other user groups and routes should be included in the published beta?
- [ ] Should “Coming soon” cards appear publicly, or should the beta show only available features?
- [ ] What name and beta label should appear in page titles and navigation?
- [ ] Should the beta be indexed by search engines or left out of search results and distributed through a shared link?
- [ ] Where should the existing Bellini website link to the beta, and who will add those navigation links?

Answers / owner / follow-up date:

> 

## 3. Hosting policies and integration details

- [ ] Who configures HTTPS, response headers, caching, and deployment permissions?
- [ ] What Content Security Policy and other website policies must the app follow? Will its scripts, styles, images, links, and inline styles be allowed, or do we need changes?
- [ ] How should caching be configured so visitors receive new HTML after a release while versioned assets can be cached?
- [ ] If using an iframe, do framing headers and policies permit it? What sizing, scrolling, and descriptive-title requirements apply?
- [ ] If integrating directly into a CMS page, what mounting element and template constraints should we use, and how should app styles be scoped to avoid collisions?

Answers / owner / follow-up date:

> 

## 4. Accessibility, browser support, and acceptance

- [ ] What accessibility requirements and review process apply?
- [ ] What browsers, devices, and mobile configurations must the beta support?
- [ ] Who will review the app inside the actual website layout, including keyboard navigation, focus, mobile usability, and any iframe behavior?
- [ ] What evidence or reports are required for accessibility and staging approval, and who resolves or accepts remaining findings?

Answers / owner / follow-up date:

> 

## 5. Academic content and branding approval

Ask the webmaster to identify or refer us to the appropriate Bellini reviewers where needed.

- [ ] Who reviews degree content, catalog links, academic wording, and branding before launch?
- [ ] Who will be the ongoing academic content owner?
- [ ] Who can confirm exact degree/concentration names, admissions and launch status, catalog years, and planning-resource applicability?
- [ ] Who will approve descriptions, fit/preparation guidance, skills, career context, comparison wording, and high-school simplifications?
- [ ] Should Economics and Anthropology be included as future options, and who can confirm their estimated 2027 timing?
- [ ] How should reviewer names, approval dates, and content ownership be recorded, and how often should content be reviewed?

Answers / reviewer / follow-up date:

> 

## 6. Source handoff, releases, and maintenance

- [ ] Where should the source code live, and who needs access?
- [ ] Do you want the source repository, a built `dist/` package, or both?
- [ ] Who will build and deploy the initial release and future updates?
- [ ] How should releases be delivered, deployed, verified, and rolled back?
- [ ] What deployment and rollback instructions or other handoff documents do you require?
- [ ] Who is the technical maintainer after launch, and who handles urgent fixes?
- [ ] Where should users report bugs or content errors, and what approved feedback/support link should appear in the app?
- [ ] Is analytics required? If so, which university-approved tool and notice should be used?

Answers / owner / follow-up date:

> 

## 7. Publication approval and next steps

- [ ] Who gives final permission to publish the beta?
- [ ] What staging checks, content/branding approvals, accessibility reviews, and handoff items must be complete before that permission is given?
- [ ] Who will confirm the final public entry URL and approved routes/features before publication?
- [ ] Who will publish the release and verify it on the production website?

Answers / approver / follow-up date:

> 

## Decisions and contacts to record before leaving

| Item | Decision / contact | Follow-up owner and date |
| --- | --- | --- |
| Hosting platform and integration method | | |
| Production URL and folder path | | |
| Staging URL and access | | |
| Route fallback or hash routing | | |
| Public entry page and approved audiences/routes | | |
| Branding, images, and website navigation | | |
| Accessibility reviewer and acceptance process | | |
| Academic content owner and reviewer | | |
| Source location and handoff format | | |
| Deployment owner and technical maintainer | | |
| Feedback/support contact | | |
| Final publication approver | | |
| Next actions | | |
