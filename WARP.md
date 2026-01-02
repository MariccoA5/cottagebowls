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

Environment variables for Supabase are read from `process.env` in `server/api/orders.post.ts`. To avoid runtime errors when hitting the `/api/orders` endpoint (used by the `test-order` page), ensure these are set before running the dev server:

- `SUPABASE_URL`
- `SUPABASE_KEY`

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
  - Full-screen hero section with a background image (`/images/hero-bowl3.png`) and call-to-action button linking to `/locations`.
  - "Why Cottage Bowls" feature section and image preview of bowls.
- `locations.vue` — Map and pickup locations
  - Uses Mapbox GL JS (`mapbox-gl`) to render an interactive map centered on St. George.
  - Defines a `drops` array of pickup locations (id, name, address, schedule, coordinates) and builds both map markers and a responsive card grid.
  - Clicking a card calls `focusDrop(drop)` to fly the map to that location and open its popup.
  - `preorder(drop)` and `globalPreorder()` are simple client-side `alert` flows for now (no backend persistence here).
  - Mapbox token is currently set directly on `mapboxgl.accessToken` in this file.
- `order.vue` — Placeholder order page
  - Simple page that currently points users back to drop-off locations.
- `test-order.vue` — Supabase-backed test order form
  - Uses Nuxt UI form components (`UForm`, `UFormField`, `UInput`, `UCheckbox`, `UButton`).
  - `form` state includes `name`, `email`, `phone`, `location`, `toppings[]`, and `quantity`.
  - On submit, computes a `total` based on base price (15) plus per-topping add-ons and posts JSON to `/api/orders`.
  - Displays a success or error message based on the API response.
- Additional marketing/support pages (`about.vue`, `support.vue`) live alongside these and are standard static content pages wired into `TheHeader` navigation.

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
  - Creates a Supabase client with `createClient(supabaseUrl, supabaseAnonKey)` from `@supabase/supabase-js`.
  - Expects `SUPABASE_URL` and `SUPABASE_KEY` environment variables to be defined; if either is missing, throws a 500 error at import time via `createError` with message `Supabase credentials missinggg`.
  - In the handler, reads the JSON request body and inserts it into the `orders` table: `supabase.from('orders').insert(body).select()`.
  - Logs and surfaces a 500 error if the insert fails, otherwise returns `{ success: true, data }`.
- The `test-order` page is currently the primary consumer of this API, and its `body` shape (form fields plus `total`) should stay in sync with the Supabase `orders` table schema.

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
