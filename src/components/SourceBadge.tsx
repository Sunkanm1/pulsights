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
    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
      <span>
        As of <span className="font-medium text-slate-700">{formatDateTime(asOf)}</span>
      </span>
      <span className="text-slate-300">·</span>
      <span>
        Source: <span className="font-medium text-slate-700">{source ?? "unknown"}</span>
      </span>
      {isPlaceholder && (
        <>
          <span className="text-slate-300">·</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
            Placeholder data
          </span>
        </>
      )}
    </div>
  );
}
