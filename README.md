# EduAI Future Lab — MVP

Single-page application built with Vite, React, TypeScript, and Tailwind CSS to showcase the EduAI Future Lab learner journey. The app runs fully in the browser using `sessionStorage` for ephemeral state—close the tab to reset the experience.

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check and create a production build.
- `npm run preview` – preview the production build locally.

> **Note:** The project does not require a backend or external APIs. All data is loaded from local JSON seed files.

## Key features

- Onboarding flow that generates a personalised learning path based on interests and experience level.
- Dashboard summarising next course, progress, badges, certificate readiness, and recent activity.
- Course previews with tabbed lessons, practice, and final challenge sections (view-only).
- Gamification with session-only badge tracking and certificate preview after three course views.
- Teacher console with read-only roster insights and Admin Seed page for validating course JSON files.

## Project structure

```
src/
  components/        # Layout, UI, onboarding, course, path, and gamification components
  data/              # Static JSON seed content
  lib/               # Types, content loader, session helpers, learning path engine, time utils
  pages/             # Route-aligned page components
  styles/            # Tailwind CSS entrypoint
  App.tsx            # Session provider and router bootstrap
  main.tsx           # Vite entry file
```

Tailwind CSS is configured via `tailwind.config.js`, while ESLint and Prettier ensure consistent formatting and linting.
