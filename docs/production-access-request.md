# Production Access and Services Request

## Project

CIC Support Platform — a student-facing platform for degree exploration, recommendations, planning, profiles, and transcript-based tools.

This document separates the production needs into paid services, work I can do independently, and work that requires collaboration with USF or the project sponsor.

## 1. Services That May Require Payment

Some services offer free tiers, but a production application used by many students will likely need a paid plan. USF may already have licenses or approved alternatives, so these should not be purchased until the university confirms what is available.

- [ ] **Production database and file storage**
  - Current option: Supabase
  - Used for student accounts, profiles, quiz data, transcripts, and backend functions
  - Production needs may include higher usage limits, backups, and separate staging and production projects

- [ ] **Website hosting**
  - Possible options: USF hosting, Azure, AWS, Vercel, Netlify, Cloudflare Pages, or AWS Amplify
  - The cost depends on traffic, storage, and whether USF already provides hosting

- [ ] **Domain name and DNS**
  - A USF subdomain may be provided without a separate project cost
  - A commercial domain would normally have an annual fee

- [ ] **Monitoring and error reporting**
  - Possible options: Azure Application Insights, Sentry, or Datadog
  - Free plans may be enough during testing; production volume may require payment

- [ ] **Production email delivery**
  - Possible options: a USF mail relay, Amazon SES, Postmark, or SendGrid
  - Used for verification, password recovery, and notifications

- [ ] **Security and bot protection**
  - Possible options: Cloudflare, Turnstile, or hCaptcha
  - Basic protection may be free, while advanced firewall and traffic controls may require payment

- [ ] **Document malware scanning**
  - Needed if users can upload transcripts or other files
  - This may be provided by university infrastructure or a paid cloud-security service

- [ ] **Accessibility and security testing tools**
  - Automated tools may have free versions
  - A professional accessibility audit or penetration test will normally require funding or university staff time

### Funding Questions

- What services does USF already provide or license?
- Which department will pay for services that are not already available?
- Who will own the billing accounts and approve increased usage?
- What monthly or annual operating budget is available?

## 2. Work I Can Do

I can complete the following development work once the required accounts, technical information, and approvals are provided.

- [ ] Replace the placeholder login with the approved authentication integration
- [ ] Connect records and uploaded files to each authenticated user
- [ ] Rewrite database security rules so users can access only their own information
- [ ] Separate development, staging, and production configuration
- [ ] Remove sensitive student information from unnecessary browser storage
- [ ] Secure transcript uploads with file validation, size limits, and automatic deletion rules
- [ ] Add rate limits and CAPTCHA to public forms and uploads
- [ ] Bundle the PDF-processing library with the application instead of downloading code at runtime
- [ ] Add automated tests for important student workflows
- [ ] Fix current lint and performance issues
- [ ] Reduce the application bundle size and improve loading performance
- [ ] Add error handling and privacy-safe production logging
- [ ] Create automated build and deployment checks
- [ ] Add accessibility improvements identified during testing
- [ ] Document deployment, backup, recovery, and maintenance procedures
- [ ] Keep application code and configuration organized in the approved GitHub or GitLab repository

## 3. Work That Requires Collaboration

These items require decisions, access, approval, or information from the professor, USF departments, or other project stakeholders. I cannot complete them independently.

### Professor or Project Sponsor

- [ ] Confirm the intended users and production scope
- [ ] Identify the university department that will own the application
- [ ] Identify the project budget and approve service costs
- [ ] Introduce the development team to the correct USF technical and administrative contacts
- [ ] Decide who will maintain the application after launch
- [ ] Assign a content owner to keep degree requirements, deadlines, and links accurate

### USF Identity Management or IT

- [ ] Provide a Microsoft Entra ID application for USF Single Sign-On
- [ ] Provide separate test and production login settings
- [ ] Decide which student and staff roles the application may recognize
- [ ] Provide an approved hosting environment or approve an external provider
- [ ] Provide a USF domain or subdomain and configure DNS and HTTPS
- [ ] Provide or approve a source-code organization and deployment process
- [ ] Provide an approved method for storing production secrets and credentials

### USF Security, Privacy, and Legal/FERPA Teams

- [ ] Review the application before it collects real student data
- [ ] Approve the database, storage, hosting, email, and monitoring vendors
- [ ] Define which student information may be collected
- [ ] Define transcript and profile retention and deletion rules
- [ ] Define who may access student information
- [ ] Establish incident-reporting and breach-response procedures
- [ ] Review required privacy notices, consent language, and terms of use
- [ ] Approve the use of analytics and monitoring tools

### Registrar, Advising, and Student-System Owners

- [ ] Confirm whether the application may access Banner/OASIS, DegreeWorks, Canvas, or other student systems
- [ ] Provide approved APIs, data feeds, documentation, and test accounts where available
- [ ] Provide official degree, course, prerequisite, and transfer-equivalency data
- [ ] Review recommendation and transcript features for academic accuracy
- [ ] Confirm that the platform clearly distinguishes guidance from official advising decisions
- [ ] Assign someone to review academic content when university requirements change

### Infrastructure and Support Teams

- [ ] Configure production hosting, backups, monitoring, and alert recipients
- [ ] Provide a support mailbox or ticketing system
- [ ] Establish an escalation contact for outages and security incidents
- [ ] Help perform accessibility, load, and security testing
- [ ] Approve the final production launch and rollback plan

## Recommended Order

1. Confirm the project owner, intended users, scope, and budget with the professor.
2. Meet with USF IT, Identity Management, Security, and Privacy representatives.
3. Decide whether Supabase and external hosting are approved or whether USF systems must be used.
4. Obtain test access to Microsoft Single Sign-On and any approved student-data systems.
5. Complete authentication, database security, upload security, testing, and deployment work.
6. Complete privacy, accessibility, security, and academic-content reviews.
7. Launch a limited pilot before opening the platform to many users.

## Important Current Limitation

The application is currently an MVP. Its login is a placeholder, and some database records and uploads rely on anonymous browser sessions. Real student data should **not** be collected until USF authentication, user-specific permissions, security controls, and privacy approval are in place.
