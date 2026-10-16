"use client";

import Link from "next/link";
import { formatCompactNaira, formatNaira, formatPercent } from "@/lib/format";
import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";
import type { CompanySummary } from "@/lib/queries";

export function WatchlistView({ companies }: { companies: CompanySummary[] }) {
  const symbols = useWatchlist();
  const rows = companies.filter((c) => symbols.includes(c.symbol));

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-ink-muted">
          Your watchlist is empty. Tap the star next to any stock to add it — it&apos;s saved in this browser only.
        </p>
        <Link
          href="/stocks"
          className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:bg-accent-strong"
        >
          Browse stocks
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <th className="px-3 py-2.5">Company</th>
            <th className="px-3 py-2.5 text-right">Price</th>
            <th className="px-3 py-2.5 text-right">Chg %</th>
            <th className="px-3 py-2.5 text-right">Market cap</th>
            <th className="px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.symbol} className="border-b border-border last:border-0 hover:bg-surface-hover">
              <td className="px-3 py-2.5">
                <Link href={`/stocks/${c.symbol}`}>
                  <p className="font-semibold text-ink">{c.symbol}</p>
                  <p className="text-xs text-ink-muted">{c.name}</p>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink">{formatNaira(c.price)}</td>
              <td
                className={`px-3 py-2.5 text-right font-mono font-medium tabular-nums ${
                  (c.changePercent ?? 0) > 0 ? "text-positive" : (c.changePercent ?? 0) < 0 ? "text-negative" : "text-ink-muted"
                }`}
              >
                {formatPercent(c.changePercent)}
              </td>
              <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.marketCap)}</td>
              <td className="px-3 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => toggleWatchlist(c.symbol)}
                  className="text-xs font-medium text-ink-muted hover:text-negative"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
