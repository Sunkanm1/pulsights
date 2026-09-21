"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompactNaira } from "@/lib/format";

type FundamentalsPeriodLike = { periodLabel: string; revenue: number | null; profit: number | null };

export function RevenueProfitChart({ fundamentals }: { fundamentals: FundamentalsPeriodLike[] }) {
  const data = fundamentals.map((f) => ({
    period: f.periodLabel,
    revenue: f.revenue ?? 0,
    profit: f.profit ?? 0,
  }));

  if (data.length === 0) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-500">No fundamentals data.</div>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#334155" }} tickLine={false} />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={64}
            tickFormatter={(v) => formatCompactNaira(v)}
          />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#cbd5e1" }}
            formatter={(value, name) => [formatCompactNaira(Number(value)), name === "revenue" ? "Revenue" : "Profit"]}
          />
          <Legend
            formatter={(value) => <span className="text-slate-400">{value === "revenue" ? "Revenue" : "Profit"}</span>}
          />
          <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
