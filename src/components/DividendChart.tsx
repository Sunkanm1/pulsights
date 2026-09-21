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
    return <div className="flex h-56 items-center justify-center text-sm text-slate-500">No dividend history.</div>;
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={56}
            tickFormatter={(v) => formatNaira(v, 0)}
          />
          <Tooltip
            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#475569" }}
            formatter={(value) => [formatNaira(Number(value)), "Dividend / share"]}
          />
          <Bar dataKey="amount" fill="#15803d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
