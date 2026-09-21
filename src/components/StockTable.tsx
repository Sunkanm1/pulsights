"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanySummary } from "@/lib/queries";
import { formatCompactNaira, formatNaira, formatPercent, formatRatio, SECTOR_LABELS } from "@/lib/format";
import { WatchlistButton } from "@/components/WatchlistButton";

type SortKey =
  | "name"
  | "price"
  | "changePercent"
  | "marketCap"
  | "revenue"
  | "profit"
  | "operatingCashFlow"
  | "totalDebt"
  | "eps"
  | "dividendYield"
  | "roe"
  | "peRatio";

const columns: { key: SortKey; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "changePercent", label: "Chg %" },
  { key: "marketCap", label: "Mkt Cap" },
  { key: "revenue", label: "Revenue" },
  { key: "profit", label: "Profit" },
  { key: "operatingCashFlow", label: "Op. Cash Flow" },
  { key: "totalDebt", label: "Debt" },
  { key: "eps", label: "EPS" },
  { key: "dividendYield", label: "Div Yield" },
  { key: "roe", label: "ROE" },
  { key: "peRatio", label: "P/E" },
];

export function StockTable({ companies, sectors }: { companies: CompanySummary[]; sectors: string[] }) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = companies;
    if (sector !== "ALL") rows = rows.filter((c) => c.sector === sector);
    if (q) rows = rows.filter((c) => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));

    const sorted = [...rows].sort((a, b) => {
      if (sortKey === "name") {
        return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      const av = a[sortKey] ?? -Infinity;
      const bv = b[sortKey] ?? -Infinity;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return sorted;
  }, [companies, search, sector, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or ticker…"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none sm:max-w-xs"
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none sm:w-auto"
        >
          <option value="ALL">All sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {SECTOR_LABELS[s] ?? s}
            </option>
          ))}
        </select>
        <span className="text-sm text-slate-500">{filtered.length} companies</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="sticky left-0 z-10 bg-slate-900/95 px-3 py-2.5">Company</th>
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-slate-100"
                  >
                    {col.label}
                    {sortKey === col.key && <span>{sortDir === "asc" ? "▲" : "▼"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.symbol} className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40">
                <td className="sticky left-0 z-10 bg-slate-950/95 px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <WatchlistButton symbol={c.symbol} />
                    <Link href={`/stocks/${c.symbol}`} className="min-w-0">
                      <p className="font-semibold text-slate-100">{c.symbol}</p>
                      <p className="truncate text-xs text-slate-500">{c.name}</p>
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right text-slate-200">{formatNaira(c.price)}</td>
                <td
                  className={`px-3 py-2.5 text-right font-medium ${
                    (c.changePercent ?? 0) > 0
                      ? "text-emerald-400"
                      : (c.changePercent ?? 0) < 0
                        ? "text-rose-400"
                        : "text-slate-400"
                  }`}
                >
                  {formatPercent(c.changePercent)}
                </td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.marketCap)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.revenue)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.profit)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.operatingCashFlow)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatCompactNaira(c.totalDebt)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatNaira(c.eps)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatPercent(c.dividendYield)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatPercent(c.roe)}</td>
                <td className="px-3 py-2.5 text-right text-slate-300">{formatRatio(c.peRatio)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-slate-500">
                  No companies match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
