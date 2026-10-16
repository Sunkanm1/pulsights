import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export function DisclaimerFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-accent-strong">
          <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
          Not financial advice. News is placeholder editorial copy and data may be delayed — verify before investing.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Pulsights</span>
          <Link href="/news" className="hover:text-ink">
            News
          </Link>
          <Link href="/markets" className="hover:text-ink">
            Markets
          </Link>
          <Link href="/stocks" className="hover:text-ink">
            Stocks
          </Link>
        </div>
      </div>
    </footer>
  );
}
