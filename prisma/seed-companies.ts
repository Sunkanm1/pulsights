// Placeholder company + fundamentals data for the initial 20 NGX-listed companies.
//
// IMPORTANT: The financial figures here (revenue, profit, EPS, price, etc.) are
// hand-authored PLACEHOLDER numbers, not sourced from any filing or live feed.
// They exist only so the UI has something realistic-shaped to render before a
// real DataProvider is wired up (see src/lib/data-providers). Every row seeded
// from this file is flagged `isPlaceholder: true` and stamped with an `asOf`
// date + `source: "Seed data (placeholder)"` so the UI can be honest about it.
// Adding a new company later only requires adding one entry to this array.

import type { Sector } from "../src/generated/prisma/enums";

export type SeedFundamentals = {
  periodLabel: string; // e.g. "FY2024"
  fiscalYearEnd: string; // ISO date
  revenue: number; // NGN
  profit: number; // NGN
  operatingCashFlow: number; // NGN
  totalDebt: number; // NGN
  eps: number; // NGN per share
  dividendPerShare: number; // NGN per share, total for the year
  roe: number; // percent, e.g. 24.5
};

export type SeedCompany = {
  symbol: string;
  name: string;
  sector: Sector;
  description: string;
  listingDate: string; // ISO date
  sharesOutstanding: number; // count of shares
  latestPrice: number; // NGN
  previousClose: number; // NGN
  dayHigh: number;
  dayLow: number;
  volume: number;
  fiveYearPriceStart: number; // seed value for synthetic 5y price history
  annualVolatility: number; // 0-1, used to shape the synthetic random walk
  fundamentals: SeedFundamentals[]; // most recent last
};

export const seedCompanies: SeedCompany[] = [
  {
    symbol: "DANGCEM",
    name: "Dangote Cement Plc",
    sector: "INDUSTRIAL_GOODS",
    description:
      "Africa's largest cement producer, manufacturing and distributing cement across Nigeria and several other African countries from plants including Obajana and Ibese.",
    listingDate: "2010-10-26",
    sharesOutstanding: 17_040_000_000,
    latestPrice: 420.0,
    previousClose: 411.5,
    dayHigh: 424.0,
    dayLow: 408.0,
    volume: 2_150_000,
    fiveYearPriceStart: 245.0,
    annualVolatility: 0.28,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 1_034_000_000_000, profit: 236_000_000_000, operatingCashFlow: 331_000_000_000, totalDebt: 383_000_000_000, eps: 13.85, dividendPerShare: 16.0, roe: 33.2 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 1_617_000_000_000, profit: 219_000_000_000, operatingCashFlow: 398_000_000_000, totalDebt: 731_000_000_000, eps: 12.85, dividendPerShare: 16.0, roe: 29.4 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 2_212_000_000_000, profit: 208_000_000_000, operatingCashFlow: 512_000_000_000, totalDebt: 1_102_000_000_000, eps: 12.19, dividendPerShare: 20.0, roe: 27.1 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 2_580_000_000_000, profit: 291_000_000_000, operatingCashFlow: 601_000_000_000, totalDebt: 1_014_000_000_000, eps: 17.08, dividendPerShare: 20.0, roe: 31.6 },
    ],
  },
  {
    symbol: "MTNN",
    name: "MTN Nigeria Communications Plc",
    sector: "TELECOMMUNICATIONS",
    description:
      "Nigeria's largest mobile network operator, providing voice, data, fintech and digital services to subscribers across the country.",
    listingDate: "2019-05-16",
    sharesOutstanding: 20_354_000_000,
    latestPrice: 248.5,
    previousClose: 251.0,
    dayHigh: 253.0,
    dayLow: 246.0,
    volume: 5_320_000,
    fiveYearPriceStart: 155.0,
    annualVolatility: 0.32,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 1_654_000_000_000, profit: 205_000_000_000, operatingCashFlow: 703_000_000_000, totalDebt: 542_000_000_000, eps: 10.47, dividendPerShare: 9.0, roe: 68.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 2_012_000_000_000, profit: 348_000_000_000, operatingCashFlow: 822_000_000_000, totalDebt: 617_000_000_000, eps: 17.10, dividendPerShare: 14.85, roe: 92.1 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 2_465_000_000_000, profit: -137_000_000_000, operatingCashFlow: 855_000_000_000, totalDebt: 1_190_000_000_000, eps: -6.75, dividendPerShare: 6.6, roe: -45.3 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 3_366_000_000_000, profit: 220_000_000_000, operatingCashFlow: 1_040_000_000_000, totalDebt: 1_356_000_000_000, eps: 10.81, dividendPerShare: 8.5, roe: 61.8 },
    ],
  },
  {
    symbol: "AIRTELAFRI",
    name: "Airtel Africa Plc",
    sector: "TELECOMMUNICATIONS",
    description:
      "Pan-African telecommunications and mobile money group operating across 14 countries, with Nigeria among its largest markets; dual-listed on NGX and LSE.",
    listingDate: "2019-07-09",
    sharesOutstanding: 3_758_000_000,
    latestPrice: 2_450.0,
    previousClose: 2_398.0,
    dayHigh: 2_470.0,
    dayLow: 2_380.0,
    volume: 310_000,
    fiveYearPriceStart: 980.0,
    annualVolatility: 0.35,
    fundamentals: [
      { periodLabel: "FY2022", fiscalYearEnd: "2022-03-31", revenue: 4_460_000_000_000, profit: 726_000_000_000, operatingCashFlow: 1_690_000_000_000, totalDebt: 2_010_000_000_000, eps: 19.15, dividendPerShare: 4.9, roe: 38.7 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-03-31", revenue: 5_120_000_000_000, profit: 340_000_000_000, operatingCashFlow: 1_880_000_000_000, totalDebt: 2_640_000_000_000, eps: 8.90, dividendPerShare: 5.4, roe: 21.2 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-03-31", revenue: 5_980_000_000_000, profit: -735_000_000_000, operatingCashFlow: 2_010_000_000_000, totalDebt: 3_120_000_000_000, eps: -19.30, dividendPerShare: 5.6, roe: -34.5 },
    ],
  },
  {
    symbol: "BUAFOODS",
    name: "BUA Foods Plc",
    sector: "CONSUMER_GOODS",
    description:
      "Diversified food manufacturer producing sugar, flour, pasta and edible oils under brands including BUA Sugar and BUA Pasta.",
    listingDate: "2022-01-05",
    sharesOutstanding: 18_000_000_000,
    latestPrice: 385.0,
    previousClose: 379.0,
    dayHigh: 390.0,
    dayLow: 375.0,
    volume: 1_120_000,
    fiveYearPriceStart: 40.0,
    annualVolatility: 0.4,
    fundamentals: [
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 421_000_000_000, profit: 82_000_000_000, operatingCashFlow: 61_000_000_000, totalDebt: 128_000_000_000, eps: 4.56, dividendPerShare: 1.5, roe: 24.9 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 758_000_000_000, profit: 202_000_000_000, operatingCashFlow: 110_000_000_000, totalDebt: 210_000_000_000, eps: 11.22, dividendPerShare: 3.0, roe: 38.4 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 971_000_000_000, profit: 236_000_000_000, operatingCashFlow: 175_000_000_000, totalDebt: 265_000_000_000, eps: 13.11, dividendPerShare: 4.0, roe: 33.7 },
    ],
  },
  {
    symbol: "BUACEMENT",
    name: "BUA Cement Plc",
    sector: "INDUSTRIAL_GOODS",
    description:
      "Second-largest cement producer in Nigeria, operating plants in Sokoto, Edo and Adamawa states.",
    listingDate: "2020-01-09",
    sharesOutstanding: 16_970_000_000,
    latestPrice: 118.5,
    previousClose: 120.0,
    dayHigh: 121.0,
    dayLow: 116.0,
    volume: 1_890_000,
    fiveYearPriceStart: 68.0,
    annualVolatility: 0.3,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 236_000_000_000, profit: 63_000_000_000, operatingCashFlow: 88_000_000_000, totalDebt: 74_000_000_000, eps: 1.85, dividendPerShare: 1.10, roe: 21.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 273_000_000_000, profit: 68_000_000_000, operatingCashFlow: 95_000_000_000, totalDebt: 91_000_000_000, eps: 2.01, dividendPerShare: 1.10, roe: 19.8 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 310_000_000_000, profit: 40_000_000_000, operatingCashFlow: 82_000_000_000, totalDebt: 165_000_000_000, eps: 1.18, dividendPerShare: 0.60, roe: 10.9 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 386_000_000_000, profit: 58_000_000_000, operatingCashFlow: 121_000_000_000, totalDebt: 189_000_000_000, eps: 1.71, dividendPerShare: 0.85, roe: 14.6 },
    ],
  },
  {
    symbol: "GTCO",
    name: "Guaranty Trust Holding Company Plc",
    sector: "BANKING",
    description:
      "Financial holding company for Guaranty Trust Bank and non-bank subsidiaries spanning pension, asset management and payments across Africa and the UK.",
    listingDate: "2021-06-24",
    sharesOutstanding: 29_431_000_000,
    latestPrice: 68.0,
    previousClose: 66.5,
    dayHigh: 69.0,
    dayLow: 65.9,
    volume: 8_450_000,
    fiveYearPriceStart: 27.0,
    annualVolatility: 0.26,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 333_000_000_000, profit: 154_000_000_000, operatingCashFlow: 245_000_000_000, totalDebt: 210_000_000_000, eps: 5.23, dividendPerShare: 2.80, roe: 25.1 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 397_000_000_000, profit: 170_000_000_000, operatingCashFlow: 289_000_000_000, totalDebt: 245_000_000_000, eps: 5.78, dividendPerShare: 3.00, roe: 24.3 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 887_000_000_000, profit: 609_000_000_000, operatingCashFlow: 512_000_000_000, totalDebt: 410_000_000_000, eps: 20.71, dividendPerShare: 3.35, roe: 51.4 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 1_408_000_000_000, profit: 640_000_000_000, operatingCashFlow: 601_000_000_000, totalDebt: 470_000_000_000, eps: 21.75, dividendPerShare: 7.03, roe: 39.8 },
    ],
  },
  {
    symbol: "ZENITHBANK",
    name: "Zenith Bank Plc",
    sector: "BANKING",
    description:
      "One of Nigeria's largest banks by assets, offering retail, corporate and investment banking across Nigeria and several African and international markets.",
    listingDate: "2004-10-21",
    sharesOutstanding: 39_573_000_000,
    latestPrice: 52.3,
    previousClose: 51.0,
    dayHigh: 53.0,
    dayLow: 50.8,
    volume: 12_300_000,
    fiveYearPriceStart: 22.0,
    annualVolatility: 0.27,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 587_000_000_000, profit: 205_000_000_000, operatingCashFlow: 610_000_000_000, totalDebt: 890_000_000_000, eps: 6.54, dividendPerShare: 3.00, roe: 22.6 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 765_000_000_000, profit: 223_000_000_000, operatingCashFlow: 701_000_000_000, totalDebt: 1_010_000_000_000, eps: 7.10, dividendPerShare: 3.10, roe: 21.9 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 1_331_000_000_000, profit: 676_000_000_000, operatingCashFlow: 980_000_000_000, totalDebt: 1_540_000_000_000, eps: 21.55, dividendPerShare: 4.00, roe: 33.4 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 2_980_000_000_000, profit: 1_030_000_000_000, operatingCashFlow: 1_320_000_000_000, totalDebt: 1_780_000_000_000, eps: 26.05, dividendPerShare: 5.00, roe: 34.2 },
    ],
  },
  {
    symbol: "ACCESSCORP",
    name: "Access Holdings Plc",
    sector: "BANKING",
    description:
      "Financial holding company for Access Bank, one of Africa's largest banks by customer base, with operations spanning Africa, the UK and Asia.",
    listingDate: "1998-01-21",
    sharesOutstanding: 53_063_000_000,
    latestPrice: 24.8,
    previousClose: 24.1,
    dayHigh: 25.2,
    dayLow: 23.9,
    volume: 15_600_000,
    fiveYearPriceStart: 8.5,
    annualVolatility: 0.3,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 764_000_000_000, profit: 137_000_000_000, operatingCashFlow: 402_000_000_000, totalDebt: 1_320_000_000_000, eps: 3.49, dividendPerShare: 1.30, roe: 18.5 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 945_000_000_000, profit: 167_000_000_000, operatingCashFlow: 455_000_000_000, totalDebt: 1_580_000_000_000, eps: 3.90, dividendPerShare: 1.30, roe: 17.9 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 1_795_000_000_000, profit: 231_000_000_000, operatingCashFlow: 610_000_000_000, totalDebt: 2_450_000_000_000, eps: 5.35, dividendPerShare: 1.30, roe: 16.2 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 3_460_000_000_000, profit: 306_000_000_000, operatingCashFlow: 780_000_000_000, totalDebt: 2_990_000_000_000, eps: 5.66, dividendPerShare: 2.10, roe: 15.1 },
    ],
  },
  {
    symbol: "UBA",
    name: "United Bank for Africa Plc",
    sector: "BANKING",
    description:
      "Pan-African bank with operations in 20 African countries plus the UK, US and France, offering retail and corporate banking services.",
    listingDate: "1970-01-01",
    sharesOutstanding: 35_895_000_000,
    latestPrice: 33.5,
    previousClose: 32.9,
    dayHigh: 34.0,
    dayLow: 32.5,
    volume: 9_870_000,
    fiveYearPriceStart: 7.8,
    annualVolatility: 0.29,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 528_000_000_000, profit: 113_000_000_000, operatingCashFlow: 340_000_000_000, totalDebt: 1_010_000_000_000, eps: 3.15, dividendPerShare: 0.85, roe: 15.2 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 671_000_000_000, profit: 170_000_000_000, operatingCashFlow: 401_000_000_000, totalDebt: 1_240_000_000_000, eps: 4.73, dividendPerShare: 1.00, roe: 18.6 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 1_309_000_000_000, profit: 403_000_000_000, operatingCashFlow: 590_000_000_000, totalDebt: 1_980_000_000_000, eps: 11.26, dividendPerShare: 2.00, roe: 26.4 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 2_490_000_000_000, profit: 803_000_000_000, operatingCashFlow: 950_000_000_000, totalDebt: 2_410_000_000_000, eps: 22.38, dividendPerShare: 3.10, roe: 31.5 },
    ],
  },
  {
    symbol: "FBNH",
    name: "FBN Holdings Plc",
    sector: "BANKING",
    description:
      "Financial holding company for First Bank of Nigeria, one of the country's oldest banks, along with merchant banking and insurance subsidiaries.",
    listingDate: "2012-11-26",
    sharesOutstanding: 41_282_000_000,
    latestPrice: 28.9,
    previousClose: 28.2,
    dayHigh: 29.5,
    dayLow: 27.8,
    volume: 11_200_000,
    fiveYearPriceStart: 6.9,
    annualVolatility: 0.34,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 550_000_000_000, profit: 55_000_000_000, operatingCashFlow: 210_000_000_000, totalDebt: 980_000_000_000, eps: 1.53, dividendPerShare: 0.15, roe: 6.9 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 719_000_000_000, profit: 121_000_000_000, operatingCashFlow: 340_000_000_000, totalDebt: 1_120_000_000_000, eps: 3.36, dividendPerShare: 0.45, roe: 13.4 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 1_274_000_000_000, profit: 350_000_000_000, operatingCashFlow: 480_000_000_000, totalDebt: 1_650_000_000_000, eps: 9.71, dividendPerShare: 0.15, roe: 27.8 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 2_320_000_000_000, profit: 274_000_000_000, operatingCashFlow: 610_000_000_000, totalDebt: 2_010_000_000_000, eps: 6.64, dividendPerShare: 0.60, roe: 17.2 },
    ],
  },
  {
    symbol: "STANBIC",
    name: "Stanbic IBTC Holdings Plc",
    sector: "BANKING",
    description:
      "Financial services group offering corporate and investment banking, wealth management, pensions and asset management; part of the Standard Bank Group.",
    listingDate: "2012-08-08",
    sharesOutstanding: 12_774_000_000,
    latestPrice: 78.5,
    previousClose: 77.0,
    dayHigh: 79.9,
    dayLow: 76.5,
    volume: 1_450_000,
    fiveYearPriceStart: 38.0,
    annualVolatility: 0.25,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 234_000_000_000, profit: 62_000_000_000, operatingCashFlow: 95_000_000_000, totalDebt: 310_000_000_000, eps: 4.86, dividendPerShare: 2.00, roe: 19.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 271_000_000_000, profit: 84_000_000_000, operatingCashFlow: 121_000_000_000, totalDebt: 355_000_000_000, eps: 6.58, dividendPerShare: 2.00, roe: 23.1 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 396_000_000_000, profit: 116_000_000_000, operatingCashFlow: 180_000_000_000, totalDebt: 480_000_000_000, eps: 9.08, dividendPerShare: 4.60, roe: 26.9 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 612_000_000_000, profit: 165_000_000_000, operatingCashFlow: 240_000_000_000, totalDebt: 590_000_000_000, eps: 12.92, dividendPerShare: 5.05, roe: 27.6 },
    ],
  },
  {
    symbol: "SEPLAT",
    name: "Seplat Energy Plc",
    sector: "OIL_GAS",
    description:
      "Independent Nigerian oil and gas exploration and production company with onshore and shallow-water assets in the Niger Delta; dual-listed on NGX and LSE.",
    listingDate: "2014-04-14",
    sharesOutstanding: 588_000_000,
    latestPrice: 5_650.0,
    previousClose: 5_580.0,
    dayHigh: 5_700.0,
    dayLow: 5_500.0,
    volume: 185_000,
    fiveYearPriceStart: 480.0,
    annualVolatility: 0.38,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 264_000_000_000, profit: 30_000_000_000, operatingCashFlow: 88_000_000_000, totalDebt: 210_000_000_000, eps: 50.8, dividendPerShare: 30.0, roe: 8.9 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 391_000_000_000, profit: 108_000_000_000, operatingCashFlow: 150_000_000_000, totalDebt: 260_000_000_000, eps: 183.7, dividendPerShare: 75.0, roe: 27.3 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 566_000_000_000, profit: 129_000_000_000, operatingCashFlow: 210_000_000_000, totalDebt: 410_000_000_000, eps: 219.6, dividendPerShare: 90.0, roe: 24.8 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 1_540_000_000_000, profit: 210_000_000_000, operatingCashFlow: 480_000_000_000, totalDebt: 980_000_000_000, eps: 357.1, dividendPerShare: 150.0, roe: 22.4 },
    ],
  },
  {
    symbol: "NESTLE",
    name: "Nestle Nigeria Plc",
    sector: "CONSUMER_GOODS",
    description:
      "Manufacturer and marketer of food and beverage brands in Nigeria including Maggi, Milo, Nescafe and Golden Morn.",
    listingDate: "1979-01-01",
    sharesOutstanding: 1_479_000_000,
    latestPrice: 1_120.0,
    previousClose: 1_140.0,
    dayHigh: 1_150.0,
    dayLow: 1_100.0,
    volume: 95_000,
    fiveYearPriceStart: 1_450.0,
    annualVolatility: 0.33,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 304_000_000_000, profit: 39_000_000_000, operatingCashFlow: 45_000_000_000, totalDebt: 89_000_000_000, eps: 26.35, dividendPerShare: 25.0, roe: 71.2 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 366_000_000_000, profit: 33_000_000_000, operatingCashFlow: 38_000_000_000, totalDebt: 140_000_000_000, eps: 22.31, dividendPerShare: 20.0, roe: 58.6 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 490_000_000_000, profit: -60_000_000_000, operatingCashFlow: 20_000_000_000, totalDebt: 320_000_000_000, eps: -40.58, dividendPerShare: 0, roe: -85.4 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 730_000_000_000, profit: 45_000_000_000, operatingCashFlow: 95_000_000_000, totalDebt: 290_000_000_000, eps: 30.43, dividendPerShare: 15.0, roe: 40.1 },
    ],
  },
  {
    symbol: "NB",
    name: "Nigerian Breweries Plc",
    sector: "CONSUMER_GOODS",
    description:
      "Nigeria's largest brewing company, producing beer, malt and non-alcoholic beverages including Star, Gulder and Maltina.",
    listingDate: "1973-01-01",
    sharesOutstanding: 8_020_000_000,
    latestPrice: 42.0,
    previousClose: 41.0,
    dayHigh: 43.0,
    dayLow: 40.5,
    volume: 2_780_000,
    fiveYearPriceStart: 43.0,
    annualVolatility: 0.3,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 337_000_000_000, profit: 8_000_000_000, operatingCashFlow: 45_000_000_000, totalDebt: 120_000_000_000, eps: 1.00, dividendPerShare: 0, roe: 5.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 462_000_000_000, profit: 3_000_000_000, operatingCashFlow: 38_000_000_000, totalDebt: 210_000_000_000, eps: 0.37, dividendPerShare: 0, roe: 2.1 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 611_000_000_000, profit: -106_000_000_000, operatingCashFlow: 20_000_000_000, totalDebt: 460_000_000_000, eps: -13.22, dividendPerShare: 0, roe: -68.3 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 876_000_000_000, profit: 18_000_000_000, operatingCashFlow: 88_000_000_000, totalDebt: 380_000_000_000, eps: 2.24, dividendPerShare: 1.0, roe: 12.9 },
    ],
  },
  {
    symbol: "TRANSCORP",
    name: "Transnational Corporation Plc",
    sector: "CONGLOMERATES",
    description:
      "Diversified conglomerate with interests in power generation (Transcorp Power), hospitality (Transcorp Hotels) and oil & gas.",
    listingDate: "2006-08-15",
    sharesOutstanding: 7_874_000_000,
    latestPrice: 48.0,
    previousClose: 46.5,
    dayHigh: 49.0,
    dayLow: 45.8,
    volume: 6_450_000,
    fiveYearPriceStart: 1.2,
    annualVolatility: 0.5,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 78_000_000_000, profit: 6_000_000_000, operatingCashFlow: 20_000_000_000, totalDebt: 55_000_000_000, eps: 0.14, dividendPerShare: 0.02, roe: 4.8 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 106_000_000_000, profit: 12_000_000_000, operatingCashFlow: 28_000_000_000, totalDebt: 70_000_000_000, eps: 0.20, dividendPerShare: 0.02, roe: 8.1 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 165_000_000_000, profit: 34_000_000_000, operatingCashFlow: 55_000_000_000, totalDebt: 95_000_000_000, eps: 0.44, dividendPerShare: 0.03, roe: 15.3 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 289_000_000_000, profit: 92_000_000_000, operatingCashFlow: 118_000_000_000, totalDebt: 130_000_000_000, eps: 1.17, dividendPerShare: 0.05, roe: 24.7 },
    ],
  },
  {
    symbol: "OANDO",
    name: "Oando Plc",
    sector: "OIL_GAS",
    description:
      "Integrated energy group with upstream exploration & production, and energy trading operations across Nigeria and the wider region.",
    listingDate: "1992-01-01",
    sharesOutstanding: 12_071_000_000,
    latestPrice: 62.0,
    previousClose: 59.5,
    dayHigh: 63.5,
    dayLow: 58.9,
    volume: 4_120_000,
    fiveYearPriceStart: 3.1,
    annualVolatility: 0.55,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 337_000_000_000, profit: -12_000_000_000, operatingCashFlow: 18_000_000_000, totalDebt: 210_000_000_000, eps: -1.15, dividendPerShare: 0, roe: -18.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 674_000_000_000, profit: 21_000_000_000, operatingCashFlow: 40_000_000_000, totalDebt: 260_000_000_000, eps: 1.74, dividendPerShare: 0, roe: 19.2 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 1_210_000_000_000, profit: 25_000_000_000, operatingCashFlow: 65_000_000_000, totalDebt: 410_000_000_000, eps: 2.07, dividendPerShare: 0, roe: 14.6 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 5_460_000_000_000, profit: 137_000_000_000, operatingCashFlow: 210_000_000_000, totalDebt: 980_000_000_000, eps: 11.35, dividendPerShare: 0, roe: 28.9 },
    ],
  },
  {
    symbol: "PRESCO",
    name: "Presco Plc",
    sector: "AGRICULTURE",
    description:
      "Vertically integrated palm oil producer and processor operating plantations and mills in Edo and Delta states.",
    listingDate: "2002-01-01",
    sharesOutstanding: 3_400_000_000,
    latestPrice: 720.0,
    previousClose: 705.0,
    dayHigh: 730.0,
    dayLow: 700.0,
    volume: 220_000,
    fiveYearPriceStart: 55.0,
    annualVolatility: 0.34,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 45_000_000_000, profit: 17_000_000_000, operatingCashFlow: 15_000_000_000, totalDebt: 12_000_000_000, eps: 5.00, dividendPerShare: 3.50, roe: 33.6 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 81_000_000_000, profit: 34_000_000_000, operatingCashFlow: 28_000_000_000, totalDebt: 18_000_000_000, eps: 10.00, dividendPerShare: 6.50, roe: 45.2 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 135_000_000_000, profit: 76_000_000_000, operatingCashFlow: 52_000_000_000, totalDebt: 22_000_000_000, eps: 22.35, dividendPerShare: 15.0, roe: 58.7 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 198_000_000_000, profit: 88_000_000_000, operatingCashFlow: 71_000_000_000, totalDebt: 26_000_000_000, eps: 25.88, dividendPerShare: 18.0, roe: 47.3 },
    ],
  },
  {
    symbol: "OKOMUOIL",
    name: "The Okomu Oil Palm Company Plc",
    sector: "AGRICULTURE",
    description:
      "Palm oil and rubber producer operating plantations in Edo State, one of Nigeria's oldest agro-industrial companies.",
    listingDate: "1990-01-01",
    sharesOutstanding: 954_000_000,
    latestPrice: 590.0,
    previousClose: 578.0,
    dayHigh: 598.0,
    dayLow: 572.0,
    volume: 180_000,
    fiveYearPriceStart: 75.0,
    annualVolatility: 0.32,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 30_000_000_000, profit: 12_000_000_000, operatingCashFlow: 11_000_000_000, totalDebt: 6_000_000_000, eps: 12.58, dividendPerShare: 4.50, roe: 31.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 44_000_000_000, profit: 20_000_000_000, operatingCashFlow: 17_000_000_000, totalDebt: 8_000_000_000, eps: 20.97, dividendPerShare: 7.00, roe: 40.5 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 74_000_000_000, profit: 40_000_000_000, operatingCashFlow: 33_000_000_000, totalDebt: 9_000_000_000, eps: 41.93, dividendPerShare: 15.0, roe: 47.9 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 108_000_000_000, profit: 46_000_000_000, operatingCashFlow: 40_000_000_000, totalDebt: 11_000_000_000, eps: 48.22, dividendPerShare: 17.0, roe: 40.6 },
    ],
  },
  {
    symbol: "FIDELITYBK",
    name: "Fidelity Bank Plc",
    sector: "BANKING",
    description:
      "Mid-tier Nigerian commercial bank focused on retail and SME banking, with a growing digital banking footprint.",
    listingDate: "2005-05-13",
    sharesOutstanding: 41_995_000_000,
    latestPrice: 15.8,
    previousClose: 15.4,
    dayHigh: 16.1,
    dayLow: 15.2,
    volume: 22_400_000,
    fiveYearPriceStart: 2.1,
    annualVolatility: 0.36,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-12-31", revenue: 174_000_000_000, profit: 27_000_000_000, operatingCashFlow: 90_000_000_000, totalDebt: 340_000_000_000, eps: 0.93, dividendPerShare: 0.25, roe: 12.4 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-12-31", revenue: 216_000_000_000, profit: 40_000_000_000, operatingCashFlow: 130_000_000_000, totalDebt: 410_000_000_000, eps: 1.38, dividendPerShare: 0.35, roe: 15.9 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-12-31", revenue: 385_000_000_000, profit: 99_000_000_000, operatingCashFlow: 210_000_000_000, totalDebt: 610_000_000_000, eps: 3.05, dividendPerShare: 0.50, roe: 25.6 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-12-31", revenue: 731_000_000_000, profit: 105_000_000_000, operatingCashFlow: 280_000_000_000, totalDebt: 890_000_000_000, eps: 2.50, dividendPerShare: 0.85, roe: 18.7 },
    ],
  },
  {
    symbol: "GUINNESS",
    name: "Guinness Nigeria Plc",
    sector: "CONSUMER_GOODS",
    description:
      "Brewer and marketer of beer, malt and spirits brands including Guinness Stout, Malta Guinness and Orijin; part of the Diageo group.",
    listingDate: "1965-01-01",
    sharesOutstanding: 2_487_000_000,
    latestPrice: 68.0,
    previousClose: 66.0,
    dayHigh: 69.5,
    dayLow: 65.0,
    volume: 980_000,
    fiveYearPriceStart: 22.0,
    annualVolatility: 0.4,
    fundamentals: [
      { periodLabel: "FY2021", fiscalYearEnd: "2021-06-30", revenue: 115_000_000_000, profit: -2_000_000_000, operatingCashFlow: 8_000_000_000, totalDebt: 65_000_000_000, eps: -0.80, dividendPerShare: 0, roe: -3.9 },
      { periodLabel: "FY2022", fiscalYearEnd: "2022-06-30", revenue: 138_000_000_000, profit: 3_000_000_000, operatingCashFlow: 12_000_000_000, totalDebt: 88_000_000_000, eps: 1.21, dividendPerShare: 0, roe: 5.8 },
      { periodLabel: "FY2023", fiscalYearEnd: "2023-06-30", revenue: 202_000_000_000, profit: -22_000_000_000, operatingCashFlow: 5_000_000_000, totalDebt: 190_000_000_000, eps: -8.84, dividendPerShare: 0, roe: -34.1 },
      { periodLabel: "FY2024", fiscalYearEnd: "2024-06-30", revenue: 296_000_000_000, profit: 9_000_000_000, operatingCashFlow: 28_000_000_000, totalDebt: 165_000_000_000, eps: 3.62, dividendPerShare: 1.50, roe: 14.2 },
    ],
  },
];
