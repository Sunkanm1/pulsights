// Seeds the local SQLite database with the initial 20 NGX-listed companies.
// Run with: npm run db:seed
//
// All data inserted here is placeholder data (see seed-companies.ts for why)
// and every row is stamped isPlaceholder: true, source: SEED_SOURCE_LABEL,
// asOf: SEED_AS_OF so the UI can render an honest "as of / source" label.

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedCompanies, type SeedCompany } from "./seed-companies";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

export const SEED_SOURCE_LABEL = "Seed data (placeholder)";
const SEED_AS_OF = new Date();

// Deterministic PRNG (mulberry32) so re-seeding produces the same synthetic
// price history every time, keyed off the ticker symbol.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromSymbol(symbol: string): number {
  let h = 0;
  for (let i = 0; i < symbol.length; i++) {
    h = (h * 31 + symbol.charCodeAt(i)) | 0;
  }
  return h;
}

// Generates a weekly synthetic price series over `years` years, random-walking
// from `startPrice` toward `endPrice` so the chart looks plausible without
// claiming to be real historical data.
function generateWeeklyPriceHistory(
  symbol: string,
  startPrice: number,
  endPrice: number,
  volatility: number,
  years: number
) {
  const rand = mulberry32(seedFromSymbol(symbol));
  const weeks = years * 52;
  const points: { date: Date; open: number; high: number; low: number; close: number; volume: number }[] = [];

  const drift = Math.log(endPrice / startPrice) / weeks;
  const weeklyVol = volatility / Math.sqrt(52);

  let price = startPrice;
  const now = new Date();

  for (let w = weeks; w >= 0; w--) {
    const date = new Date(now);
    date.setDate(date.getDate() - w * 7);

    if (w === 0) {
      price = endPrice;
    } else {
      const shock = (rand() - 0.5) * 2 * weeklyVol;
      price = Math.max(price * Math.exp(drift + shock), 0.5);
    }

    const open = price * (1 - weeklyVol * 0.3 * (rand() - 0.5));
    const high = Math.max(open, price) * (1 + weeklyVol * 0.4 * rand());
    const low = Math.min(open, price) * (1 - weeklyVol * 0.4 * rand());
    const volume = Math.round(50_000 + rand() * 2_000_000);

    points.push({ date, open, high, low, close: price, volume });
  }

  return points;
}

async function seedCompany(c: SeedCompany) {
  const marketCap = c.latestPrice * c.sharesOutstanding;
  const change = c.latestPrice - c.previousClose;
  const changePercent = (change / c.previousClose) * 100;

  const company = await db.company.upsert({
    where: { symbol: c.symbol },
    create: {
      symbol: c.symbol,
      name: c.name,
      sector: c.sector,
      description: c.description,
      listingDate: new Date(c.listingDate),
    },
    update: {
      name: c.name,
      sector: c.sector,
      description: c.description,
      listingDate: new Date(c.listingDate),
    },
  });

  await db.quote.upsert({
    where: { companyId: company.id },
    create: {
      companyId: company.id,
      price: c.latestPrice,
      previousClose: c.previousClose,
      change,
      changePercent,
      dayHigh: c.dayHigh,
      dayLow: c.dayLow,
      volume: c.volume,
      marketCap,
      asOf: SEED_AS_OF,
      source: SEED_SOURCE_LABEL,
      isPlaceholder: true,
    },
    update: {
      price: c.latestPrice,
      previousClose: c.previousClose,
      change,
      changePercent,
      dayHigh: c.dayHigh,
      dayLow: c.dayLow,
      volume: c.volume,
      marketCap,
      asOf: SEED_AS_OF,
      source: SEED_SOURCE_LABEL,
      isPlaceholder: true,
    },
  });

  for (const f of c.fundamentals) {
    // Derive P/E and P/B from the reported figures so Valuation has something
    // to show. Equity is back-solved from ROE = profit / equity.
    const peRatio = f.eps > 0 ? c.latestPrice / f.eps : null;
    const equity = f.roe !== 0 ? f.profit / (f.roe / 100) : null;
    const bookValuePerShare = equity && equity > 0 ? equity / c.sharesOutstanding : null;
    const pbRatio = bookValuePerShare && bookValuePerShare > 0 ? c.latestPrice / bookValuePerShare : null;
    const dividendYield = f.dividendPerShare > 0 ? (f.dividendPerShare / c.latestPrice) * 100 : 0;

    await db.fundamentals.upsert({
      where: { companyId_periodLabel: { companyId: company.id, periodLabel: f.periodLabel } },
      create: {
        companyId: company.id,
        periodLabel: f.periodLabel,
        periodType: "ANNUAL",
        fiscalYearEnd: new Date(f.fiscalYearEnd),
        revenue: f.revenue,
        profit: f.profit,
        operatingCashFlow: f.operatingCashFlow,
        totalDebt: f.totalDebt,
        eps: f.eps,
        dividendPerShare: f.dividendPerShare,
        dividendYield,
        roe: f.roe,
        peRatio,
        pbRatio,
        sharesOutstanding: c.sharesOutstanding,
        asOf: SEED_AS_OF,
        source: SEED_SOURCE_LABEL,
        isPlaceholder: true,
      },
      update: {
        revenue: f.revenue,
        profit: f.profit,
        operatingCashFlow: f.operatingCashFlow,
        totalDebt: f.totalDebt,
        eps: f.eps,
        dividendPerShare: f.dividendPerShare,
        dividendYield,
        roe: f.roe,
        peRatio,
        pbRatio,
        sharesOutstanding: c.sharesOutstanding,
        asOf: SEED_AS_OF,
        source: SEED_SOURCE_LABEL,
        isPlaceholder: true,
      },
    });

    if (f.dividendPerShare > 0) {
      const year = new Date(f.fiscalYearEnd).getFullYear();
      const exists = await db.dividendHistory.findFirst({
        where: { companyId: company.id, declaredYear: year, type: "FINAL" },
      });
      if (!exists) {
        await db.dividendHistory.create({
          data: {
            companyId: company.id,
            declaredYear: year,
            type: "FINAL",
            amount: f.dividendPerShare,
            paymentDate: new Date(f.fiscalYearEnd),
            source: SEED_SOURCE_LABEL,
            isPlaceholder: true,
          },
        });
      }
    }
  }

  const existingPriceRows = await db.priceHistory.count({ where: { companyId: company.id } });
  if (existingPriceRows === 0) {
    const points = generateWeeklyPriceHistory(
      c.symbol,
      c.fiveYearPriceStart,
      c.latestPrice,
      c.annualVolatility,
      5
    );
    await db.priceHistory.createMany({
      data: points.map((p) => ({
        companyId: company.id,
        date: p.date,
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
        volume: p.volume,
        source: SEED_SOURCE_LABEL,
        isPlaceholder: true,
      })),
    });
  }

  return company.symbol;
}

async function main() {
  console.log(`Seeding ${seedCompanies.length} companies (placeholder data)...`);
  for (const c of seedCompanies) {
    const symbol = await seedCompany(c);
    console.log(`  seeded ${symbol}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
