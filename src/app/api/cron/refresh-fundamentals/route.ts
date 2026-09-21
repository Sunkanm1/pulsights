import { NextRequest, NextResponse } from "next/server";
import { refreshFundamentals } from "@/lib/refresh";

// Scheduled by vercel.ts crons (see project root), weekly. Fundamentals
// (Revenue/EPS/Debt/ROE/etc.) only change on earnings releases, so a tight
// schedule would be wasted API calls — this just needs to not miss a
// release for more than a few days.

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await refreshFundamentals();
  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    refreshed: results.length - failed.length,
    failed: failed.length,
    errors: failed,
  });
}
