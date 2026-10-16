import { notFound } from "next/navigation";
import { getArticlesByCompany, getCompanyDetail } from "@/lib/queries";
import { db } from "@/lib/db";
import { StatCard } from "@/components/StatCard";
import { SourceBadge } from "@/components/SourceBadge";
import { WatchlistButton } from "@/components/WatchlistButton";
import { PriceChart } from "@/components/PriceChart";
import { RevenueProfitChart } from "@/components/RevenueProfitChart";
import { DividendChart } from "@/components/DividendChart";
import { HowToBuyPanel } from "@/components/HowToBuyPanel";
import { ArticleCard } from "@/components/ArticleCard";
import { formatCompactNaira, formatDate, formatNaira, formatPercent, formatRatio, SECTOR_LABELS } from "@/lib/format";

export const revalidate = 0;

export async function generateStaticParams() {
  const companies = await db.company.findMany({ select: { symbol: true } });
  return companies.map((c) => ({ symbol: c.symbol }));
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const [company, relatedArticles] = await Promise.all([
    getCompanyDetail(symbol.toUpperCase()),
    getArticlesByCompany(symbol.toUpperCase()),
  ]);
  if (!company) notFound();

  const latest = company.fundamentals[company.fundamentals.length - 1] ?? null;
  const q = company.quote;
  const changeTone = (q?.change ?? 0) > 0 ? "positive" : (q?.change ?? 0) < 0 ? "negative" : "neutral";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">{company.name}</h1>
            <WatchlistButton symbol={company.symbol} size="lg" />
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            {company.symbol} · {SECTOR_LABELS[company.sector] ?? company.sector}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold tabular-nums text-ink">{formatNaira(q?.price ?? null)}</p>
          <p
            className={`font-mono text-sm font-medium tabular-nums ${
              changeTone === "positive" ? "text-positive" : changeTone === "negative" ? "text-negative" : "text-ink-muted"
            }`}
          >
            {q ? `${q.change >= 0 ? "+" : ""}${q.change.toFixed(2)} (${formatPercent(q.changePercent)})` : "—"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <SourceBadge asOf={q?.asOf ?? latest?.asOf} source={q?.source ?? latest?.source} isPlaceholder={q?.isPlaceholder ?? latest?.isPlaceholder} />
      </div>

      <section className="mb-8">
        <h2 className="mb-3 font-heading text-sm font-semibold text-ink">Key metrics {latest ? `(${latest.periodLabel})` : ""}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Revenue" value={formatCompactNaira(latest?.revenue ?? null)} />
          <StatCard label="Profit" value={formatCompactNaira(latest?.profit ?? null)} tone={(latest?.profit ?? 0) < 0 ? "negative" : "neutral"} />
          <StatCard label="Operating cash flow" value={formatCompactNaira(latest?.operatingCashFlow ?? null)} />
          <StatCard label="Total debt" value={formatCompactNaira(latest?.totalDebt ?? null)} />
          <StatCard label="EPS" value={formatNaira(latest?.eps ?? null)} tone={(latest?.eps ?? 0) < 0 ? "negative" : "neutral"} />
          <StatCard
            label="Dividend"
            value={formatNaira(latest?.dividendPerShare ?? null)}
            sub={`Yield ${formatPercent(latest?.dividendYield ?? null)}`}
          />
          <StatCard label="ROE" value={formatPercent(latest?.roe ?? null)} tone={(latest?.roe ?? 0) < 0 ? "negative" : "neutral"} />
          <StatCard
            label="Valuation"
            value={`P/E ${formatRatio(latest?.peRatio ?? null)}`}
            sub={`P/B ${formatRatio(latest?.pbRatio ?? null)} · Mkt cap ${formatCompactNaira(q?.marketCap ?? null)}`}
          />
        </div>
      </section>

      <section className="mb-8 rounded-lg border border-border bg-surface p-4">
        <h2 className="mb-1 font-heading text-sm font-semibold text-ink">Price history</h2>
        <PriceChart points={company.priceHistory5Y} />
      </section>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-1 font-heading text-sm font-semibold text-ink">Revenue &amp; profit trend</h2>
          <RevenueProfitChart fundamentals={company.fundamentals} />
        </section>
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-1 font-heading text-sm font-semibold text-ink">Dividend history</h2>
          <DividendChart dividends={company.dividendHistory} />
        </section>
      </div>

      <section className="mb-8 rounded-lg border border-border bg-surface p-4">
        <h2 className="mb-2 font-heading text-sm font-semibold text-ink">About {company.name}</h2>
        <p className="text-sm leading-relaxed text-ink-muted">{company.description}</p>
        <p className="mt-2 text-xs text-ink-muted">
          Sector: {SECTOR_LABELS[company.sector] ?? company.sector} · Listed on NGX: {formatDate(company.listingDate)}
        </p>
      </section>

      {relatedArticles.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-heading text-sm font-semibold text-ink">In the news</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <HowToBuyPanel symbol={company.symbol} />
      </section>
    </div>
  );
}
