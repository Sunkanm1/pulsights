import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock } from "lucide-react";
import { getArticleBySlug, getCompanyDetail, getRelatedArticles } from "@/lib/queries";
import { ArticleCover } from "@/components/ArticleCover";
import { ArticleCard } from "@/components/ArticleCard";
import { formatNaira, formatPercent, formatRelativeDate, ARTICLE_CATEGORY_LABELS } from "@/lib/format";

export const revalidate = 0;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, company] = await Promise.all([
    getRelatedArticles(slug, article.company?.symbol ?? null),
    article.company ? getCompanyDetail(article.company.symbol) : null,
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/news" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to News
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="mb-4 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-accent/15 px-2.5 py-1 font-semibold uppercase tracking-wide text-accent-strong">
              {ARTICLE_CATEGORY_LABELS[article.category] ?? article.category}
            </span>
            {article.isPlaceholder && (
              <span className="rounded-full border border-border px-2.5 py-1 text-ink-muted">Placeholder editorial content</span>
            )}
          </div>

          <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base text-ink-muted">{article.excerpt}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
            <span className="font-medium text-ink">{article.authorName}</span>
            {article.authorRole && <span>· {article.authorRole}</span>}
            <span>· {formatRelativeDate(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readMinutes} min read
            </span>
          </div>

          <ArticleCover category={article.category} className="mt-6 h-56 w-full rounded-xl sm:h-72" />

          <div className="prose-article mt-8">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink-muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <aside className="space-y-6">
          {company && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Mentioned in this story</p>
              <Link href={`/stocks/${company.symbol}`} className="mt-2 block">
                <p className="font-heading text-lg font-semibold text-ink hover:text-accent-strong">
                  {company.symbol}
                </p>
                <p className="text-xs text-ink-muted">{company.name}</p>
              </Link>
              {company.quote && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-lg font-semibold tabular-nums text-ink">
                    {formatNaira(company.quote.price)}
                  </span>
                  <span
                    className={`font-mono text-sm font-medium tabular-nums ${
                      company.quote.changePercent > 0
                        ? "text-positive"
                        : company.quote.changePercent < 0
                          ? "text-negative"
                          : "text-ink-muted"
                    }`}
                  >
                    {formatPercent(company.quote.changePercent)}
                  </span>
                </div>
              )}
              <Link
                href={`/stocks/${company.symbol}`}
                className="mt-3 inline-block text-xs font-medium text-accent-strong hover:underline"
              >
                View full financials →
              </Link>
            </div>
          )}

          {related.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">More stories</p>
              <div className="space-y-3">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/news/${a.slug}`}
                    className="block rounded-lg border border-border bg-surface p-3 hover:border-border-strong hover:bg-surface-hover"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
                      {ARTICLE_CATEGORY_LABELS[a.category] ?? a.category}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-ink">{a.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">{formatRelativeDate(a.publishedAt)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Read next</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
