# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands and Tooling

### Install dependencies

```bash path=null start=null
npm install
```

Scripts are defined in `package.json`; you can use `npm` (as shown here) or `pnpm` if you prefer to match CI.

### Local development

Start the Nuxt dev server on `http://localhost:3000`:

```bash path=null start=null
npm run dev
```

Environment variables for the Neon Postgres database are read from `process.env` in the Nitro server handlers. To avoid runtime errors when hitting the `/api/orders` or `/api/waitlist` endpoints, ensure this is set before running the dev server:

- `DATABASE_URL`

### Production build and preview

Build the application for production:

```bash path=null start=null
npm run build
```

Preview the production build locally:

```bash path=null start=null
npm run preview
```

### Linting and typechecking

Run ESLint over the project (configured via `@nuxt/eslint` and the `eslint` block in `nuxt.config.ts`):

```bash path=null start=null
npm run lint
```

Run Nuxt typechecking (TypeScript / vue-tsc via `nuxt typecheck`):

```bash path=null start=null
npm run typecheck
```

### Continuous integration

GitHub Actions workflow at `.github/workflows/ci.yml` currently uses `pnpm` on every push and executes:

1. `pnpm install`
2. `pnpm run lint`
3. `pnpm run typecheck`

Locally you can run the equivalent `npm run` commands.

There is currently no test script configured in `package.json`; when a test runner is added (e.g. Vitest), document the corresponding `npm test` / single-test commands here.

## High-Level Architecture

### Framework and entrypoints

- This is a Nuxt 4 application using the `app/` directory structure and `@nuxt/ui` for the component library.
- `app/app.vue` is the main application shell. It:
  - Sets HTML metadata and SEO tags via `useHead` and `useSeoMeta` (page title, description, social cards).
  - Wraps the app in `UApp` (Nuxt UI layout wrapper).
  - Renders global navigation/footer components (`<TheHeader />`, `<TheFooter />`).
  - Renders the current page via `<NuxtPage />` inside `<UMain>`.

### Styling and theming

- Global CSS is configured in `nuxt.config.ts` via the `css` array, including:
  - `~/assets/css/main.css` (project-level styles; create/edit here if you need global CSS).
  - `mapbox-gl/dist/mapbox-gl.css` (required for the Mapbox map UI).
- `app/app.config.ts` customizes Nuxt UI theme colors:
  - `primary: 'amber'`, `neutral: 'sky'`, `gray: 'stone'` and a light gradient background.
- `colorMode` in `nuxt.config.ts` is fixed to `light`, with no dark mode class suffixes.

### Routing and pages

Nuxt file-based routing is used under `app/pages/`:

- `index.vue` — Landing/marketing page
  - Hero section with background image (`/images/hero-bowl3.png`), grand opening marquee, and CTA buttons that route into the ordering flow.
  - "How it works" and comparison sections explaining why Cottage Bowls vs frozen yogurt and acai, including nutrition and price comparisons with badges.
  - Email waitlist form at the bottom that posts to `/api/waitlist` and stores signups in Neon Postgres.
- `locations.vue` — Map and pickup locations
  - Uses Mapbox GL JS (`mapbox-gl`) to render an interactive map centered on St. George.
  - Defines a `drops` array of pickup locations (id, name, address, schedule, coordinates) and builds both map markers and a responsive card grid.
  - Clicking a card focuses the map on that location and opens its popup.
  - "Reserve a Bowl" buttons link to `/order?locationId=...` so the order page is pre-filtered to the chosen pickup location.
  - Bottom CTA routes visitors to the Support page.
  - Mapbox token is currently set directly on `mapboxgl.accessToken` in this file.
- `order.vue` — Main ordering experience
  - Full bowl builder with pickup location selector, customer details, base bowl (size + cottage cheese brand), premade bowls, and a build-your-own toppings section.
  - Topping pricing handled in cents with standard vs premium nuts and fruits and sweetener rules; order summary card is sticky on desktop.
  - Submits orders to `/api/orders`, which persists to Neon Postgres.
- `test-order.vue` — Legacy test order form (can be removed once no longer needed)
  - Older, simpler form that used to post to Supabase; current production ordering flow is handled by `order.vue`.
- `about.vue` and `support.vue` — Marketing/support pages
  - About: family story, US Army service, healthy-living philosophy, and family photo from `/images/family.jpeg`.
  - Support: contact info and how users can support the business.

### Layout components

Located in `app/components/`:

- `TheHeader.vue`
  - Uses `UHeader` from Nuxt UI.
  - Left slot: logo image (`/images/logosmall.png`) and brand name linking to `/`.
  - Right slot (desktop): navigation links to `/`, `/about`, `/support` and a prominent `Order Now` button linking to `/locations`.
  - Body slot (mobile): vertical navigation for main routes.
- `TheFooter.vue`
  - Uses `UFooter` with a simple copyright line (current year) and social buttons.
  - Links out to X and Instagram profiles via Nuxt UI `UButton` icons.
- `AppLogo.vue`
  - Small logo image component (`/images/cottagebowls.jpeg`) used where a standalone logo is needed.

### Server API and backend integration

- `server/api/orders.post.ts`
  - Nitro server route handling `POST /api/orders`.
  - Uses `@neondatabase/serverless` and the `DATABASE_URL` env var to create a Neon Postgres client.
  - On each request, reads the JSON body and inserts a row into the `orders` table, including customer info, pickup location, base pricing, toppings (stored as `jsonb`), preset key, and `total_cents`.
  - Logs a 500 error if the insert fails and otherwise returns `{ success: true, data }` with the inserted rows.
- `server/api/waitlist.post.ts`
  - Nitro server route handling `POST /api/waitlist`.
  - Also uses the Neon client to insert `email` and `source` into the `waitlist` table.
  - Validates that `email` is present and returns a 400 if not.
- The main `order.vue` page and the landing-page waitlist form are the primary consumers of these APIs, and their payload shapes should stay in sync with the Neon `orders` and `waitlist` table schemas.

### Configuration and TypeScript

- `nuxt.config.ts`
  - Registers Nuxt modules: `@nuxt/eslint` and `@nuxt/ui`.
  - Enables devtools.
  - Sets `routeRules` to prerender `/` for static hosting/performance.
  - Configures ESLint stylistic rules (e.g., no dangling commas, `1tbs` brace style).
  - Sets a `compatibilityDate` for Nuxt/Nitro to align with a specific runtime baseline.
- `tsconfig.json`
  - Uses Nuxt's generated `.nuxt/tsconfig.*.json` files via `references`, delegating most TS configuration to Nuxt.

### Testing

- There is currently no test framework or `test` script defined in `package.json`.
- When adding tests (e.g. unit tests with Vitest or end-to-end tests with Playwright), define appropriate `scripts` (e.g. "test", "test:unit") and update this file with:
  - How to run the full test suite (`npm test`).
  - How to run a single test file or filtered test (e.g. `npm test path/to/file.spec.ts` or `npm test -- --runTestsByPath ...`).
