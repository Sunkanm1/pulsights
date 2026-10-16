import Link from "next/link";
import type { CompanySummary } from "@/lib/queries";
import { formatNaira, formatPercent } from "@/lib/format";

export function MarketTicker({ companies }: { companies: CompanySummary[] }) {
  const rows = companies.filter((c) => c.price != null);
  if (rows.length === 0) return null;

  return (
    <div className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2.5 text-sm sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rows.map((c) => (
          <Link
            key={c.symbol}
            href={`/stocks/${c.symbol}`}
            className="flex shrink-0 items-center gap-2 font-mono tabular-nums"
          >
            <span className="font-semibold text-ink">{c.symbol}</span>
            <span className="text-ink-muted">{formatNaira(c.price)}</span>
            <span
              className={
                (c.changePercent ?? 0) > 0
                  ? "text-positive"
                  : (c.changePercent ?? 0) < 0
                    ? "text-negative"
                    : "text-ink-muted"
              }
            >
              {formatPercent(c.changePercent)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
