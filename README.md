# CIC Support Platform MVP

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

For a production check:

```bash
npm run build
```

## Project Overview

This project is an MVP for a role-based support platform connected to the larger CIC-funded initiative. The goal of the platform is to help different user groups access relevant resources, recommendations, planning tools, and profile-supported next steps through personalized dashboards.

The MVP focuses on user group onboarding, placeholder login routing for USF-connected users, saved user group information, personalized dashboards, degree exploration, guided recommendation flows, and planning/profile persistence. The recommendation system begins as a rule-based decision-tree model and can later be expanded into a more advanced AI-supported system.

---

## Project Goal

The main goal of this MVP is to create a working platform where users can:

- Create an account or log in
- Select their user group during first-time onboarding
- Have their user group saved to their account
- Automatically land on their correct role-based dashboard after login
- View personalized resources, recommendations, and progress
- Use a guided recommendation flow to find relevant support
- Save planning/profile information for the same browser session in the prototype

---

## User Groups

The current MVP is planned around these user groups:

1. High school students / prospective students
2. Transfer students from community or state colleges
3. Current USF students in another college who may be interested in switching into a Bellini computing major
4. Current Bellini College students considering switching degrees
5. Academic advisors / college staff
   
---

## MVP User Flow

The platform begins with user group selection. Users are routed based on whether they are external prospective users or current USF-connected users.

```text
Select User Group
        ↓
High School / Prospective Student OR Transfer Student?
        ↓
Go Directly to Role-Based Dashboard

Current USF Student OR Current Bellini College Student?
        ↓
USF Login Placeholder
        ↓
Go to Role-Based Dashboard
        ↓
View Features, Resources, Recommendations, and Progress
```

---

## Authentication and Prototype Persistence

For current USF students, the prototype assumes that real login would eventually be handled through USF's existing Microsoft authentication system. The app does not implement real Microsoft login or replace USF identity management.

Instead, this MVP uses a placeholder login step to represent where USF authentication would happen in a full implementation.

Supabase supports backend data needs for prototype advising and planning features. For flows without real account creation, the app uses an anonymous browser `session_id` so progress can be remembered on the same browser/device.

Current Supabase-backed prototype areas include:

- Public high school/prospective quiz sessions, responses, and results
- Transfer quiz sessions, responses, and results
- High school transition planner data
- Current USF profile data and programs added to profile

Relevant schema files:

- `supabase/public-quiz-schema.sql`
- `supabase/transfer-quiz-schema-update.sql`
- `supabase/current-usf-profile-schema.sql`

For a future USF production version, Current USF profile data should be tied to the student's authenticated USF identity instead of only an anonymous browser session.

---

## Development Log

A development log is maintained to track daily progress on the project.  
The log includes completed updates, design changes, feature additions, routing changes, dashboard work, and next steps.

This helps document how the MVP is being built over time and makes it easier for collaborators, supervisors, and lab members to review recent progress.

The development log currently includes updates for:

- Project setup and initial React/Vite/TypeScript structure
- Temporary account access and user group selection flow
- USF login placeholder direction
- Role-based dashboard routing
- Prospective/high school dashboard template work
- Degree detail pages and catalog link additions
- High school degree explorer, comparison, quiz recommendations, and transition planner
- Interdisciplinary Computer Science future options
- Transfer dashboard, transfer quiz, and transfer planning tools
- Current USF dashboard, profile page, Add to Profile flow, and Supabase profile persistence

The development log should be updated regularly as new features are added.

---
## Current Status

The project is currently in active MVP development. The main app flow, user group selection, role-based dashboards, high school degree explorer, quiz recommendation flow, transition planner, transfer student tools, and Current USF profile flow are in progress.

Recent work has focused on Current USF student support: wiring the shared degree pages so this group uses `Add to Profile`, moving the Current USF profile into `src/pages/USF/`, saving profile data and programs of interest through Supabase with an anonymous `session_id`, and documenting that this is prototype persistence rather than a replacement for USF Microsoft authentication.
