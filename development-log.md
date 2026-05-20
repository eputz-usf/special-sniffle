# Development Log

## Update 1: Project Setup and Initial Planning

**Date:** May 20, 2026

### What I completed so far

I created the GitHub repository for the CIC Support Platform MVP and cloned it locally using SSH. I also set up the initial React project using Vite with TypeScript, since this project is connected to a larger funded initiative and may need to be expanded or maintained by others later.

So far, the project foundation includes:

- GitHub repository created
- Repository cloned locally
- React + Vite project initialized
- TypeScript selected for better long-term organization
- Initial dependencies installed
- Local development environment tested with `npm run dev`

### Main technical decisions

For the MVP, I am starting with:

- **React** for building the user interface
- **Vite** for the development environment
- **TypeScript** for safer and more organized code
- **Supabase planned later** for authentication and PostgreSQL-based data storage

The project will start with the core website structure first before adding authentication and database features.

### Current project direction

The MVP will include account creation and login. During first-time account setup, users will select their user type. That user type will be saved to their account so that returning users are automatically directed to the correct role-based dashboard.

The main planned user flow is:

```text
Create Account / Log In
        ↓
First-Time User Selects User Type
        ↓
Save User Type to Account
        ↓
Redirect to Role-Based Dashboard
        ↓
View Resources, Recommendations, and Progress
```

### What I will focus on next

Next, I will focus on cleaning the starter React files and creating the first project structure. This includes setting up folders for pages, components, data, types, and future backend utilities.

After that, I will begin creating placeholder pages for:

- Home page
- Login page
- Signup page
- User type selection page
- Student dashboard
- Faculty dashboard
- Advisor/staff dashboard
- Admin/stakeholder dashboard
