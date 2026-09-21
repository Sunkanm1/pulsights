// RapidAPI "NGXEQTY" adapter — priority #3, unofficial, useful for quick
// prototyping of live-ish quotes only. Not a fit for fundamentals.
//
// STATUS: NOT ACTIVE. This is an unofficial third-party API — the exact
// endpoint paths, headers and response shape need to be confirmed against
// the live RapidAPI listing (search "NGXEQTY" on rapidapi.com) once a key
// exists, since unofficial APIs like this can change or disappear without
// notice. Treat this as the least durable of the three real-data options;
// EODHD or the NGX API itself are safer long-term bets.

import type { DataProvider, FundamentalsPeriod, HistoricalRange, PricePoint, Quote } from "./types";

export class RapidApiNgxProvider implements DataProvider {
  readonly name = "RapidAPI (NGXEQTY, unofficial)";
  private apiKey = process.env.RAPIDAPI_KEY;
  private apiHost = process.env.RAPIDAPI_NGXEQTY_HOST ?? "ngxeqty.p.rapidapi.com";

  private assertConfigured() {
    if (!this.apiKey) {
      throw new Error(
        "RAPIDAPI_KEY is not set. Subscribe to the NGXEQTY API on rapidapi.com, confirm the " +
          "cost/quota with the user, then set RAPIDAPI_KEY (and RAPIDAPI_NGXEQTY_HOST if it " +
          "differs) in .env before setting DATA_PROVIDER=rapidapi."
      );
    }
  }

  async getQuote(_symbol: string): Promise<Quote | null> {
    this.assertConfigured();
    throw new Error(
      "RapidAPI NGXEQTY adapter is a stub: confirm the real endpoint path and response shape " +
        `against the live listing on rapidapi.com (host: ${this.apiHost}) before implementing.`
    );
  }

  async getFundamentals(_symbol: string): Promise<FundamentalsPeriod[]> {
    this.assertConfigured();
    throw new Error(
      "RapidAPI NGXEQTY is intended for quick quote prototyping only — it is not expected to " +
        "carry fundamentals (Revenue/EPS/Debt/ROE). Use EODHD for those instead."
    );
  }

  async getHistoricalPrices(_symbol: string, _range: HistoricalRange): Promise<PricePoint[]> {
    this.assertConfigured();
    throw new Error("RapidAPI NGXEQTY adapter is a stub: historical prices endpoint not yet confirmed.");
  }
}
