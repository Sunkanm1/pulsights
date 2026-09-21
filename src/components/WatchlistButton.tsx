"use client";

import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";

export function WatchlistButton({ symbol, className = "" }: { symbol: string; className?: string }) {
  const symbols = useWatchlist();
  const active = symbols.includes(symbol);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchlist(symbol);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
      className={`rounded-md p-1.5 text-lg leading-none transition ${
        active ? "text-amber-400 hover:text-amber-300" : "text-slate-600 hover:text-slate-300"
      } ${className}`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
