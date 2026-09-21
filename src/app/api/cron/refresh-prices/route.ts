import { NextRequest, NextResponse } from "next/server";
import { refreshPrices } from "@/lib/refresh";
import { isNgxTradingHours } from "@/lib/trading-hours";

// Scheduled by vercel.ts crons (see project root) every 15 min, superset of
// NGX trading hours. isNgxTradingHours() below is the precise cutoff, so a
// stray invocation outside 10:00-14:30 WAT Mon-Fri is a no-op.

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isNgxTradingHours()) {
    return NextResponse.json({ skipped: true, reason: "outside NGX trading hours (10:00-14:30 WAT, Mon-Fri)" });
  }

  const results = await refreshPrices();
  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    refreshed: results.length - failed.length,
    failed: failed.length,
    errors: failed,
  });
}
