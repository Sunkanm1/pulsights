"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-sm text-white"
          >
            {c.symbol}
            <button
              type="button"
              onClick={() => removeSymbol(c.symbol)}
              className="text-slate-400 hover:text-red-400"
              aria-label={`Remove ${c.symbol}`}
            >
              ✕
            </button>
          </span>
        ))}
        {selected.length < MAX_COMPARE && (
          <select
            value={pickerValue}
            onChange={(e) => addSymbol(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="">+ Add company…</option>
            {available.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.symbol} — {c.name}
              </option>
            ))}
          </select>
        )}
        <span className="text-xs text-slate-500">{selected.length}/{MAX_COMPARE} selected</span>
      </div>

      {selectedCompanies.length < 2 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
          Pick at least 2 companies to compare.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2.5">Metric</th>
                {selectedCompanies.map((c) => (
                  <th key={c.symbol} className="px-3 py-2.5 text-right">
                    <Link href={`/stocks/${c.symbol}`} className="hover:text-amber-700">
                      {c.symbol}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2.5 text-slate-500">{row.label}</td>
                  {selectedCompanies.map((c) => {
                    const tone = row.tone?.(c) ?? "neutral";
                    return (
                      <td
                        key={c.symbol}
                        className={`px-3 py-2.5 text-right font-medium tabular-nums ${
                          tone === "positive" ? "text-green-700" : tone === "negative" ? "text-red-700" : "text-slate-900"
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
