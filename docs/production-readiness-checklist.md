# CIC Support Platform Production Readiness Checklist

## Purpose

This checklist treats the current feature set as final. It separates production-readiness work into:

1. Work that can be completed now with the existing repository and local development environment.
2. Work that depends on the services, accounts, decisions, or approvals listed in [production-access-request.md](./production-access-request.md).

## Current Status

**The application is not ready to accept real student data yet.**

The production build succeeds, but:

- Authentication is still a placeholder.
- Private data uses anonymous browser session IDs instead of authenticated user ownership.
- Database policies allow broad anonymous access.
- The transcript Edge Function performs privileged operations without verifying a signed-in user.
- Automated tests, CI/CD, hosting configuration, and monitoring are not present.
- Lint currently fails in `src/pages/transfer/TransferPlanner.tsx`.
- The initial JavaScript bundle and several assets are larger than necessary.

---

## Section 1 — Things That Can Be Done Now

These tasks can be completed in the repository without waiting for production accounts or university access. Some can prepare the application for a service that will be connected later.

### A. Fix the Current Build and Code-Quality Baseline

- [ ] Fix the ESLint error in `src/pages/transfer/TransferPlanner.tsx`.
- [ ] Ensure `npm ci`, `npm run build`, and `npm run lint` all pass locally.
- [ ] Add a consistent code-formatting command and format check.
- [ ] Enable stricter TypeScript settings where practical, including `strict` and `noUncheckedIndexedAccess`.
- [ ] Pin and document the supported Node.js and npm versions.
- [ ] Add an `.env.example` containing variable names and descriptions only.
- [ ] Validate required environment variables at startup and show a clear configuration error when they are missing.
- [ ] Remove unused pages, assets, and legacy helpers after confirming they are not required.
- [ ] Replace remaining misleading `prototype`, `temporary`, and `placeholder` text where the feature is now considered final.

### B. Add Automated Tests

- [ ] Add a test framework and test scripts.
- [ ] Add unit tests for all recommendation and scoring logic.
- [ ] Add unit tests for transcript parsing, including malformed, multi-page, empty, and unexpected input.
- [ ] Add regression tests for degree recommendations and academic requirement data.
- [ ] Add component tests for quizzes, planners, profiles, uploads, loading states, and error states.
- [ ] Add mocked integration tests for database and storage requests.
- [ ] Add end-to-end tests for the public/high-school, transfer, Current USF, and Bellini student journeys.
- [ ] Add tests for duplicate submissions, failed saves, retries, browser navigation, and page refreshes.
- [ ] Set a coverage requirement for business-critical logic.

### C. Prepare Database Migrations and Security Rules

- [ ] Convert standalone SQL schema files into ordered Supabase migrations.
- [ ] Resolve duplicate and overlapping table definitions in the public and transfer quiz schemas.
- [ ] Add a planned `user_id`/`owner_id` field to every private student table.
- [ ] Add foreign keys between profiles, quiz sessions, responses, results, and document metadata.
- [ ] Add indexes for owner IDs, session IDs, timestamps, and expected administrative queries.
- [ ] Add field-length, allowed-value, timestamp, and required-value constraints.
- [ ] Add automatic database triggers for `updated_at`.
- [ ] Write owner-based Row-Level Security policies using `auth.uid()` for future authenticated users.
- [ ] Write separate role-based policy templates for students, advisors, content editors, and administrators.
- [ ] Add local RLS tests that prove one test user cannot access another test user's data.
- [ ] Add only non-sensitive development/test seed data.
- [ ] Verify that a clean local Supabase environment can be created entirely from migrations.
- [ ] Document required tables, extensions, buckets, functions, policies, and secrets.

The migrations and policies can be written and tested locally now. Deploying them to staging and production belongs in Section 2.

### D. Prepare Authentication in the Application

- [ ] Remove the fixed `temporary-local-user` behavior.
- [ ] Create an authentication provider/session layer that can accept the future USF identity.
- [ ] Add protected-route components for student, advisor, and administrator pages.
- [ ] Add UI and state handling for login, logout, loading, denied access, expired sessions, and failed token refresh.
- [ ] Separate public visitor routes from authenticated student routes.
- [ ] Update data-access helpers to use the current authenticated session token rather than the Supabase anonymous key as identity.
- [ ] Replace private-data lookups based on browser `session_id` with an owner-ID abstraction.
- [ ] Add authentication mocks so protected-route behavior can be tested before Entra access is available.

The real Microsoft Entra configuration and final token/claim mapping depend on USF access and are listed in Section 2.

### E. Harden the Transcript and Document Code

- [ ] Bundle and pin `pdfjs-dist` locally instead of importing executable code from `esm.sh` at runtime.
- [ ] Consolidate the duplicate browser and Edge Function transcript parsers into one tested source where feasible.
- [ ] Consolidate duplicate Current USF and Bellini transcript-upload implementations.
- [ ] Validate request-body shapes and reject unknown actions or fields.
- [ ] Add strict filename normalization and maximum filename length.
- [ ] Validate file signatures/content instead of trusting extensions and browser MIME types.
- [ ] Keep an explicit allowlist of accepted file types.
- [ ] Add client and server payload-size checks.
- [ ] Generate unpredictable document identifiers and avoid trusting caller-provided storage paths.
- [ ] Add timeout, cancellation, duplicate-submission prevention, and safe retry behavior.
- [ ] Add automatic cleanup logic for abandoned pending uploads.
- [ ] Ensure logs and errors never include transcript text, U-numbers, email addresses, or profile contents.
- [ ] Prepare the Edge Function to obtain the verified user from a JWT and authorize every copy, download, retain, and delete operation.

Malware-scanning integration, final CORS origins, and deployment of authenticated storage policies depend on selected services and are listed in Section 2.

### F. Reduce Sensitive Browser Storage

- [ ] Inventory every `localStorage` key and classify its data as sensitive or non-sensitive.
- [ ] Remove U-number, email, GPA, transcript results, and profile contents from persistent browser storage.
- [ ] Keep only necessary non-sensitive UI progress locally.
- [ ] Clear sensitive in-memory state on logout and session expiry.
- [ ] Add user-facing delete controls for locally stored information.
- [ ] Test shared-device, logout, and expired-session behavior.

### G. Improve Performance and Scalability

- [ ] Lazy-load routes so users do not download the complete application at startup.
- [ ] Reduce the current approximately 1.06 MB minified initial JavaScript bundle.
- [ ] Compress and resize large images, especially the approximately 1.13 MB USF logo.
- [ ] Use responsive image sizes and efficient formats.
- [ ] Load large degree and course-plan datasets only on routes that need them.
- [ ] Debounce or batch quiz and planner autosaves.
- [ ] Add pagination support to any future administrative record lists.
- [ ] Refactor very large components and data files into smaller modules.
- [ ] Merge duplicated profile and persistence logic between Current USF and Bellini flows.
- [ ] Establish bundle-size and performance budgets.
- [ ] Measure local Lighthouse and Core Web Vitals results for mobile and desktop.

### H. Improve Network and Error Handling

- [ ] Centralize Supabase and API requests behind a typed client layer.
- [ ] Add request cancellation when a page unmounts or a request becomes obsolete.
- [ ] Add network timeouts.
- [ ] Distinguish authentication, validation, network, quota, and server errors in user messages.
- [ ] Provide retry controls only for safe or idempotent actions.
- [ ] Disable submission controls while a request is in progress.
- [ ] Make upserts and retries safe against duplicate records.
- [ ] Add offline and degraded-service states for profiles, quizzes, and planners.
- [ ] Add React error boundaries and a friendly fatal-error screen.
- [ ] Add a route-level 404 page.
- [ ] Add correlation/request ID support for future production logging.

### I. Complete Repository-Level Web Security Work

- [ ] Define a draft Content Security Policy and list every required external origin.
- [ ] Confirm all new-tab links use safe `rel` attributes.
- [ ] Remove unnecessary third-party runtime resources.
- [ ] Sanitize and validate all user-controlled values sent to the database or displayed in generated output.
- [ ] Add frontend restrictions for upload counts and sizes.
- [ ] Add dependency vulnerability and secret-scanning commands.
- [ ] Review runtime dependency licenses.
- [ ] Pin Edge Function dependencies using an approved reproducible strategy.
- [ ] Prepare security-header configuration files for likely hosting targets if the provider has not yet been selected.

Final response headers must be enabled and verified on the selected host in Section 2.

### J. Improve Accessibility

- [ ] Run automated accessibility checks on every page type.
- [ ] Perform keyboard-only testing for navigation, quizzes, planners, uploads, and result pages.
- [ ] Test browser zoom to at least 200%.
- [ ] Verify visible focus states and logical focus order.
- [ ] Ensure every form input has a persistent label and associated instructions/errors.
- [ ] Ensure save, upload, loading, and error status messages are announced to assistive technology.
- [ ] Review headings, landmarks, link names, button names, tables, and image alternative text.
- [ ] Check color contrast, reduced-motion behavior, print views, mobile layouts, and touch-target sizes.
- [ ] Fix the accessibility issues that can be identified internally.

An official accessibility review and the university's required compliance target depend on collaboration in Section 2.

### K. Clean Up Content and Product Metadata

- [ ] Fix broken and malformed external links, including the degree URL containing a space before `.aspx`.
- [ ] Add an automated external-link checker.
- [ ] Replace the generic browser title `cic-support-platform` with the approved working product name.
- [ ] Remove leftover Vite branding and unused default assets.
- [ ] Add a description, favicon set, social preview metadata, and theme metadata.
- [ ] Set appropriate page titles and descriptions per route.
- [ ] Prepare `robots.txt` and a sitemap for public routes only.
- [ ] Prevent intended private routes from being indexed.
- [ ] Confirm browser back/forward navigation does not lose or corrupt user state.
- [ ] Add catalog-year, source, owner, and last-reviewed fields to structured academic content.
- [ ] Keep recommendation output clearly described as guidance rather than an official academic decision.

Final content approval and the official product name require the sponsor and academic owners in Section 2.

### L. Prepare CI/CD and Operations Documentation

- [ ] Create a provider-neutral CI workflow for install, build, lint, tests, and security scans.
- [ ] Add deployment-environment placeholders for development, staging, and production.
- [ ] Document the application architecture and data flow.
- [ ] Create draft deployment, migration, rollback, backup, restore, incident, and outage runbooks.
- [ ] Create a production readiness review template.
- [ ] Create a privacy-safe logging specification.
- [ ] Create a load-test plan based on documented assumptions.
- [ ] Create a pilot test plan and acceptance checklist.

Connecting CI to an institutional repository and deploying to a host depend on Section 2.

---

## Section 2 — Things That Depend on Requested Services or Collaboration

These tasks cannot be completed correctly until the related item in [production-access-request.md](./production-access-request.md) is provided or approved.

### A. USF Microsoft Login and Identity Access

**Depends on:** USF Identity Management, Microsoft Entra application access, test accounts, callback URLs, and approved role claims.

- [ ] Register separate staging and production Entra applications.
- [ ] Configure approved login and logout redirect URLs.
- [ ] Integrate the real USF SSO provider with the application's authentication layer.
- [ ] Validate issuer, audience, signature, expiry, tenant, and required claims.
- [ ] Map approved Entra groups or claims to student, advisor, editor, and administrator roles.
- [ ] Test login, logout, token refresh, expiry, revoked access, and permission denial using university test accounts.
- [ ] Confirm whether public high-school and transfer users remain anonymous or receive another account type.
- [ ] Complete identity-team review before enabling production login.

### B. Production Supabase or Approved USF Data Platform

**Depends on:** approval of Supabase or selection of a USF-hosted alternative, billing, project ownership, regions, and administrator access.

- [ ] Create separate staging and production projects.
- [ ] Deploy the ordered migrations and Edge Functions.
- [ ] Apply and verify authenticated RLS and storage policies.
- [ ] Remove broad anonymous permissions from private student data.
- [ ] Set `verify_jwt = true` for protected Edge Functions.
- [ ] Configure environment-specific secrets and key rotation.
- [ ] Configure connection pooling and database capacity for expected traffic.
- [ ] Configure file-size, per-user, and global storage quotas.
- [ ] Configure backup retention and point-in-time recovery where required.
- [ ] Configure storage lifecycle cleanup for pending and expired documents.
- [ ] Configure usage and spending alerts.
- [ ] Test backup restoration in a safe environment.
- [ ] Run multi-user authorization tests against staging.

### C. Approved Hosting, Domain, and DNS

**Depends on:** selected hosting provider, production account, approved region, USF domain/subdomain, DNS access, and deployment permissions.

- [ ] Configure the host to publish the Vite `dist` directory.
- [ ] Add SPA history fallback for direct navigation to application routes.
- [ ] Configure staging and production environment variables.
- [ ] Connect the approved domain and configure HTTPS.
- [ ] Configure authentication callback URLs and exact CORS origins.
- [ ] Enable asset compression, CDN delivery, and caching for hashed static assets.
- [ ] Prevent inappropriate caching of private responses.
- [ ] Enable HTTP/2 or HTTP/3 where supported.
- [ ] Apply and verify Content Security Policy, HSTS, `nosniff`, Referrer Policy, Permissions Policy, and anti-clickjacking headers.
- [ ] Add deployment rollback and retain a previous known-good release.
- [ ] Test route refreshes, headers, certificates, caching, and redirects on the real domain.

### D. University Security, Privacy, FERPA, and Legal Decisions

**Depends on:** USF security/privacy review and approval of vendors and data practices.

- [ ] Obtain approval before collecting real student profiles or transcripts.
- [ ] Confirm which fields may be collected and the purpose for each field.
- [ ] Confirm approved data region and vendor contract requirements.
- [ ] Obtain approved retention periods for profiles, quizzes, logs, uploads, and backups.
- [ ] Define deletion, student data request, legal hold, and incident-response procedures.
- [ ] Define which staff roles may access student information and how access is audited.
- [ ] Approve privacy notice, consent language, terms of use, and cookie/analytics disclosures.
- [ ] Approve monitoring, analytics, email, support, and document-processing vendors.
- [ ] Complete the required security assessment or penetration test.
- [ ] Resolve all review findings before production approval.

### E. Malware Scanning and Bot/Abuse Protection Services

**Depends on:** an approved scanning provider, WAF/CAPTCHA service, credentials, and funding if required.

- [ ] Connect uploaded documents to the approved malware scanner or quarantine workflow.
- [ ] Prevent access to a retained upload until scanning succeeds.
- [ ] Configure CAPTCHA for approved anonymous write operations.
- [ ] Configure WAF rules and provider-level rate limits.
- [ ] Configure per-user and per-IP limits for login, saves, uploads, and downloads.
- [ ] Test blocked files, suspicious traffic, quota failures, and cleanup behavior.
- [ ] Configure cost and abuse alerts with named recipients.

### F. Monitoring, Logging, and Operational Services

**Depends on:** approved monitoring provider, account access, privacy rules, alert recipients, and support ownership.

- [ ] Connect privacy-safe frontend error reporting.
- [ ] Connect structured Edge Function and infrastructure logs.
- [ ] Add uptime and critical-flow monitoring.
- [ ] Add dashboards for traffic, errors, latency, authentication failures, storage growth, and database capacity.
- [ ] Configure actionable alerts and escalation recipients.
- [ ] Verify that monitoring does not collect sensitive student data.
- [ ] Add a public or internal service-status process if required.
- [ ] Perform an incident-response exercise with the responsible team.

### G. Production Email Service

**Depends on:** an approved USF relay or external email provider, sending domain, credentials, and message approval.

- [ ] Configure account verification, password recovery, and required notification emails.
- [ ] Configure and verify SPF, DKIM, and DMARC.
- [ ] Use separate staging and production sending configuration.
- [ ] Test delivery, bounces, abuse reports, rate limits, and recovery flows.
- [ ] Confirm who owns email templates and handles delivery problems.

### H. Institutional Source Repository and Deployment Access

**Depends on:** USF GitHub/GitLab organization access and approved deployment credentials.

- [ ] Move or connect the repository to the approved organization.
- [ ] Enable protected branches and required reviews.
- [ ] Connect the prepared CI workflow.
- [ ] Add staging and production deployment environments with approval gates.
- [ ] Store credentials in the approved secret manager.
- [ ] Enable MFA, least privilege, audit logging, dependency updates, and secret scanning.
- [ ] Define who may merge and deploy to production.

### I. Official Academic Data and Content Approval

**Depends on:** Registrar, advising, DegreeWorks/Banner/OASIS owners, approved APIs or data feeds, and assigned content owners.

- [ ] Confirm the authoritative source for degrees, courses, prerequisites, transfer equivalencies, and catalog years.
- [ ] Obtain approved API/data-feed access and test credentials if system integration is required.
- [ ] Validate every degree requirement, course plan, transfer rule, recommendation, and transcript interpretation.
- [ ] Confirm all Qualtrics, advising, catalog, Canvas, DegreeWorks, and admissions links are approved.
- [ ] Confirm wording that distinguishes platform guidance from official advising decisions.
- [ ] Establish an update process for annual catalogs and urgent academic corrections.
- [ ] Obtain documented academic-content approval before launch.

### J. Accessibility Approval and User Support

**Depends on:** USF accessibility requirements, review resources, support ownership, and official contact channels.

- [ ] Confirm the required WCAG standard and university accessibility process.
- [ ] Complete an independent or university accessibility review.
- [ ] Resolve findings and document exceptions if USF permits any.
- [ ] Publish an approved accessibility statement and contact method.
- [ ] Create the official support mailbox or ticket queue.
- [ ] Assign technical, content, privacy, security, and billing owners.
- [ ] Define support hours and incident escalation paths.

### K. Production Capacity and Launch Validation

**Depends on:** expected user counts, service quotas, approved staging environment, monitoring, and launch ownership.

- [ ] Obtain expected daily users, peak concurrent users, upload volume, and retention assumptions.
- [ ] Run load tests against the approved staging architecture.
- [ ] Adjust hosting, database, Edge Function, email, and storage limits based on results.
- [ ] Verify production backups and perform a restore test.
- [ ] Test deployment rollback on the chosen hosting platform.
- [ ] Complete security, privacy, accessibility, academic, and operational sign-off.
- [ ] Run a limited pilot with approved users and no unsupported data collection.
- [ ] Resolve pilot findings.
- [ ] Obtain final approval from the named launch owner.

---

## Recommended Work Order

### Start Now

1. Fix lint and establish the clean build baseline.
2. Add tests and local CI checks.
3. Refactor duplicated transcript/profile code and improve performance.
4. Prepare migrations, authenticated ownership fields, and strict RLS policies locally.
5. Prepare the authentication layer and protected routes using mocks.
6. Harden uploads, validation, errors, accessibility, metadata, and browser storage.
7. Prepare deployment, security-header, monitoring, load-test, and operational documentation.

### Start When Services and Approvals Arrive

1. Connect USF Microsoft Entra login.
2. Create staging and production database/hosting environments.
3. Deploy and verify migrations, RLS, storage policies, and Edge Functions.
4. Configure the domain, HTTPS, CORS, security headers, secrets, backups, and quotas.
5. Connect malware scanning, CAPTCHA/WAF, monitoring, and email.
6. Validate academic content and complete security, privacy, FERPA, and accessibility reviews.
7. Load-test staging, run a limited pilot, resolve findings, and approve production launch.

## Final Launch Rule

Real student profile, GPA, U-number, email, transcript, or advising data must not be collected until the Section 2 authentication, authorization, privacy, storage-security, and institutional-approval tasks are complete.

This checklist reflects the repository audit performed on September 15, 2026.
