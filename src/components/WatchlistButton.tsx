"use client";

import { Star } from "lucide-react";
import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";

export function WatchlistButton({
  symbol,
  size = "sm",
  className = "",
}: {
  symbol: string;
  size?: "sm" | "lg";
  className?: string;
}) {
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
      className={`flex items-center justify-center rounded-md p-1.5 transition ${
        active ? "text-accent" : "text-ink-muted hover:text-accent-strong"
      } ${className}`}
    >
      <Star className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} fill={active ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}
