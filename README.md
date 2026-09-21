# Pulsights

Financial data on Nigerian Exchange (NGX) listed companies — Revenue, Profit, Operating
Cash Flow, Debt, EPS, Dividend, ROE and Valuation (market cap, P/E, P/B) — plus price
charts, company profiles, sector breakdowns, a compare view, a watchlist, and an honest
"how to buy this stock" section.

**Every page is honest about data freshness**: a visible "as of &lt;timestamp&gt;, source:
&lt;provider&gt;" badge appears wherever data is shown, and the app never implies
tick-level real-time when the underlying data is delayed, EOD, or placeholder.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Prisma ORM + SQLite (dev), swappable to Postgres for production
- Recharts for price/revenue/dividend charts
- A `DataProvider` interface (`src/lib/data-providers/`) so the market-data source is
  swappable without touching any page or component

## Getting started

```bash
npm install
npm run db:migrate   # applies the Prisma schema to a local SQLite DB
npm run db:seed       # seeds the 20 initial companies with placeholder data
npm run dev
```

Open http://localhost:3000.

## Data model

`prisma/schema.prisma` defines `Company`, `Quote`, `Fundamentals`, `PriceHistory`, and
`DividendHistory`. Every row that isn't real, verified data is stamped `isPlaceholder:
true` plus an `asOf` timestamp and `source` string, which the UI surfaces directly.

## DataProvider adapters (`src/lib/data-providers/`)

Pages and API routes never call a market-data API directly — they read from the DB, and
only the cron jobs (`src/lib/refresh.ts`) call `getDataProvider()`. Switch the active
adapter with `DATA_PROVIDER` in `.env`:

| `DATA_PROVIDER` | Adapter | Status |
|---|---|---|
| `seed` (default) | `seed-provider.ts` | Active — reads local SQLite, populated by `npm run db:seed`. No cost, no keys needed. |
| `ngx` | `ngx-provider.ts` | Stub. NGX's own Market Data API (https://marketdataapiv3.ngxgroup.com/portal) has **no self-serve signup** — every product routes to "Contact us," implying a sales/approval process. No free tier; pricing runs roughly ₦100k–₦1M/year locally or $1,000–$12,500/year internationally depending on product and real-time/delayed/EOD tier. Confirm feasibility with NGX directly before relying on this. |
| `eodhd` | `eodhd-provider.ts` | Stub, but endpoint mapping is written against EODHD's real API shape. Confirmed to cover XNSA (159 Nigerian tickers, matches this app's seed list). Needs **two** paid tiers: prices via "All World Extended" (~$25–30/mo) and fundamentals via "Fundamentals Data Feed" (~$50–60/mo) or the "ALL-IN-ONE" bundle (~$83–100/mo). The free tier (20 calls/day) is not usable for a real app. |
| `rapidapi` | `rapidapi-provider.ts` | Stub. Unofficial "NGXEQTY" listing on RapidAPI; pricing/plan details require a logged-in RapidAPI session to view, and secondary sources suggest its equity data may only cover 2019–2022 (i.e. possibly stale, not a live feed). Treat as the least durable option of the three. |

**No paid tier is active.** The app ships on `seed` by default. Do not set `DATA_PROVIDER`
to anything paid without confirming cost and getting sign-off first — see the adapter
file's header comment for what's actually configured/verified vs. still a guess.

## Cron refresh (`vercel.ts`, `src/app/api/cron/*`)

- `/api/cron/refresh-prices` — scheduled every 15 min, 09:00–13:59 UTC (10:00–14:59 WAT)
  Mon–Fri, which is a superset of NGX's 10:00–14:30 WAT trading window. The route itself
  checks `isNgxTradingHours()` (`src/lib/trading-hours.ts`) and no-ops outside that window,
  since cron syntax can't express a ":30" cutoff cleanly.
- `/api/cron/refresh-fundamentals` — scheduled weekly (Monday 05:00 UTC). Fundamentals only
  change on earnings releases, so this doesn't need to run often.
- Both routes check a `CRON_SECRET` bearer token (set the same value in Vercel's env vars
  and in `.env`) so they can't be triggered by arbitrary requests.

Pages read exclusively from the DB — they never call the live DataProvider — so switching
to a real (paid) adapter only affects what the cron jobs write, not per-request cost.

## Watchlist

Client-side only (`localStorage`, `src/lib/watchlist.ts`), no auth. v1 by design — see
project brief.

## Disclaimer

Every page shows: **"Not financial advice. Data may be delayed. Verify before investing."**
See `src/components/DisclaimerFooter.tsx`.
