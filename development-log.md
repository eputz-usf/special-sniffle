# Development Log

## Update 1: Project Setup

**Date:** May 20, 2026

- Created the GitHub repository.
- Initialized React, Vite, TypeScript, and base folder structure.
- Added placeholder pages, routes, role dashboards, and temporary localStorage user type handling.
- Planned Supabase for later database, auth, and profile persistence.

## Update 2: Auth and User Group Page Design

**Date:** May 21, 2026

- Redesigned the account access page, header, USF logo treatment, and user group selection cards.

## Update 3: USF Login Placeholder and Profile Page

**Date:** May 21, 2026

- Switched account flow toward an external USF login placeholder.
- Added profile page behavior for users without a selected group.

## Update 4: Dashboard Template Start

**Date:** May 23, 2026

- Made the app start on user group selection.
- Reduced groups to four cards and separated dashboard routes.
- Started the reusable dashboard template and dashboard-specific stylesheet.

## Update 5: Degree Detail Pages and Catalog Links

**Date:** May 25, 2026

- Continued degree detail pages.
- Added official catalog buttons and links for the main majors.
- Kept summarized app content before sending users to full catalog requirements.

## Update 6: Degree Explorer and Comparison

**Date:** May 25, 2026

- Completed the Degree Information page frontend.
- Added two-degree comparison, Bachelor’s/Master’s pathways, available minors, and dashboard return navigation.
- Wrapped temporary user type localStorage in a replaceable session utility.

## Update 7: High School Dashboard Start

**Date:** May 27, 2026

- Replaced the generic prospective dashboard with a custom high school/prospective dashboard.
- Kept `/dashboard/prospective-student` and the existing user group flow intact.
- Added high school dashboard sections, working green actions, and red placeholder tools.
- Added a temporary general dashboard button and route.
- Moved high school dashboard styles into `src/styles/highSchoolDashboard.css`.
- Kept `src/styles/dashboard.css` focused on shared dashboard/template styles.

## Update 9: Reusable Intake Quiz Template

**Date:** May 27, 2026

- Replaced the quiz placeholder with `src/components/QuizTemplate.tsx`.
- Added progress, one-question flow, answer cards, Back / Next controls, helper text, and a placeholder completion screen.
- Added `src/styles/quiz.css` and filler quiz questions for styling reuse.
- Used the reusable quiz template for the high school/prospective intake quiz.
- Added questions for college stage, interests, work style, favorite subjects, coding comfort, math comfort, career curiosity, decision confidence, and programs to compare.

## Update 10: Public Quiz Supabase Save Flow

**Date:** May 27, 2026

- Added anonymous public quiz session handling with `crypto.randomUUID()` and localStorage.
- Added final-submit Supabase saving for public quiz sessions, responses, and results.
- Added local high school recommendation scoring before saving results.
- Added a recommendation results screen after submit.
- Added `supabase/public-quiz-schema.sql` for the public quiz tables and insert policies.
- Changed the public high school quiz from final-only saving to session-based autosave.
- Saved `session_id`, answers, and current question progress in localStorage for browser resume.
- Upserted each answer to Supabase by `session_id` and `question_id` so changed answers do not duplicate rows.
- Updated the Supabase schema with unique constraints, `updated_at`, and anonymous insert/update policies.

## Update 11: Hosted Supabase Quiz Debugging

**Date:** May 27, 2026

- Moved Supabase env configuration to the project root `.env.local` so Vite can read it.
- Confirmed hosted Supabase requests were reaching the project.
- Updated the public quiz schema to be rerunnable and include explicit anonymous insert/update grants.
- Resolved the row-level security issue that blocked public quiz session writes.

## What I Will Focus On Next

- Continue refining the high school intake quiz flow.
- Plan how quiz answers should map to recommended degrees, comparison links, and next-step cards.
- Keep working on the quiz experience and recommendation result flow.
- Target additional high school dashboard features after the quiz is stable.
