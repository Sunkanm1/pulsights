"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
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
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ticker…"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:w-auto"
        >
          <option value="ALL">All sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {SECTOR_LABELS[s] ?? s}
            </option>
          ))}
        </select>
        <span className="text-sm text-ink-muted">{filtered.length} companies</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <th className="sticky left-0 z-10 bg-surface-2 px-3 py-2.5">Company</th>
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-ink"
                  >
                    {col.label}
                    {sortKey === col.key && <span className="text-accent">{sortDir === "asc" ? "▲" : "▼"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.symbol} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="sticky left-0 z-10 bg-surface px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <WatchlistButton symbol={c.symbol} />
                    <Link href={`/stocks/${c.symbol}`} className="min-w-0">
                      <p className="font-semibold text-ink">{c.symbol}</p>
                      <p className="truncate text-xs text-ink-muted">{c.name}</p>
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink">{formatNaira(c.price)}</td>
                <td
                  className={`px-3 py-2.5 text-right font-mono font-medium tabular-nums ${
                    (c.changePercent ?? 0) > 0
                      ? "text-positive"
                      : (c.changePercent ?? 0) < 0
                        ? "text-negative"
                        : "text-ink-muted"
                  }`}
                >
                  {formatPercent(c.changePercent)}
                </td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.marketCap)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.revenue)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.profit)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.operatingCashFlow)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatCompactNaira(c.totalDebt)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatNaira(c.eps)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatPercent(c.dividendYield)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatPercent(c.roe)}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-ink-muted">{formatRatio(c.peRatio)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-ink-muted">
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
