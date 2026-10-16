const NAIRA = "₦";

export function formatCompactNaira(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= 1e12) return `${sign}${NAIRA}${(abs / 1e12).toFixed(2)}tn`;
  if (abs >= 1e9) return `${sign}${NAIRA}${(abs / 1e9).toFixed(2)}bn`;
  if (abs >= 1e6) return `${sign}${NAIRA}${(abs / 1e6).toFixed(2)}m`;
  if (abs >= 1e3) return `${sign}${NAIRA}${(abs / 1e3).toFixed(1)}k`;
  return `${sign}${NAIRA}${abs.toFixed(2)}`;
}

export function formatNaira(value: number | null | undefined, decimals = 2): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `${NAIRA}${value.toLocaleString("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatPercent(value: number | null | undefined, decimals = 2): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toLocaleString("en-NG");
}

export function formatRatio(value: number | null | undefined, decimals = 2, suffix = "x"): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value.toFixed(decimals)}${suffix}`;
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  });
}

export function formatRelativeDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(d);
}

export const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  MARKET_NEWS: "Market News",
  EARNINGS: "Earnings",
  DIVIDENDS: "Dividends",
  IPO_LISTINGS: "IPOs & Listings",
  ANALYSIS: "Analysis",
  MACRO: "Macro",
  COMPANY_NEWS: "Company News",
};

export const SECTOR_LABELS: Record<string, string> = {
  BANKING: "Banking",
  TELECOMMUNICATIONS: "Telecommunications",
  CONSUMER_GOODS: "Consumer Goods",
  INDUSTRIAL_GOODS: "Industrial Goods",
  OIL_GAS: "Oil & Gas",
  AGRICULTURE: "Agriculture",
  CONGLOMERATES: "Conglomerates",
  HEALTHCARE: "Healthcare",
  REAL_ESTATE: "Real Estate",
  FINANCIAL_SERVICES: "Financial Services",
};
