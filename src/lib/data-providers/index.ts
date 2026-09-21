// Provider selection: DATA_PROVIDER in .env picks which adapter backs the
// app. Defaults to the local seed data so the app runs before any API key
// exists. Only "seed" is safe to run without cost — the others require keys
// the user must set up (and, for paid ones, approve) first.

import type { DataProvider } from "./types";
import { SeedDataProvider } from "./seed-provider";
import { NgxMarketDataProvider } from "./ngx-provider";
import { EodhdProvider } from "./eodhd-provider";
import { RapidApiNgxProvider } from "./rapidapi-provider";

let cached: DataProvider | null = null;

export function getDataProvider(): DataProvider {
  if (cached) return cached;

  switch (process.env.DATA_PROVIDER?.toLowerCase()) {
    case "ngx":
      cached = new NgxMarketDataProvider();
      break;
    case "eodhd":
      cached = new EodhdProvider();
      break;
    case "rapidapi":
      cached = new RapidApiNgxProvider();
      break;
    case "seed":
    default:
      cached = new SeedDataProvider();
  }

  return cached;
}

export * from "./types";
