"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatNaira } from "@/lib/format";

export function DividendChart({
  dividends,
}: {
  dividends: { year: number; type: string; amount: number }[];
}) {
  const data = dividends.map((d) => ({ year: String(d.year), amount: d.amount }));

  if (data.length === 0) {
    return <div className="flex h-56 items-center justify-center text-sm text-ink-muted">No dividend history.</div>;
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#212838" vertical={false} />
          <XAxis dataKey="year" tick={{ fill: "#98a3b8", fontSize: 11 }} axisLine={{ stroke: "#2c3448" }} tickLine={false} />
          <YAxis
            tick={{ fill: "#98a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={56}
            tickFormatter={(v) => formatNaira(v, 0)}
          />
          <Tooltip
            contentStyle={{ background: "#10151f", border: "1px solid #212838", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#98a3b8" }}
            itemStyle={{ color: "#f2f4f8" }}
            formatter={(value) => [formatNaira(Number(value)), "Dividend / share"]}
          />
          <Bar dataKey="amount" fill="#e8b34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
