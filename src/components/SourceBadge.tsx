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
    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-400">
      <span>
        As of <span className="text-slate-200">{formatDateTime(asOf)}</span>
      </span>
      <span className="text-slate-600">·</span>
      <span>
        Source: <span className="text-slate-200">{source ?? "unknown"}</span>
      </span>
      {isPlaceholder && (
        <>
          <span className="text-slate-600">·</span>
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-semibold text-amber-300">
            Placeholder data
          </span>
        </>
      )}
    </div>
  );
}
