# Development Log

## Update 1: Project Setup

**Date:** May 20, 2026

### Completed

- Created the GitHub repository for project
- Initialized the project with React, Vite, and TypeScript and created folder structure.
- Planned Supabase for future authentication and database storage.
- Added placeholder pages for account access, user type selection, and role-based dashboards.
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

## Update 3: Auth and User Group Page Design

**Date:** May 21, 2026

### Completed

- Designed the account access page with updated branding, typography, and layout.
- Added the USF logo and refined the site header.
- Redesigned the user group selection page with a card-based layout.

### What I will do next

- Work on real account creation logic.
- Integrate account creation and login with Supabase.
- Save the selected user group through Supabase instead of temporary browser storage.
- Start creating wireframes for the other pages and dashboards.
