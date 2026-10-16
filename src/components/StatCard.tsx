export function StatCard({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p
        className={`mt-1.5 font-mono text-xl font-semibold tabular-nums ${
          tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : "text-ink"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
}
