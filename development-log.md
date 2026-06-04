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

## Update 12: Degree Explorer Cleanup

**Date:** June 1, 2026

- Removed the Computer Engineering, BSCP explorer card and detail page.
- Removed BSCP-specific comparison, quiz recommendation, and pathway references.
- Removed the empty Hardware explorer filter.

## Update 13: High School Degree Module Copy

**Date:** June 1, 2026

- Preserved the original `/degrees` module for the general dashboard.
- Added a separate high school degree module under `src/pages/highSchoolDegrees/` with simplified language
- Copied degree explorer data into `src/data/highSchoolDegrees.ts` for future high school-specific changes.
- Linked the high school dashboard and quiz results to `/high-school/degrees`.
- Added high school-friendly Learn More content for the five active majors.
- Added Tampa Bay career cards, salary references, job-market highlights, and employment graphs.

## Update 14: High School Degree Comparison and Intake Quiz/Recommendation System

**Date:** June 2, 2026, 10:15 AM

- Simplified comparison labels and student-facing wording.
- Added separate career-option and related-salary rows with short role descriptions.
- Kept the general `/degrees` module separate from the high school degree module.
- reordered quiz options, added multiple choices, simpled and broke down language.
- set up quiz and recommendation system logic
- The current scoring rules are in highSchoolQuizRecommendations.ts
- Added quiz-version metadata, major scores, recommendation explanations, and strongest answer signals to the saved quiz result.
- Updated the Supabase quiz schema to store quiz versions, score breakdowns, explanations, and recommendation signals.
- Added second- and third-choice recommendations with short explanations.
- Updated multi-select quiz behavior so the footer shows selections for the current question only.
- Added a dashboard `View previous result` action that becomes active after a recommendation is generated.
- Added a Career Paths toolbox page where students can choose one of the five active majors.

## Update 15: Dashboard Toolbox and Parent Resources

**Date:** June 2, 2026

- Added a parent-friendly toolbox page with alternating tips and official USF information.
- Added expandable prospective-student FAQs with official USF links where needed.
- Updated the dashboard planning checklist with shorter next steps.

## Update 16: Transition Planner and Printable Summary

**Date:** June 3, 2026

- Built a high school transition planner page at `/high-school/transition-planner`.
- Added the transition planner as an active toolbox card on the prospective student dashboard.
- Added a dashboard step explaining how students can use the transition planner.
- Added a printable Transition Plan Summary with browser print / Save as PDF support.
- Added a notebook-style planner UI with lined paper styling, margin details, and a live summary preview.
- Added "Add to Planner" buttons on high school degree explorer cards so students can save majors they are considering.
- Updated the planner summary so saved majors and quiz recommendations appear in the print view.
- Added Supabase persistence for transition planner data using a new `public_transition_plans` table.
- Kept anonymous local session handling so the planner can reload after closing and reopening the same browser.
- Added remote planner loading and autosave status feedback on the transition planner page.
- Updated the Supabase schema with transition planner JSON fields, unique session index, grants, and RLS policies.
- rearrange the high school files into its seperate folder

## Update 17: Transfer Dashboard Start

**Date:** June 3, 2026

- Added a transfer dashboard using the shared dashboard template with transfer-specific guidance.
- Moved shared degree pages into `src/pages/degrees/` and kept high school degree pages separate.
- Updated shared degree pages with career outlook sections, transfer-focused advisor questions, and a Career Paths flow.
- Added a transfer intake quiz route and results page under `src/pages/transfer/quiz/`.
- Added separate transfer quiz Supabase table definitions to the schema.
- completed the transfer intake quiz
- working on the transfer pathway guide feature
- working on the transition planner for transfers

## Update 18: Quiz and Planner Refinements

**Date:** June 4, 2026

- Added interdisciplinary Computer Science future options to compare, planner, and quiz recommendations.
- Refined high school quiz scoring, match percentages, and simpler answer wording.
- Updated transition planner confirmations and quiz match percentage display.

## What I Will Focus On Next
wire transition planner to supabase
