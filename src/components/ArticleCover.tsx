import {
  Building2,
  Coins,
  Globe2,
  LineChart,
  Newspaper,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/format";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  MARKET_NEWS: Newspaper,
  EARNINGS: LineChart,
  DIVIDENDS: Coins,
  IPO_LISTINGS: Rocket,
  ANALYSIS: Search,
  MACRO: Globe2,
  COMPANY_NEWS: Building2,
};

const CATEGORY_GRADIENT: Record<string, string> = {
  MARKET_NEWS: "from-[#141c2b] via-[#0e1420] to-[#05070c]",
  EARNINGS: "from-[#1f2a1c] via-[#101a13] to-[#05070c]",
  DIVIDENDS: "from-[#2a2114] via-[#181310] to-[#05070c]",
  IPO_LISTINGS: "from-[#1c1a2a] via-[#12101c] to-[#05070c]",
  ANALYSIS: "from-[#1a2230] via-[#101620] to-[#05070c]",
  MACRO: "from-[#122029] via-[#0d151b] to-[#05070c]",
  COMPANY_NEWS: "from-[#241a14] via-[#151110] to-[#05070c]",
};

export function ArticleCover({ category, className = "" }: { category: string; className?: string }) {
  const Icon = CATEGORY_ICON[category] ?? Newspaper;
  const gradient = CATEGORY_GRADIENT[category] ?? CATEGORY_GRADIENT.MARKET_NEWS;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#e8b34a 1px, transparent 1px), linear-gradient(90deg, #e8b34a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <Icon className="h-10 w-10 text-accent/70" strokeWidth={1.5} aria-hidden />
      <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
        {ARTICLE_CATEGORY_LABELS[category] ?? category}
      </span>
    </div>
  );
}
