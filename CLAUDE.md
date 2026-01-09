# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Start Vite dev server on port 3000
- `npm run build` - Build for production (outputs to `build/`)
- `npm run serve` - Preview production build

There is no test runner script in package.json. Tests use Jest with `@testing-library/react`. Spec files are co-located with their components (e.g., `Feed.spec.ts`).

## Environment

Create `.env` with `VITE_PENCIL_BOX_URL` pointing to the pencilbox API (e.g., `http://localhost:8080` for local development, or `https://romanyanke.github.io/pencilbox` for production).

## Architecture

This is a React 19 + TypeScript + Vite application for browsing a pencil collection with i18n support (English/Russian) and geographic filtering.

### Provider Hierarchy

The app uses nested context providers in a specific order (`src/index.tsx`):

```
Provider (Redux) → LanguageProvider → State → Feed → Theme → Taxonomy → App
```

- **LanguageProvider**: i18next wrapper for EN/RU language switching
- **State**: Application state (selected pencil, country filter, tag filter) synced to URL query params
- **Feed**: Manages pencil list data with pagination via RTK Query
- **Theme**: Day/night theme based on `daynight` library
- **Taxonomy**: Fetches and provides collection metadata (tags, countries)

### State Management

- Redux Toolkit with RTK Query for API calls (`src/api.ts`)
- API endpoints: `taxonomy`, `feed`, `pencil` - all localized
- URL state sync: filters and selected items persist to query string via `State.hooks.ts`

### Key Patterns

- Each feature folder contains: component, hooks, utils, interface, CSS module, and optional spec file
- Context + hooks pattern: contexts export raw context, hooks provide `useXxx()` access
- API paths are locale-prefixed (e.g., `/en/pencil/123/` vs `/pencil/123/`)

### Map

Uses TopoJSON with d3-geo projection. Map data source and simplification process documented in README.md.
