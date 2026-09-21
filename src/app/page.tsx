import Link from "next/link";
import { getCompanyList } from "@/lib/queries";
import { SourceBadge } from "@/components/SourceBadge";
import { StatCard } from "@/components/StatCard";
import { formatCompactNaira, formatPercent, SECTOR_LABELS } from "@/lib/format";

export const revalidate = 0;

export default async function MarketOverviewPage() {
  const companies = await getCompanyList();
  const withQuotes = companies.filter((c) => c.changePercent != null && c.price != null);

  const avgChangePercent =
    withQuotes.length > 0
      ? withQuotes.reduce((sum, c) => sum + (c.changePercent ?? 0), 0) / withQuotes.length
      : 0;
  const totalMarketCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);
  const advancing = withQuotes.filter((c) => (c.changePercent ?? 0) > 0).length;
  const declining = withQuotes.filter((c) => (c.changePercent ?? 0) < 0).length;

  const gainers = [...withQuotes].sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0)).slice(0, 5);
  const losers = [...withQuotes].sort((a, b) => (a.changePercent ?? 0) - (b.changePercent ?? 0)).slice(0, 5);

  const bySector = new Map<string, number>();
  for (const c of companies) {
    bySector.set(c.sector, (bySector.get(c.sector) ?? 0) + (c.marketCap ?? 0));
  }
  const sectorBreakdown = [...bySector.entries()]
    .map(([sector, marketCap]) => ({
      sector,
      marketCap,
      share: totalMarketCap > 0 ? (marketCap / totalMarketCap) * 100 : 0,
    }))
    .sort((a, b) => b.marketCap - a.marketCap);

  const first = companies[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Market overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Snapshot of the {companies.length} NGX-listed companies Pulsights tracks.
        </p>
        <div className="mt-3">
          <SourceBadge asOf={first?.asOf} source={first?.source} isPlaceholder={first?.isPlaceholder} />
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
        <strong className="text-slate-900">Pulsights Tracked-20 Composite</strong> — an equal-weighted average
        of the {companies.length} companies below, not the official NGX All-Share Index. NGX publishes the ASI
        across its full list of 150+ listed companies; we don&apos;t have a licensed feed for that figure yet, so
        we show this instead rather than imply we do.
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Tracked-20 composite"
          value={formatPercent(avgChangePercent)}
          tone={avgChangePercent > 0 ? "positive" : avgChangePercent < 0 ? "negative" : "neutral"}
          sub="Equal-weighted avg change"
        />
        <StatCard label="Combined market cap" value={formatCompactNaira(totalMarketCap)} sub="Tracked companies" />
        <StatCard label="Advancing" value={String(advancing)} tone="positive" sub={`of ${withQuotes.length}`} />
        <StatCard label="Declining" value={String(declining)} tone="negative" sub={`of ${withQuotes.length}`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Top gainers</h2>
          <MoversTable rows={gainers} />
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Top losers</h2>
          <MoversTable rows={losers} />
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Sector breakdown</h2>
        <div className="space-y-2.5">
          {sectorBreakdown.map((s) => (
            <div key={s.sector} className="flex items-center gap-3 text-sm">
              <span className="w-40 shrink-0 text-slate-600">{SECTOR_LABELS[s.sector] ?? s.sector}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-900" style={{ width: `${s.share}%` }} />
              </div>
              <span className="w-14 shrink-0 text-right tabular-nums text-slate-500">{s.share.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MoversTable({
  rows,
}: {
  rows: { symbol: string; name: string; price: number | null; changePercent: number | null }[];
}) {
  if (rows.length === 0) return <p className="text-sm text-slate-500">No data.</p>;
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((r) => (
          <tr key={r.symbol} className="border-t border-slate-100 first:border-0">
            <td className="py-2">
              <Link href={`/stocks/${r.symbol}`} className="font-medium text-slate-900 hover:text-amber-700">
                {r.symbol}
              </Link>
              <span className="ml-2 text-xs text-slate-500">{r.name}</span>
            </td>
            <td className="py-2 text-right tabular-nums text-slate-700">₦{r.price?.toFixed(2) ?? "—"}</td>
            <td
              className={`py-2 pl-4 text-right font-medium tabular-nums ${
                (r.changePercent ?? 0) > 0
                  ? "text-green-700"
                  : (r.changePercent ?? 0) < 0
                    ? "text-red-700"
                    : "text-slate-500"
              }`}
            >
              {formatPercent(r.changePercent)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
