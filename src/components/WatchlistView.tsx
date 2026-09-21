"use client";

import Link from "next/link";
import type { CompanySummary } from "@/lib/queries";
import { formatCompactNaira, formatNaira, formatPercent } from "@/lib/format";
import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";

export function WatchlistView({ companies }: { companies: CompanySummary[] }) {
  const symbols = useWatchlist();
  const rows = companies.filter((c) => symbols.includes(c.symbol));

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          Your watchlist is empty. Tap the ☆ next to any stock to add it — it&apos;s saved in this browser only.
        </p>
        <Link
          href="/stocks"
          className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Browse stocks
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-3 py-2.5">Company</th>
            <th className="px-3 py-2.5 text-right">Price</th>
            <th className="px-3 py-2.5 text-right">Chg %</th>
            <th className="px-3 py-2.5 text-right">Market cap</th>
            <th className="px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.symbol} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              <td className="px-3 py-2.5">
                <Link href={`/stocks/${c.symbol}`}>
                  <p className="font-semibold text-slate-900">{c.symbol}</p>
                  <p className="text-xs text-slate-500">{c.name}</p>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">{formatNaira(c.price)}</td>
              <td
                className={`px-3 py-2.5 text-right font-medium tabular-nums ${
                  (c.changePercent ?? 0) > 0 ? "text-green-700" : (c.changePercent ?? 0) < 0 ? "text-red-700" : "text-slate-500"
                }`}
              >
                {formatPercent(c.changePercent)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">{formatCompactNaira(c.marketCap)}</td>
              <td className="px-3 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => toggleWatchlist(c.symbol)}
                  className="text-xs font-medium text-slate-400 hover:text-red-600"
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
