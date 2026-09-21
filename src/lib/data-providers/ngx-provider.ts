// NGX Market Data API adapter — https://marketdataapiv3.ngxgroup.com/portal
//
// STATUS: NOT ACTIVE. This is priority #1 in the adapter chain because it's
// the exchange's own data, but it is NOT wired up to a real endpoint yet:
//
//   1. Getting a key requires registering on the NGX portal. As of writing,
//      NGX does not publish a self-serve signup — the portal flow reads like
//      it expects an institutional/business relationship, which could mean
//      an approval process or business registration before a key is issued.
//      THAT COULD BLOCK real-time access entirely for an indie/MVP project —
//      confirm with NGX directly before assuming this tier is reachable.
//   2. Free vs. paid/real-time tiers, rate limits and the actual response
//      schema are behind that registration wall, so the request/response
//      shapes below are best-guess placeholders, not verified contracts.
//
// Do not flip DATA_PROVIDER=ngx in production until both of those are
// confirmed. Ask before paying for anything here — see EODHD/RapidAPI
// adapters for the other paid options and their known pricing.

import type { DataProvider, FundamentalsPeriod, HistoricalRange, PricePoint, Quote } from "./types";

export class NgxMarketDataProvider implements DataProvider {
  readonly name = "NGX Market Data API";
  private baseUrl = process.env.NGX_API_BASE_URL ?? "https://marketdataapiv3.ngxgroup.com/api";
  private apiKey = process.env.NGX_API_KEY;

  private assertConfigured(): asserts this is { apiKey: string } {
    if (!this.apiKey) {
      throw new Error(
        "NGX_API_KEY is not set. Register at https://marketdataapiv3.ngxgroup.com/portal " +
          "(this may require an approval process / business registration — verify before " +
          "relying on it) and set NGX_API_KEY + NGX_API_BASE_URL in .env."
      );
    }
  }

  async getQuote(_symbol: string): Promise<Quote | null> {
    this.assertConfigured();
    throw new Error(
      "NGX Market Data API adapter is a stub: the real endpoint/response shape has not " +
        "been confirmed against a registered account yet."
    );
  }

  async getFundamentals(_symbol: string): Promise<FundamentalsPeriod[]> {
    this.assertConfigured();
    throw new Error(
      "NGX Market Data API adapter is a stub, and it's unclear from public docs whether " +
        "this API even publishes fundamentals (revenue/EPS/debt/ROE) — verify on the portal. " +
        "EODHD is the more likely source for fundamentals."
    );
  }

  async getHistoricalPrices(_symbol: string, _range: HistoricalRange): Promise<PricePoint[]> {
    this.assertConfigured();
    throw new Error(
      "NGX Market Data API adapter is a stub: historical prices endpoint not yet confirmed."
    );
  }
}
