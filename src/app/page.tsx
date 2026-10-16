import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getArticles, getCompanyList, getFeaturedArticles } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import { MarketTicker } from "@/components/MarketTicker";
import { ARTICLE_CATEGORY_LABELS, formatCompactNaira, formatPercent } from "@/lib/format";

export const revalidate = 0;

export default async function HomePage() {
  const [companies, featured, latest] = await Promise.all([
    getCompanyList(),
    getFeaturedArticles(3),
    getArticles({ limit: 6 }),
  ]);

  const withQuotes = companies.filter((c) => c.changePercent != null && c.price != null);
  const avgChangePercent =
    withQuotes.length > 0
      ? withQuotes.reduce((sum, c) => sum + (c.changePercent ?? 0), 0) / withQuotes.length
      : 0;
  const totalMarketCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);
  const advancing = withQuotes.filter((c) => (c.changePercent ?? 0) > 0).length;
  const declining = withQuotes.filter((c) => (c.changePercent ?? 0) < 0).length;
  const movers = [...withQuotes].sort((a, b) => Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0)).slice(0, 5);

  const [heroArticle, ...restFeatured] = featured;
  const latestForGrid = heroArticle ? latest.filter((a) => a.slug !== heroArticle.slug).slice(0, 6) : latest;

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">NGX news &amp; market data</p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            The pulse of the Nigerian Exchange.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Market wraps, earnings commentary and explainers, alongside live-tracked financials for {companies.length}{" "}
            NGX-listed companies — revenue, profit, dividends, valuation and price history in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-strong"
            >
              Read the news
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/markets"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:border-border-strong"
            >
              Explore markets
            </Link>
          </div>
        </div>
      </section>

      <MarketTicker companies={companies} />

      {heroArticle && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <ArticleCard article={heroArticle} size="large" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {restFeatured.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-ink">Latest</h2>
          <Link href="/news" className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline">
            View all news
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestForGrid.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {Object.entries(ARTICLE_CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              href={`/news?category=${key}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-accent hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-ink">Markets at a glance</h2>
            <Link href="/markets" className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline">
              Full market overview
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tracked-20 composite</p>
              <p
                className={`mt-1.5 font-mono text-xl font-semibold tabular-nums ${
                  avgChangePercent > 0 ? "text-positive" : avgChangePercent < 0 ? "text-negative" : "text-ink"
                }`}
              >
                {formatPercent(avgChangePercent)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Combined market cap</p>
              <p className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-ink">{formatCompactNaira(totalMarketCap)}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Advancing / declining</p>
              <p className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-ink">
                <span className="text-positive">{advancing}</span>
                <span className="text-ink-muted"> / </span>
                <span className="text-negative">{declining}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {movers.map((c) => (
              <Link
                key={c.symbol}
                href={`/stocks/${c.symbol}`}
                className="flex items-center justify-between gap-3 bg-background px-4 py-3 text-sm hover:bg-surface-hover"
              >
                <span className="min-w-0">
                  <span className="font-semibold text-ink">{c.symbol}</span>
                  <span className="ml-2 truncate text-xs text-ink-muted">{c.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3 font-mono tabular-nums">
                  <span className="text-ink-muted">₦{c.price?.toFixed(2) ?? "—"}</span>
                  <span className={(c.changePercent ?? 0) >= 0 ? "text-positive" : "text-negative"}>
                    {formatPercent(c.changePercent)}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
