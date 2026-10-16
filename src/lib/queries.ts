import { db } from "@/lib/db";
import type { PricePoint } from "@/lib/data-providers/types";

// Every read here comes straight from the DB, never from a live DataProvider
// call. Prices/fundamentals are written into the DB by the cron refresh jobs
// (src/lib/refresh.ts) on a schedule — pages must not call a third-party API
// on every request, per the "scheduled refresh, not live polling" brief.

export type CompanySummary = {
  symbol: string;
  name: string;
  sector: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  marketCap: number | null;
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
  latestPeriodLabel: string | null;
  asOf: Date | null;
  source: string | null;
  isPlaceholder: boolean;
};

export async function getCompanyList(): Promise<CompanySummary[]> {
  const companies = await db.company.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: {
      quotes: true,
      fundamentals: { orderBy: { fiscalYearEnd: "desc" }, take: 1 },
    },
  });

  return companies.map((company): CompanySummary => {
    const quote = company.quotes[0] ?? null;
    const latest = company.fundamentals[0] ?? null;

    return {
      symbol: company.symbol,
      name: company.name,
      sector: company.sector,
      price: quote?.price ?? null,
      change: quote?.change ?? null,
      changePercent: quote?.changePercent ?? null,
      marketCap: quote?.marketCap ?? null,
      revenue: latest?.revenue ?? null,
      profit: latest?.profit ?? null,
      operatingCashFlow: latest?.operatingCashFlow ?? null,
      totalDebt: latest?.totalDebt ?? null,
      eps: latest?.eps ?? null,
      dividendPerShare: latest?.dividendPerShare ?? null,
      dividendYield: latest?.dividendYield ?? null,
      roe: latest?.roe ?? null,
      peRatio: latest?.peRatio ?? null,
      pbRatio: latest?.pbRatio ?? null,
      latestPeriodLabel: latest?.periodLabel ?? null,
      asOf: quote?.asOf ?? latest?.asOf ?? null,
      source: quote?.source ?? latest?.source ?? null,
      isPlaceholder: quote?.isPlaceholder ?? latest?.isPlaceholder ?? true,
    };
  });
}

export type CompanyDetail = {
  symbol: string;
  name: string;
  sector: string;
  description: string;
  listingDate: Date | null;
  quote: {
    price: number;
    previousClose: number;
    change: number;
    changePercent: number;
    marketCap: number | null;
    asOf: Date;
    source: string;
    isPlaceholder: boolean;
  } | null;
  fundamentals: {
    periodLabel: string;
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
    asOf: Date;
    source: string;
    isPlaceholder: boolean;
  }[];
  priceHistory5Y: PricePoint[];
  dividendHistory: { year: number; type: string; amount: number }[];
};

export async function getCompanyDetail(symbol: string): Promise<CompanyDetail | null> {
  const company = await db.company.findUnique({
    where: { symbol },
    include: {
      quotes: true,
      fundamentals: { orderBy: { fiscalYearEnd: "asc" } },
      priceHistory: { orderBy: { date: "asc" } },
      dividendHistory: { orderBy: { declaredYear: "asc" } },
    },
  });
  if (!company) return null;

  const quote = company.quotes[0] ?? null;

  return {
    symbol: company.symbol,
    name: company.name,
    sector: company.sector,
    description: company.description,
    listingDate: company.listingDate,
    quote: quote
      ? {
          price: quote.price,
          previousClose: quote.previousClose,
          change: quote.change,
          changePercent: quote.changePercent,
          marketCap: quote.marketCap,
          asOf: quote.asOf,
          source: quote.source,
          isPlaceholder: quote.isPlaceholder,
        }
      : null,
    fundamentals: company.fundamentals.map((f) => ({
      periodLabel: f.periodLabel,
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
      asOf: f.asOf,
      source: f.source,
      isPlaceholder: f.isPlaceholder,
    })),
    priceHistory5Y: company.priceHistory.map((p) => ({
      date: p.date,
      open: p.open,
      high: p.high,
      low: p.low,
      close: p.close,
      volume: p.volume ?? undefined,
    })),
    dividendHistory: company.dividendHistory.map((d) => ({ year: d.declaredYear, type: d.type, amount: d.amount })),
  };
}

export async function getAllSectors(): Promise<string[]> {
  const companies = await db.company.findMany({ select: { sector: true }, distinct: ["sector"] });
  return companies.map((c) => c.sector).sort();
}

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string | null;
  featured: boolean;
  readMinutes: number;
  publishedAt: Date;
  isPlaceholder: boolean;
  company: { symbol: string; name: string } | null;
};

export type ArticleDetail = ArticleSummary & { content: string; source: string };

function toArticleSummary(a: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  authorName: string;
  authorRole: string | null;
  featured: boolean;
  readMinutes: number;
  publishedAt: Date;
  isPlaceholder: boolean;
  company: { symbol: string; name: string } | null;
}): ArticleSummary {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    tags: a.tags ? a.tags.split(",").filter(Boolean) : [],
    authorName: a.authorName,
    authorRole: a.authorRole,
    featured: a.featured,
    readMinutes: a.readMinutes,
    publishedAt: a.publishedAt,
    isPlaceholder: a.isPlaceholder,
    company: a.company,
  };
}

const articleListSelect = {
  slug: true,
  title: true,
  excerpt: true,
  category: true,
  tags: true,
  authorName: true,
  authorRole: true,
  featured: true,
  readMinutes: true,
  publishedAt: true,
  isPlaceholder: true,
  company: { select: { symbol: true, name: true } },
} as const;

export async function getArticles(options?: { category?: string; limit?: number }): Promise<ArticleSummary[]> {
  const articles = await db.article.findMany({
    where: options?.category ? { category: options.category as never } : undefined,
    orderBy: { publishedAt: "desc" },
    take: options?.limit,
    select: articleListSelect,
  });
  return articles.map(toArticleSummary);
}

export async function getFeaturedArticles(limit = 3): Promise<ArticleSummary[]> {
  const articles = await db.article.findMany({
    where: { featured: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: articleListSelect,
  });
  return articles.map(toArticleSummary);
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const a = await db.article.findUnique({
    where: { slug },
    select: { ...articleListSelect, content: true, source: true },
  });
  if (!a) return null;
  return { ...toArticleSummary(a), content: a.content, source: a.source };
}

export async function getArticlesByCompany(companySymbol: string, limit = 3): Promise<ArticleSummary[]> {
  const articles = await db.article.findMany({
    where: { company: { symbol: companySymbol } },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: articleListSelect,
  });
  return articles.map(toArticleSummary);
}

export async function getRelatedArticles(slug: string, companySymbol: string | null, limit = 3): Promise<ArticleSummary[]> {
  const articles = await db.article.findMany({
    where: {
      slug: { not: slug },
      ...(companySymbol ? { company: { symbol: companySymbol } } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: articleListSelect,
  });
  if (articles.length >= limit || companySymbol) return articles.map(toArticleSummary);

  // Fall back to latest articles overall if there weren't enough on-topic ones.
  const fallback = await db.article.findMany({
    where: { slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: articleListSelect,
  });
  return fallback.map(toArticleSummary);
}
