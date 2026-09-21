// The DataProvider contract every data source (seed, NGX API, EODHD,
// RapidAPI) implements identically, so the rest of the app never needs to
// know which one is active. Swap sources by changing DATA_PROVIDER in .env —
// no call site changes.

export type HistoricalRange = "1M" | "6M" | "1Y" | "5Y";

export interface Quote {
  symbol: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  dayHigh?: number;
  dayLow?: number;
  volume?: number;
  marketCap?: number;
  asOf: Date;
  source: string;
  isPlaceholder: boolean;
}

export interface FundamentalsPeriod {
  periodLabel: string;
  periodType: "ANNUAL" | "QUARTERLY";
  fiscalYearEnd: Date;
  revenue: number | null;
  profit: number | null;
  operatingCashFlow: number | null;
  totalDebt: number | null;
  eps: number | null;
  dividendPerShare: number | null;
  dividendYield: number | null;
  roe: number | null;
  peRatio: number | null;
  pbRatio: number | null;
  sharesOutstanding: number | null;
  asOf: Date;
  source: string;
  isPlaceholder: boolean;
}

export interface PricePoint {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface DataProvider {
  readonly name: string;
  getQuote(symbol: string): Promise<Quote | null>;
  getFundamentals(symbol: string): Promise<FundamentalsPeriod[]>;
  getHistoricalPrices(symbol: string, range: HistoricalRange): Promise<PricePoint[]>;
}
