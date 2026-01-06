# Cottage Bowls

A Nuxt 4 app for building and pre-ordering high‑protein cottage cheese bowls for pickup at Dixie Springs Park in Hurricane, Utah.

This repo contains:
- A marketing/landing page with nutrition comparisons and a waitlist form
- A full ordering flow with bowl builder, pricing, and Stripe Checkout
- Donation flow for early supporters
- A simple admin dashboard for viewing recent paid orders and donations

## Tech stack

- **Nuxt 4** (app directory)
- **Nuxt UI** for components
- **Neon Postgres** via `@neondatabase/serverless`
- **Stripe Checkout** for payments & donations
- **Mapbox GL JS** for the locations map

## Getting started

Clone the repo, then install dependencies:

```bash
npm install
# or
pnpm install
```

### Environment variables

Create a `.env` file (or configure these in your hosting environment):

```bash
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_DASHBOARD_KEY=some-shared-secret # optional but recommended
NUXT_PUBLIC_MAPBOX_TOKEN=pk.YourPublicMapboxToken
```

> Note: never commit your real `.env` file. This repo ignores `.env*` by default.

### Development

Run the dev server on `http://localhost:3000`:

```bash
npm run dev
# or
pnpm dev
```

### Linting and typecheck

```bash
npm run lint
npm run typecheck
# or
pnpm run lint
pnpm run typecheck
```

### Production build

```bash
npm run build
npm run preview
# or
pnpm build
pnpm preview
```

## Main features

- **Landing page** (`/`)
  - Hero describing Cottage Bowls and Dixie Springs pickup
  - "Why Cottage Bowls?" nutrition and price comparison vs froyo/acai
  - Email waitlist form posting to `/api/waitlist`

- **Locations** (`/locations`)
  - Mapbox map centered on Dixie Springs Park
  - Card list of pickup location(s) linking into `/order?locationId=...`

- **Ordering** (`/order`)
  - Pickup location selector
  - Customer info and bowl size/base selection
  - Premade bowls and build‑your‑own toppings
  - Live pricing and a nutrition snapshot (estimated protein, added sugar, calories)
  - Sends orders to `/api/checkout` which creates a row in `orders` and starts a Stripe Checkout Session

- **Order confirmation** (`/order-confirmed`)
  - Loads the order via `/api/order-by-session?session_id=...`
  - Shows pickup details, bowl summary, fun "flair" name based on toppings, and total paid

- **Support / donations** (`/support` and `/donation-confirmed`)
  - Donation form posting to `/api/donate-checkout`
  - Confirmation page reading from `/api/donation-by-session`

- **Admin dashboard** (`/admin`)
  - Uses `x-admin-key` header that must match `ADMIN_DASHBOARD_KEY`
  - Lists recent paid orders and donations via `/api/admin-orders` and `/api/admin-donations`

## Security & privacy

- No secrets are committed to the repo; all keys/URLs are read from `process.env`.
- `.env`, `.env.*`, and `.env*.local` are git‑ignored.
- Admin endpoints are protected by a shared key header; keep `ADMIN_DASHBOARD_KEY` private.

## License

See `LICENSE` for details.
