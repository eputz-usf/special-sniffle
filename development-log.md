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
- Added "Add to Planner" buttons on high school degree explorer cards so students can save majors they are considering.
- Updated the planner summary so saved majors and quiz recommendations appear in the print view.
- Added Supabase persistence for transition planner data using a new `public_transition_plans` table.
- Kept anonymous local session handling so the planner can reload after closing and reopening the same browser.
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

## Update 19: Transfer Quiz and Planner Refinements

**Date:** June 4, 2026

- Refined transfer quiz scoring to rank by match percentage, with raw points as a tie-breaker.
- Added Q9-driven next-step buttons on transfer quiz results.
- Added transfer planner saved majors, quiz recommendations, styled confirmations, course lists, year started, and course evaluation link.
- Connected transfer degree and future option pages to Add to Planner.
- Updated transfer dashboard navigation to open the transition planner directly.

## Update 20: Degree Detail Advising and Career Layout

**Date:** June 5, 2026

- Updated shared degree detail pages so advisor questions can change by saved user group.
- Kept transfer-student advisor questions as the default for the shared `/degrees` pages.
- Added prospective-student, current USF student, and current Bellini student advisor question sets for each active major.
- Moved each major's career outlook section lower on the page so it appears directly before the advisor questions.

## Update 21: Current USF Profile Prototype Persistence

**Date:** June 5, 2026

- Added Current USF profile persistence using an anonymous browser `session_id`.
- Connected the Current USF profile and saved programs of interest to Supabase through a `current_usf_profiles` table.
- Kept localStorage as the browser fallback for the prototype.
- Noted that a production USF version should connect this same profile data to the authenticated USF identity instead of only a browser session.
- Moved the Current USF profile page into `src/pages/USF/` for group-specific pages.
- Added profile fields for U Number, USF email, current college, current major, year started, class standing, completed credits, notes, and advising questions.
- Changed degree and future degree pages so Current USF users save programs with `Add to Profile` instead of `Add to Planner`.
- Replaced the profile summary panel with a focused list of programs added to the profile.

## Update 22: Current USF Dashboard and Profile Refinements

**Date:** June 9, 2026

- Updated the Current USF dashboard guidance for students in another USF college considering a switch into Bellini computing majors.
- Refined the Current USF profile with a date edited label, programs of interest controls, and a print-only report format.
- Added a placeholder quiz recommendations section on the Current USF profile for future wiring.

## Update 23: Current USF Quiz and Bellini Switching Guide

**Date:** June 9, 2026

- Added a Current USF intake quiz route, Supabase-backed autosave/result tables, and group-specific recommendation scoring.
- Added a Current USF quiz results page modeled after the transfer results page with red placeholder next-step actions.
- Added the Transferring into Bellini Guide using the transfer guide layout, switching-planning overview, switching terms, and Bellini contact section.
- Organized the Current USF switching guide into gateway requirements, official resources, advising steps, and change-of-major preparation sections.
- Refined the guide with step-labeled Canvas, advising, and change-of-major sections, animated resource buttons, and bottom links for Degree Works, progression policies, and Current USF degree information.

## Update 24: Current USF Transcript Upload Prototype

**Date:** June 10, 2026

- Added a Transcript Upload toolbox card to the Current USF dashboard and routed it to `/current-usf/transcript`.
- Built the transcript upload page with PDF upload, text paste fallback, editable extracted course rows, local reviewed-summary saving, and profile integration.
- Added Supabase Storage setup for a private `current-usf-transcripts` bucket and an `extract-transcript` Edge Function for document retain/delete actions.
- Added a post-extraction consent flow so students choose whether to save the uploaded PDF to their profile or delete the temporary upload.
- Added an Uploaded Documents section to the Current USF profile, separate from the printable profile report.
- Updated transcript extraction to separate letter grade, credits earned, and quality points so completed-credit totals use credits earned instead of nearby numeric values.
- Added a shared transcript parser for course-code detection, term inference, gateway category tagging, and basic tolerance for PDF text extraction quirks.
- Added saved-document reuse on the transcript upload page so students can choose a previously saved profile PDF and extract courses from it again.
- Extended the `extract-transcript` Edge Function with a constrained signed-download action for saved profile documents.
- Highlighted incomplete extracted course rows with a pale red background and row-level guidance listing the blank fields to fill in.
- Added a printable extracted course list with a clean print-only table layout.
- Moved uploaded transcript documents on the Current USF profile into a separate right-column card underneath quiz recommendations.
- Bugs/issues encountered:
  - The initial Edge Function bundled `pdfjs-dist` and failed deploy with a `413 request entity too large` error, so PDF text extraction was moved to the browser and the Edge Function was slimmed down to storage actions.
  - PDF.js browser extraction initially failed because `GlobalWorkerOptions.workerSrc` was not set; added an explicit worker URL.
  - Supabase function calls initially returned generic non-2xx errors; switched retain/delete calls to direct `fetch` so response bodies can be surfaced.
  - The function returned `401` until JWT verification was disabled for `extract-transcript` in `supabase/config.toml`.
  - A TypeScript error remained after renaming `credits` and `grade`; updated the review table and added localStorage migration for older saved rows.
  - Saved-document extraction initially hit the old deployed Edge Function validation (`A pending PDF storage path is required`); redeployed with `npx supabase functions deploy extract-transcript`.

## Update 25: Current USF Quiz Redirects and Profile Recommendation Wiring

**Date:** June 10, 2026

- Replaced placeholder Current USF quiz result next-step buttons with real route links based on the final advising-needs question.
- Routed major-fit and major-comparison selections to the Bellini degree explorer with Current USF context.
- Routed completed-course questions to both the transcript upload page and the transition guide.
- Routed graduation-timing, major-entry-requirements, questions-for-advising, and not-sure-advising selections to the Current USF transition guide, including the gateway requirements section where appropriate.
- Added a quiz results action that saves the visible recommended majors to the Current USF profile and routes students to `/profile`.
- Converted quiz recommendation names into profile major slugs for both active Bellini majors and interdisciplinary/future degree options.
- Connected the Current USF profile quiz recommendations section so the latest quiz recommendations and match percentages display instead of placeholder copy.
- Verified the changes with `npm run build`.
- Known validation note:
  - `npm run lint` still fails on existing `react-hooks/set-state-in-effect` issues in `DegreeDetail.tsx` and `TransferPlanner.tsx`.

## Update 26: Transcript Extraction Refinements and Course Review Tools

**Date:** June 10, 2026

- Added a print warning dialog on the Current USF transcript page so students are alerted before printing when extracted course rows still have missing required fields.
- Added a visible extracted-course count under the transcript review action buttons.
- Added a bulk `Remove all courses` action and kept row-level remove controls for individual course cleanup.
- Changed long course-title editing from a single-line input to a multiline field so wrapped titles can be reviewed and corrected more easily.
- Updated IDH course categorization so IDH courses automatically show as `Honors elective` in the Area field.
- Refined transcript parser handling for campus codes, including `T`, `S`, `SP`, `SM`, and `WEB`, so campus markers are not mistaken for titles, grades, or course codes.
- Fixed grade parsing so plus/minus grades such as `A+`, `A +`, `B-`, and `B -` are preserved.
- Added line-aware parsing for split course titles, including cases where title fragments appear before and after grade/credit columns.
- Added transcript noise filtering for browser headers, FLVC URLs, page counts, timestamps, generated/printed lines, academic standing text, term GPA summaries, and Cambridge/AICE exam headings.
- Added hard transcript segment boundaries so page breaks, term summaries, dates, and fake course-like rows do not leak into the previous course title.
- Fixed split grade rows such as `T A 3 3 12` so they are treated as the grade/credit continuation for the prior course instead of becoming fake course codes.

## Update 27: Current Bellini Student Major-Change Dashboard and Course Overlap Tools

**Date:** June 15, 2026

- Refocused the Current Bellini College student dashboard for students already in computing who are considering whether to stay in CS, move to AI, Cybersecurity, Computer Science and Engineering, IT, or another computing-related option.
- Added the Current Bellini Student Intake Quiz with Supabase-backed session, response, and result persistence.
- Added quiz questions around current major, possible destination major, reasons for switching, topic interests, topics to reduce, best-fit courses, career direction, technical comfort, decision priorities, switch-versus-electives preference, timeline position, and advising preparation needs.
- Added Bellini student quiz recommendation scoring, quiz result storage, and result actions for profile, degree comparison, course overlap, transcript review, and advising preparation.
- Built the Current Bellini Major Change Guide using the Current USF guide pattern, with stronger emphasis on official Bellini evaluation of grades, prerequisites, attempts, excess credit hours, and the four-year completion rule.
- Added the Bellini student profile and transcript upload flow, including profile persistence, transcript document handling, and a dashboard link back to transcript extraction.
- Added the Course Overlap Planner with an all-majors index, placeholder pages for future PDFs, local completed-course checkboxes, progress tracking, transcript-upload links, and advising reminders.
- Improved the course-overlap checklist UI by grouping courses into requirement areas, adding completed counts per group, aligning code/title/credit columns, reducing excessive gaps, and adding mobile-friendly row behavior.
- Added ready course-overlap checklists 
- Updated the Bellini student Supabase schema with profile tables and quiz session/response/result tables, including anonymous prototype grants and RLS policies.
- Verified the final course-overlap and Bellini dashboard changes with targeted ESLint checks and repeated `npm run build` runs.


## Update 28: Current Bellini Major-Change Refinements

**Date:** June 16, 2026

- Updated the Current USF and Current Bellini major-change guide gateway sections with clearer GPA, grading, attempt, and S/U grade requirements.
- Cleaned up the Course Overlap Planner index by removing readiness/status summary cards, removing card-level course-list status labels, and replacing direct four-year-plan PDF buttons with links to each major's Flowcharts, Plans, and Electives section.
- Updated the Course Overlap detail page so the Flowcharts, Plans, and Electives action opens in a new tab.
- Added a printable checked-course report to every Course Overlap checklist, grouped by requirement-area section title, with a more visible print action at the bottom of the checklist.
- Added a Current Bellini-only major-switch lens to the shared Degree Comparison page, showing what changes between two selected majors across focus, coursework direction, skills, course-overlap next steps, and advising questions.
- Updated the Current Bellini Degree Explorer intro copy so Add to Compare points students toward the new switch-impact comparison.
- Reworked the Current Bellini dashboard planning section into a compact Next Steps section for comparing paths, checking overlap, reviewing requirements, and meeting with advising.
- Verified the updates with repeated `npm run build` runs.


## What I Will Focus On Next
- Validate transcript extraction against multiple USF transcript/e-transcript formats and refine section-aware parsing.
- Continue transcript extraction refinements.
- Continue reviewing planned features for the Current USF non-Bellini group.
