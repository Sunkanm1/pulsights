import Link from "next/link";
import { Clock } from "lucide-react";
import type { ArticleSummary } from "@/lib/queries";
import { ARTICLE_CATEGORY_LABELS, formatRelativeDate } from "@/lib/format";
import { ArticleCover } from "@/components/ArticleCover";

export function ArticleCard({ article, size = "default" }: { article: ArticleSummary; size?: "default" | "large" }) {
  const large = size === "large";

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-border-strong hover:bg-surface-hover"
    >
      <ArticleCover category={article.category} className={large ? "h-56 w-full" : "h-36 w-full"} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <span className="font-semibold uppercase tracking-wide text-accent-strong">
            {ARTICLE_CATEGORY_LABELS[article.category] ?? article.category}
          </span>
          {article.company && (
            <>
              <span>·</span>
              <span className="font-mono">{article.company.symbol}</span>
            </>
          )}
        </div>
        <h3
          className={`mt-2 font-heading font-semibold text-ink group-hover:text-accent-strong ${
            large ? "text-xl leading-snug" : "text-base leading-snug"
          }`}
        >
          {article.title}
        </h3>
        <p className={`mt-2 text-sm text-ink-muted ${large ? "line-clamp-3" : "line-clamp-2"}`}>{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-ink-muted">
          <span>{article.authorName}</span>
          <span>·</span>
          <span>{formatRelativeDate(article.publishedAt)}</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
