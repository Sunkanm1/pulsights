"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { CompanySummary } from "@/lib/queries";
import { formatCompactNaira, formatNaira, formatPercent, formatRatio } from "@/lib/format";

const MAX_COMPARE = 4;

type Row = {
  label: string;
  render: (c: CompanySummary) => string;
  tone?: (c: CompanySummary) => "positive" | "negative" | "neutral";
};

const rows: Row[] = [
  { label: "Price", render: (c) => formatNaira(c.price) },
  {
    label: "Day change",
    render: (c) => formatPercent(c.changePercent),
    tone: (c) => ((c.changePercent ?? 0) > 0 ? "positive" : (c.changePercent ?? 0) < 0 ? "negative" : "neutral"),
  },
  { label: "Market cap", render: (c) => formatCompactNaira(c.marketCap) },
  { label: "Revenue", render: (c) => formatCompactNaira(c.revenue) },
  {
    label: "Profit",
    render: (c) => formatCompactNaira(c.profit),
    tone: (c) => ((c.profit ?? 0) < 0 ? "negative" : "neutral"),
  },
  { label: "Operating cash flow", render: (c) => formatCompactNaira(c.operatingCashFlow) },
  { label: "Debt", render: (c) => formatCompactNaira(c.totalDebt) },
  { label: "EPS", render: (c) => formatNaira(c.eps) },
  {
    label: "Dividend",
    render: (c) => `${formatNaira(c.dividendPerShare)} (${formatPercent(c.dividendYield)} yield)`,
  },
  {
    label: "ROE",
    render: (c) => formatPercent(c.roe),
    tone: (c) => ((c.roe ?? 0) < 0 ? "negative" : "neutral"),
  },
  { label: "Valuation (P/E)", render: (c) => formatRatio(c.peRatio) },
  { label: "Valuation (P/B)", render: (c) => formatRatio(c.pbRatio) },
];

export function CompareView({ companies }: { companies: CompanySummary[] }) {
  const [selected, setSelected] = useState<string[]>(companies.slice(0, 2).map((c) => c.symbol));
  const [pickerValue, setPickerValue] = useState("");

  const selectedCompanies = useMemo(
    () => selected.map((s) => companies.find((c) => c.symbol === s)).filter((c): c is CompanySummary => Boolean(c)),
    [selected, companies]
  );

  const available = companies.filter((c) => !selected.includes(c.symbol));

  function addSymbol(symbol: string) {
    if (!symbol || selected.includes(symbol) || selected.length >= MAX_COMPARE) return;
    setSelected((s) => [...s, symbol]);
    setPickerValue("");
  }

  function removeSymbol(symbol: string) {
    setSelected((s) => s.filter((x) => x !== symbol));
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {selectedCompanies.map((c) => (
          <span
            key={c.symbol}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-ink"
          >
            {c.symbol}
            <button
              type="button"
              onClick={() => removeSymbol(c.symbol)}
              className="text-accent-ink/70 hover:text-accent-ink"
              aria-label={`Remove ${c.symbol}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {selected.length < MAX_COMPARE && (
          <select
            value={pickerValue}
            onChange={(e) => addSymbol(e.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">+ Add company…</option>
            {available.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.symbol} — {c.name}
              </option>
            ))}
          </select>
        )}
        <span className="text-xs text-ink-muted">
          {selected.length}/{MAX_COMPARE} selected
        </span>
      </div>

      {selectedCompanies.length < 2 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-sm text-ink-muted">
          Pick at least 2 companies to compare.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-2.5">Metric</th>
                {selectedCompanies.map((c) => (
                  <th key={c.symbol} className="px-3 py-2.5 text-right">
                    <Link href={`/stocks/${c.symbol}`} className="hover:text-accent">
                      {c.symbol}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5 text-ink-muted">{row.label}</td>
                  {selectedCompanies.map((c) => {
                    const tone = row.tone?.(c) ?? "neutral";
                    return (
                      <td
                        key={c.symbol}
                        className={`px-3 py-2.5 text-right font-mono font-medium tabular-nums ${
                          tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : "text-ink"
                        }`}
                      >
                        {row.render(c)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
