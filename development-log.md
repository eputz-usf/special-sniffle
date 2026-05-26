# Development Log

## Update 1: Project Setup

**Date:** May 20, 2026

### Completed

- Created the GitHub repository for project
- Initialized the project with React, Vite, and TypeScript and created folder structure.
- Planned Supabase for database storage.
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

## Update 4: Dashboard Template Start

**Date:** May 23, 2026

### Completed

- Updated the app flow so the site starts on the user group selection page.
- Reduced the user groups to four cards and separated dashboard routes by group.
- Started a reusable dashboard template for the prospective/high school group.
- Moved dashboard-specific styling into its own CSS file.

## Update 5: Degree Detail Pages and Catalog Links

**Date:** May 25, 2026

### Completed

- Continued working on the degree information/detail pages.
- Added `View More Details in the Catalog` buttons to the learn-more sections for the main majors.
- Linked each main major page to its official USF catalog page
- Updated the learn-more page structure so users can first read the summarized app content and then open the full catalog page for complete requirements.
- Made the catalog button consistent across the major pages so the experience feels uniform.
- Used external catalog links for each program instead of leaving users only with the in-app summary.
- Ensured the catalog button appears at the very end of the learn-more content, after the degree overview and other details.
- Repeated the update across multiple degree entries in `DegreeDetail.tsx`.
- Checked that each catalog link points to the correct program page based on the provided USF catalog URLs.

## Update 6: Degree Detail Pages and Catalog Links

**Date:** May 25, 2026

### Completed

- Completed Degree Information Page and all features/ pages 
- Completed the full frontend design of this page as well
- Completed degree comparison feature
- Added Bachelor’s/Master’s pathways, available minors, dashboard return navigation, and a two-degree compare flow using the existing `degrees.ts` data.
- Kept temporary user type storage in `localStorage` for now, but wrapped it in a replaceable session storage utility for future backend integration.

### What I will do next

- intake quiz design (plan and get more clarification on how to design it) to implement the recommendation system 
- start working on high school base group features and custom dashboard
