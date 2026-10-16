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
    return <div className="flex h-64 items-center justify-center text-sm text-ink-muted">No fundamentals data.</div>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#212838" vertical={false} />
          <XAxis dataKey="period" tick={{ fill: "#98a3b8", fontSize: 11 }} axisLine={{ stroke: "#2c3448" }} tickLine={false} />
          <YAxis
            tick={{ fill: "#98a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={64}
            tickFormatter={(v) => formatCompactNaira(v)}
          />
          <Tooltip
            contentStyle={{ background: "#10151f", border: "1px solid #212838", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#98a3b8" }}
            itemStyle={{ color: "#f2f4f8" }}
            formatter={(value, name) => [formatCompactNaira(Number(value)), name === "revenue" ? "Revenue" : "Profit"]}
          />
          <Legend formatter={(value) => <span className="text-ink-muted">{value === "revenue" ? "Revenue" : "Profit"}</span>} />
          <Bar dataKey="revenue" fill="#3a4256" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#e8b34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
