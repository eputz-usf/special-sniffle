# Development Log

## Update 1: Project Setup

**Date:** May 20, 2026

### Completed

- Created the GitHub repository.
- Cloned the repository locally with SSH.
- Initialized the project with React, Vite, and TypeScript.
- Installed initial dependencies.
- Tested the local development server with `npm run dev`.
- Planned Supabase for future authentication and database storage.

## Update 2: Placeholder Pages and Temporary Flow

**Date:** May 20, 2026

### Completed

- Created the first `src/pages` files.
- Added placeholder pages for account access, user type selection, and role-based dashboards.
- Made the app open on a combined create account / login page.
- Removed the temporary top navigation links.
- Added React Router routes for the account page, user type selection, and dashboards.
- Built a temporary create account flow:

```text
Account Page -> Create Account -> Select User Type -> Chosen Dashboard
```

- Built a temporary login flow:

```text
Account Page -> Login -> Saved User Type -> Matching Dashboard
```

- Used `localStorage` for temporary browser-only user type storage.
- Separated temporary auth and user type logic into utility files so Supabase can be added later.

### What I will do next

- Test the temporary account creation and login flows in the browser.
- Work on the front end for the auth page and user group selection page.
- Add basic account form validation.
- Add password confirmation checking.
- Prepare the auth utility functions for Supabase Auth integration.
