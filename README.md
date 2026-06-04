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

This project is an MVP for a role-based support platform connected to the larger CIC-funded initiative. The goal of the platform is to help different user groups access relevant resources, recommendations, and progress tracking through personalized dashboards.

The MVP focuses on account creation, user group onboarding, saved user group information, personalized dashboards, and a guided recommendation flow. The recommendation system will begin as a rule-based decision-tree model and can later be expanded into a more advanced AI-supported system.

---

## Project Goal

The main goal of this MVP is to create a working platform where users can:

- Create an account or log in
- Select their user group during first-time onboarding
- Have their user group saved to their account
- Automatically land on their correct role-based dashboard after login
- View personalized resources, recommendations, and progress
- Use a guided recommendation flow to find relevant support

---

## User Groups

The current MVP is planned around these user groups:

1. High school students / prospective students
2. Current USF students in another major
3. Current Bellini College students considering switching degrees
4. Transfer students from community or state colleges
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

The development log should be updated regularly as new features are added.

---
## Current Status

The project is currently in active MVP development. The main app flow, user group selection, role-based dashboards, high school degree explorer, quiz recommendation flow, transition planner, and transfer student tools are in progress.

Recent work has focused on high school interdisciplinary Computer Science options, planner integration, refined quiz scoring with match percentages, and transfer planning features.

