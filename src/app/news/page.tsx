import Link from "next/link";
import { getArticles } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/format";

export const revalidate = 0;

const CATEGORIES = Object.keys(ARTICLE_CATEGORY_LABELS);

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category && CATEGORIES.includes(category) ? category : undefined;
  const articles = await getArticles({ category: activeCategory });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">News</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Market wraps, earnings commentary and explainers on NGX-listed companies.
        </p>
        <p className="mt-3 inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
          Editorial placeholder content, not live news — see each article for detail.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/news"
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            !activeCategory ? "bg-accent text-accent-ink" : "bg-surface text-ink-muted hover:text-ink"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/news?category=${c}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeCategory === c ? "bg-accent text-accent-ink" : "bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            {ARTICLE_CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-ink-muted">
          No articles in this category yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
