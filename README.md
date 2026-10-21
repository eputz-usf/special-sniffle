# Bellini Degree Explorer Beta

A React, TypeScript, and Vite app for exploring Bellini College degrees, viewing resources, and comparing two programs. It supports prospective, transfer, current USF, and current Bellini students.

This public beta needs no login, database, or environment variables. Unavailable tools remain disabled and labeled “Coming soon.” Academic content approval is pending; student profiles and transcript uploads are outside this beta.

## Run and build

Use Node 22.12 or later in the Node 22 line (`.nvmrc` selects Node 22).

```bash
npm ci
npm run dev
```

Open the URL printed in the terminal.

| Command | Purpose |
| --- | --- |
| `npm run check` | Run lint, regression tests, URL syntax checks, and the build. |
| `npm run build` | Generate production files in `dist/`. |
| `npm run preview` | Preview the production build locally. |

The webmaster/deployment team handles hosting. Deploy the complete `dist/` output; subfolder paths and direct-link routing may need host-specific configuration. See [infrastructure](docs/infrastructure.md) for details.

## Where to find information

| Need | Document |
| --- | --- |
| Architecture, routes, storage, and hosting requirements | [Infrastructure](docs/infrastructure.md) |
| Diagnose and repair problems | [Troubleshooting](docs/troubleshooting.md) |
| Reasons for implementation choices | [Design rationale](docs/design-rationale.md) |
| Academic sources, approvals, and content update locations | [Content review](docs/content-review.md) |
| Test results and known limitations | [Beta verification](docs/beta-verification.md) |
| All documentation and original reports | [Documentation guide](docs/README.md) |

## Folder setup

```text
src/
  main.tsx          App startup and browser router
  App.tsx           Routes and shared header
  pages/            Audience dashboards, explorers, details, and comparisons
  components/       Reusable interface components
  data/             Degree content and official resource links
  utils/            Audience context, storage, filters, and comparison helpers
  types/            Shared TypeScript types
  styles/           Page and component styles; global styles in src/index.css
  assets/           Images imported by the app
public/             Public assets, including the favicon
docs/               Handoff guides, content review, and verification reports
  performance/      Original Lighthouse reports
scripts/            External-link checking script
tests/              Automated regression tests
dist/               Generated production build (not tracked)
```

`package.json` defines dependencies and commands; `package-lock.json` locks dependency versions. Root configuration files control Vite, TypeScript, and ESLint. Some degree-detail content lives directly in page components; consult the content-review file map before editing.
