"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PricePoint } from "@/lib/data-providers/types";
import { formatNaira } from "@/lib/format";

const RANGES = ["1M", "6M", "1Y", "5Y"] as const;
type Range = (typeof RANGES)[number];

function sliceRange(points: PricePoint[], range: Range): PricePoint[] {
  const start = new Date();
  switch (range) {
    case "1M":
      start.setMonth(start.getMonth() - 1);
      break;
    case "6M":
      start.setMonth(start.getMonth() - 6);
      break;
    case "1Y":
      start.setFullYear(start.getFullYear() - 1);
      break;
    case "5Y":
      start.setFullYear(start.getFullYear() - 5);
      break;
  }
  return points.filter((p) => new Date(p.date) >= start);
}

export function PriceChart({ points }: { points: PricePoint[] }) {
  const [range, setRange] = useState<Range>("1Y");

  const data = useMemo(() => {
    return sliceRange(points, range).map((p) => ({
      date: new Date(p.date).toISOString().slice(0, 10),
      close: Number(p.close.toFixed(2)),
    }));
  }, [points, range]);

  const isUp = data.length > 1 && data[data.length - 1].close >= data[0].close;

  return (
    <div>
      <div className="mb-3 flex justify-end gap-1">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
              range === r ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">No price data.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isUp ? "#15803d" : "#b91c1c"} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={isUp ? "#15803d" : "#b91c1c"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                minTickGap={40}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(v) => formatNaira(v, 0)}
              />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#475569" }}
                formatter={(value) => [formatNaira(Number(value)), "Close"]}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke={isUp ? "#15803d" : "#b91c1c"}
                strokeWidth={2}
                fill="url(#priceFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
