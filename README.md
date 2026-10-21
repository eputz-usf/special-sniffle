# CIC Support Platform MVP

A React and TypeScript beta for exploring USF Bellini College computing degrees and preparing for advising. The platform supports the larger CIC-funded initiative with dashboards tailored to prospective students, transfer students, current USF students outside Bellini, and current Bellini students considering a degree change.

## Current Features

| User group | Available in the beta | Coming soon |
| --- | --- | --- |
| High school / prospective students | Degree explorer, degree comparisons, career information, bachelor's/master's pathways, integrated interdisciplinary cards, and parent information | Admissions and transition planner |
| Non-USF / transfer students | Transfer dashboard and degree exploration resources | Transfer readiness guide and planner |
| Current USF students outside Bellini | Dashboard and degree explorer | Profile, readiness guide, transcript upload, and course overlap tools |
| Current Bellini students | Degree Explorer for Major Changes, including degree details and comparisons | Major change guide, profile, course overlap planner, transcript upload and course extraction |

Intake quizzes and personalized program recommendations are **coming soon** across the beta. Both explorers include the main five programs and seven planned interdisciplinary degrees/concentrations, with filters, details, official planning resources, and two-program comparisons. The Interdisciplinary Computing Majors shortcut opens a separate page containing only the anticipated 2027 Economics and Anthropology degrees, with incomplete-content labels. Admissions status and academic content await Bellini approval. Advisor and staff dashboards are not part of the current routed user flow.

## Run Locally

Use Node.js 22.12 or later in the Node 22 line and npm (`.nvmrc` selects Node 22). The repository includes an npm lockfile.

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   Open the URL printed in the terminal, usually `http://localhost:5173`.

The current beta runs without Supabase or environment variables.

### Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run the TypeScript build and generate production assets in `dist/` |
| `npm run preview` | Preview the production build locally after building |
| `npm run lint` | Run ESLint |
| `npm run test` | Run explorer and public-route regression checks |
| `npm run check:links` | Check syntax of external URLs in source |
| `npm run check:links -- --online` | Refresh the online link report for manual review |
| `npm run check` | Run lint, tests, URL checks, and the production build |

Regression checks cover direct explorer links, degree pages, comparisons, disabled Bellini tools, and unavailable-page recovery. Browser usability and accessibility checks remain part of the pre-launch review.

## User Flow and Authentication

The entry page at `/` lets users select one of four groups. The selected group is saved in `localStorage`.

- High school/prospective and non-USF/transfer users go directly to their dashboard.
- Current USF and Bellini users also go directly to their selected dashboard.
- Legacy `/login`, `/signup`, and `/home` URLs redirect to user-group selection.

This public beta has no login or account creation. Degree exploration is available without authentication. Direct `/degrees` links default to Bellini context; recognized `from` parameters select the appropriate dashboard and advising questions.

## Prototype Persistence

The selected user group is stored in browser `localStorage`. Bellini profile saving, document uploads, transcript extraction, and course overlap planning are not available in this beta. Their pages, persistence helpers, Supabase schemas, and document function have been removed; their dashboard cards are disabled and labeled “Coming soon.”

Degree exploration, degree details, filters, and side-by-side comparisons remain available. No backend setup is required for these features.

## Project Structure

```text
src/
  App.tsx                 Application routes and shared header
  components/             Shared dashboard components
  pages/                  Group selection, login, dashboards, and degree pages
    belliniStudent/       Bellini dashboard
    highSchool/           Prospective-student degree and parent resources
  data/                   Degree content
  utils/                  User-group selection and prototype session helpers
  styles/                 Feature styles
docs/                    Production planning documents
```

## Production Readiness

This is a development prototype and is **not ready to accept real student data**. The explorer is public and has no authentication requirement. The current beta does not provide student profiles or document uploads.

Production preparation and required institutional access are tracked in:

- [Documentation guide](docs/README.md)

The verification record describes the static beta, available test evidence, and remaining review requirements. Review academic planning content with official USF resources and advising before making degree decisions.

## Beta Handoff and Content Maintenance

- [Latest verification, handoff limitations, and owner actions](docs/beta-verification.md)
- [Earlier local readiness results](docs/beta-verification.md#earlier-local-readiness-review)
- [Content sources, review status, and update instructions](docs/content-review.md)

The app currently assumes hosting at the website root. Configure the final asset base, router base, and app-scoped route fallback after the webmaster confirms the production URL. Publish the generated `dist/` contents through the approved host; local dev/preview servers are not production hosting. Google Fonts is currently loaded from `fonts.googleapis.com` and `fonts.gstatic.com`; the webmaster must approve those origins or supply approved locally hosted fonts.

## Interdisciplinary Content Maintenance

Maintain the seven program identifiers, names, availability labels, descriptions, interests, catalog URLs, and study plans in `src/data/highSchoolFutureDegreeOptions.ts`. Its normalized cards feed both degree datasets; do not add generic business or duplicate interdisciplinary records. Both explorers use the same resources, and comparisons resolve the canonical slugs. Program-specific skills and coursework stay explicitly pending until approved. Economics and Anthropology are displayed on the separate future-options page, excluded from comparison until their content and inclusion are approved.

Record academic approvals and source checks in [content-review.md](docs/content-review.md). See [interdisciplinary-degree-card-tasks.md](docs/content-review.md#interdisciplinary-implementation) for implementation and browser verification status.

High-school interdisciplinary wording lives in `src/data/highSchoolInterdisciplinaryContent.ts`. Use short sentences, familiar words, and explanations of new terms. Keep official names, program identifiers, and resource URLs shared; shared-group detail wording remains in `src/data/interdisciplinaryDetailContent.ts`.
