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
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
        <p className="text-sm text-slate-400">
          Your watchlist is empty. Tap the ☆ next to any stock to add it — it&apos;s saved in this browser only.
        </p>
        <Link
          href="/stocks"
          className="mt-4 inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
        >
          Browse stocks
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/60 text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="px-3 py-2.5">Company</th>
            <th className="px-3 py-2.5 text-right">Price</th>
            <th className="px-3 py-2.5 text-right">Chg %</th>
            <th className="px-3 py-2.5 text-right">Market cap</th>
            <th className="px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.symbol} className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40">
              <td className="px-3 py-2.5">
                <Link href={`/stocks/${c.symbol}`}>
                  <p className="font-semibold text-slate-100">{c.symbol}</p>
                  <p className="text-xs text-slate-500">{c.name}</p>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-right text-slate-200">{formatNaira(c.price)}</td>
              <td
                className={`px-3 py-2.5 text-right font-medium ${
                  (c.changePercent ?? 0) > 0 ? "text-emerald-400" : (c.changePercent ?? 0) < 0 ? "text-rose-400" : "text-slate-400"
                }`}
              >
                {formatPercent(c.changePercent)}
              </td>
              <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.marketCap)}</td>
              <td className="px-3 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => toggleWatchlist(c.symbol)}
                  className="text-xs font-medium text-slate-500 hover:text-rose-400"
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
