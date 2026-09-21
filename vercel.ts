import type { VercelConfig } from "@vercel/config/v1";

// Price refresh: every 15 min, 09:00-13:59 UTC (10:00-14:59 WAT), Mon-Fri.
// This is a superset of the actual 10:00-14:30 WAT trading window — the
// route itself (src/app/api/cron/refresh-prices) checks isNgxTradingHours()
// and no-ops outside it, since cron syntax can't express a ":30" cutoff
// cleanly across an hour range.
//
// Fundamentals refresh: weekly (Monday 05:00 UTC). Revenue/EPS/Debt/ROE only
// change on earnings releases, not intraday — no need for anything tighter.
export const config: VercelConfig = {
  framework: "nextjs",
  crons: [
    { path: "/api/cron/refresh-prices", schedule: "*/15 9-13 * * 1-5" },
    { path: "/api/cron/refresh-fundamentals", schedule: "0 5 * * 1" },
  ],
};
