// Default DataProvider: reads whatever is in the local SQLite DB, which
// db:seed populates from prisma/seed-companies.ts. This is priority #4 in
// the adapter fallback chain (NGX API -> EODHD -> RapidAPI -> this), and is
// what the app runs on until a real data source is wired up and configured.

import { db } from "@/lib/db";
import type { DataProvider, FundamentalsPeriod, HistoricalRange, PricePoint, Quote } from "./types";

function rangeToStartDate(range: HistoricalRange): Date {
  const start = new Date();
  switch (range) {
    case "1M":
      start.setMonth(start.getMonth() - 1);
      break;
    case "6M":
      start.setMonth(start.getMonth() - 6);
      break;
    case "1Y":
      start.setFullYear(start.getFullYear() - 1);
      break;
    case "5Y":
      start.setFullYear(start.getFullYear() - 5);
      break;
  }
  return start;
}

export class SeedDataProvider implements DataProvider {
  readonly name = "Seed data (placeholder)";

  async getQuote(symbol: string): Promise<Quote | null> {
    const company = await db.company.findUnique({
      where: { symbol },
      include: { quotes: true },
    });
    const q = company?.quotes[0];
    if (!company || !q) return null;

    return {
      symbol: company.symbol,
      price: q.price,
      previousClose: q.previousClose,
      change: q.change,
      changePercent: q.changePercent,
      dayHigh: q.dayHigh ?? undefined,
      dayLow: q.dayLow ?? undefined,
      volume: q.volume ?? undefined,
      marketCap: q.marketCap ?? undefined,
      asOf: q.asOf,
      source: q.source,
      isPlaceholder: q.isPlaceholder,
    };
  }

  async getFundamentals(symbol: string): Promise<FundamentalsPeriod[]> {
    const company = await db.company.findUnique({
      where: { symbol },
      include: { fundamentals: { orderBy: { fiscalYearEnd: "asc" } } },
    });
    if (!company) return [];

    return company.fundamentals.map((f) => ({
      periodLabel: f.periodLabel,
      periodType: f.periodType as "ANNUAL" | "QUARTERLY",
      fiscalYearEnd: f.fiscalYearEnd,
      revenue: f.revenue,
      profit: f.profit,
      operatingCashFlow: f.operatingCashFlow,
      totalDebt: f.totalDebt,
      eps: f.eps,
      dividendPerShare: f.dividendPerShare,
      dividendYield: f.dividendYield,
      roe: f.roe,
      peRatio: f.peRatio,
      pbRatio: f.pbRatio,
      sharesOutstanding: f.sharesOutstanding,
      asOf: f.asOf,
      source: f.source,
      isPlaceholder: f.isPlaceholder,
    }));
  }

  async getHistoricalPrices(symbol: string, range: HistoricalRange): Promise<PricePoint[]> {
    const company = await db.company.findUnique({ where: { symbol } });
    if (!company) return [];

    const rows = await db.priceHistory.findMany({
      where: { companyId: company.id, date: { gte: rangeToStartDate(range) } },
      orderBy: { date: "asc" },
    });

    return rows.map((r) => ({
      date: r.date,
      open: r.open,
      high: r.high,
      low: r.low,
      close: r.close,
      volume: r.volume ?? undefined,
    }));
  }
}
