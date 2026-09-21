// EODHD (eodhd.com) adapter — priority #2. EODHD is a paid API but has solid
// historical price AND fundamentals coverage for the XNSA (Nigerian
// Exchange) segment, which makes it the best fit for Revenue/EPS/Debt/ROE —
// those rarely show up on free sources.
//
// STATUS: NOT ACTIVE by default. The endpoint/response mapping below follows
// EODHD's public docs (https://eodhd.com/financial-apis/), but:
//   - DO NOT enable this in production (DATA_PROVIDER=eodhd) until the user
//     has picked and paid for a plan — pricing/tier was intentionally left
//     for the user to confirm, per their instruction to see cost first.
//   - The exact field coverage for XNSA-listed tickers (does it have ALL 20
//     seed companies, and how current is it) should be spot-checked against
//     a couple of symbols once a key exists, before trusting it wholesale.
//
// Ticker format on EODHD is "{symbol}.XNSA", e.g. "DANGCEM.XNSA".

import type { DataProvider, FundamentalsPeriod, HistoricalRange, PricePoint, Quote } from "./types";

const EXCHANGE_SUFFIX = ".XNSA";

function rangeToFromDate(range: HistoricalRange): string {
  const d = new Date();
  switch (range) {
    case "1M":
      d.setMonth(d.getMonth() - 1);
      break;
    case "6M":
      d.setMonth(d.getMonth() - 6);
      break;
    case "1Y":
      d.setFullYear(d.getFullYear() - 1);
      break;
    case "5Y":
      d.setFullYear(d.getFullYear() - 5);
      break;
  }
  return d.toISOString().slice(0, 10);
}

export class EodhdProvider implements DataProvider {
  readonly name = "EODHD";
  private apiKey = process.env.EODHD_API_KEY;
  private baseUrl = "https://eodhd.com/api";

  private assertConfigured() {
    if (!this.apiKey) {
      throw new Error(
        "EODHD_API_KEY is not set. Sign up at https://eodhd.com, confirm the plan/cost with " +
          "the user, then set EODHD_API_KEY in .env before setting DATA_PROVIDER=eodhd."
      );
    }
  }

  async getQuote(symbol: string): Promise<Quote | null> {
    this.assertConfigured();
    const url = `${this.baseUrl}/real-time/${symbol}${EXCHANGE_SUFFIX}?api_token=${this.apiKey}&fmt=json`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`EODHD getQuote failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    const previousClose = Number(data.previousClose ?? data.close - data.change);
    return {
      symbol,
      price: Number(data.close),
      previousClose,
      change: Number(data.change),
      changePercent: Number(data.change_p),
      dayHigh: data.high != null ? Number(data.high) : undefined,
      dayLow: data.low != null ? Number(data.low) : undefined,
      volume: data.volume != null ? Number(data.volume) : undefined,
      asOf: new Date(Number(data.timestamp) * 1000),
      source: "EODHD",
      isPlaceholder: false,
    };
  }

  async getHistoricalPrices(symbol: string, range: HistoricalRange): Promise<PricePoint[]> {
    this.assertConfigured();
    const from = rangeToFromDate(range);
    const url = `${this.baseUrl}/eod/${symbol}${EXCHANGE_SUFFIX}?api_token=${this.apiKey}&fmt=json&period=d&from=${from}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`EODHD getHistoricalPrices failed: ${res.status} ${res.statusText}`);

    const rows: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }> =
      await res.json();

    return rows.map((r) => ({
      date: new Date(r.date),
      open: r.open,
      high: r.high,
      low: r.low,
      close: r.close,
      volume: r.volume,
    }));
  }

  async getFundamentals(symbol: string): Promise<FundamentalsPeriod[]> {
    this.assertConfigured();
    const url = `${this.baseUrl}/fundamentals/${symbol}${EXCHANGE_SUFFIX}?api_token=${this.apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`EODHD getFundamentals failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    const yearlyIncome = data?.Financials?.Income_Statement?.yearly ?? {};
    const yearlyCashFlow = data?.Financials?.Cash_Flow?.yearly ?? {};
    const yearlyBalance = data?.Financials?.Balance_Sheet?.yearly ?? {};
    const sharesOutstanding = data?.SharesStats?.SharesOutstanding ?? null;

    const dates = Object.keys(yearlyIncome).sort();

    return dates.map((date) => {
      const income = yearlyIncome[date] ?? {};
      const cashFlow = yearlyCashFlow[date] ?? {};
      const balance = yearlyBalance[date] ?? {};
      const revenue = income.totalRevenue != null ? Number(income.totalRevenue) : null;
      const profit = income.netIncome != null ? Number(income.netIncome) : null;
      const equity = balance.totalStockholderEquity != null ? Number(balance.totalStockholderEquity) : null;
      const eps = income.epsActual != null ? Number(income.epsActual) : null;

      return {
        periodLabel: `FY${new Date(date).getFullYear()}`,
        periodType: "ANNUAL",
        fiscalYearEnd: new Date(date),
        revenue,
        profit,
        operatingCashFlow: cashFlow.totalCashFromOperatingActivities != null ? Number(cashFlow.totalCashFromOperatingActivities) : null,
        totalDebt: balance.shortLongTermDebtTotal != null ? Number(balance.shortLongTermDebtTotal) : null,
        eps,
        dividendPerShare: null, // TODO: map from data.SplitsDividends once verified against a real account
        dividendYield: data?.Highlights?.DividendYield != null ? Number(data.Highlights.DividendYield) * 100 : null,
        roe: profit != null && equity ? (profit / equity) * 100 : null,
        peRatio: data?.Highlights?.PERatio != null ? Number(data.Highlights.PERatio) : null,
        pbRatio: data?.Highlights?.PriceBookMRQ != null ? Number(data.Highlights.PriceBookMRQ) : null,
        sharesOutstanding: sharesOutstanding != null ? Number(sharesOutstanding) : null,
        asOf: new Date(),
        source: "EODHD",
        isPlaceholder: false,
      };
    });
  }
}
