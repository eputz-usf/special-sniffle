# Development Log

## Update 1: Project Setup

**Date:** May 20, 2026

### Completed

- Created the GitHub repository for project
- Initialized the project with React, Vite, and TypeScript and created folder structure.
- Planned Supabase for future authentication and database storage.
- Added placeholder pages for account access, user type selection, and role-based dashboards.
- Added React Router routes for the account page, user type selection, and dashboards.
- Built a temporary create account flow
- Used `localStorage` for temporary browser-only user type storage.
- Separated temporary auth and user type logic into utility files so Supabase can be added later.

## Update 2: Auth and User Group Page Design

**Date:** May 21, 2026

### Completed

- Designed the account access page with updated branding, typography, and layout.
- Added the USF logo and refined the site header.
- Redesigned the user group selection page with a card-based layout.

## Update 3: USF Login Placeholder and Profile Page

**Date:** May 21, 2026

### Completed

- Changed authentication direction to assume external USF login.
- Replaced the account form with a `Continue with USF Login` placeholder.
- Added a profile page after login.
- Profile page prompts users to select a user group if no profile exists.

### What I will do next

- Redesign the profile page/ work on profile page wireframe
- Store profile and user group data through Supabase.
- Start creating wireframes for the other pages and dashboards.
