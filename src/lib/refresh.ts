// Called only by the cron routes (src/app/api/cron/*). This is the one
// place the active DataProvider gets called live — everything the UI reads
// comes from the DB rows this writes, never from a per-request API call.

import { db } from "@/lib/db";
import { getDataProvider } from "@/lib/data-providers";

export async function refreshPrices() {
  const provider = getDataProvider();
  const companies = await db.company.findMany({ where: { isActive: true } });

  const results: { symbol: string; ok: boolean; error?: string }[] = [];

  for (const company of companies) {
    try {
      const quote = await provider.getQuote(company.symbol);
      if (!quote) {
        results.push({ symbol: company.symbol, ok: false, error: "no quote returned" });
        continue;
      }

      await db.quote.upsert({
        where: { companyId: company.id },
        create: {
          companyId: company.id,
          price: quote.price,
          previousClose: quote.previousClose,
          change: quote.change,
          changePercent: quote.changePercent,
          dayHigh: quote.dayHigh,
          dayLow: quote.dayLow,
          volume: quote.volume,
          marketCap: quote.marketCap,
          asOf: quote.asOf,
          source: quote.source,
          isPlaceholder: quote.isPlaceholder,
        },
        update: {
          price: quote.price,
          previousClose: quote.previousClose,
          change: quote.change,
          changePercent: quote.changePercent,
          dayHigh: quote.dayHigh,
          dayLow: quote.dayLow,
          volume: quote.volume,
          marketCap: quote.marketCap,
          asOf: quote.asOf,
          source: quote.source,
          isPlaceholder: quote.isPlaceholder,
        },
      });

      results.push({ symbol: company.symbol, ok: true });
    } catch (err) {
      results.push({ symbol: company.symbol, ok: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return results;
}

export async function refreshFundamentals() {
  const provider = getDataProvider();
  const companies = await db.company.findMany({ where: { isActive: true } });

  const results: { symbol: string; ok: boolean; periods?: number; error?: string }[] = [];

  for (const company of companies) {
    try {
      const periods = await provider.getFundamentals(company.symbol);
      for (const f of periods) {
        await db.fundamentals.upsert({
          where: { companyId_periodLabel: { companyId: company.id, periodLabel: f.periodLabel } },
          create: {
            companyId: company.id,
            periodLabel: f.periodLabel,
            periodType: f.periodType,
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
          },
          update: {
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
          },
        });

        if (f.dividendPerShare && f.dividendPerShare > 0) {
          const year = f.fiscalYearEnd.getFullYear();
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
                paymentDate: f.fiscalYearEnd,
                source: f.source,
                isPlaceholder: f.isPlaceholder,
              },
            });
          }
        }
      }
      results.push({ symbol: company.symbol, ok: true, periods: periods.length });
    } catch (err) {
      results.push({ symbol: company.symbol, ok: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return results;
}
