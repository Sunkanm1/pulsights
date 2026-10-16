import { formatDateTime } from "@/lib/format";

export function SourceBadge({
  asOf,
  source,
  isPlaceholder,
}: {
  asOf: Date | string | null | undefined;
  source: string | null | undefined;
  isPlaceholder?: boolean;
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
      <span>
        As of <span className="font-medium text-ink">{formatDateTime(asOf)}</span>
      </span>
      <span className="text-border-strong">·</span>
      <span>
        Source: <span className="font-medium text-ink">{source ?? "unknown"}</span>
      </span>
      {isPlaceholder && (
        <>
          <span className="text-border-strong">·</span>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent-strong">
            Placeholder data
          </span>
        </>
      )}
    </div>
  );
}
