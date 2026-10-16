import { ArrowUpRight } from "lucide-react";
import { howToBuyIntro, licensedBrokers, retailApps, type HowToBuyEntry } from "@/data/how-to-buy";

function EntryRow({ entry }: { entry: HowToBuyEntry }) {
  return (
    <li className="flex items-start justify-between gap-3 border-t border-border py-3 first:border-0">
      <div className="min-w-0">
        <p className="font-medium text-ink">{entry.name}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{entry.description}</p>
        <span
          className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            entry.cscsCompliant === "yes" ? "bg-positive/15 text-positive" : "bg-accent/15 text-accent-strong"
          }`}
        >
          {entry.cscsCompliant === "yes" ? "CSCS-compliant" : "Confirm coverage for this stock"}
        </span>
      </div>
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-accent hover:text-ink"
      >
        Visit
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </li>
  );
}

export function HowToBuyPanel({ symbol }: { symbol: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h2 className="font-heading text-sm font-semibold text-ink">How to buy {symbol}</h2>
      <p className="mt-2 text-sm text-ink-muted">{howToBuyIntro}</p>

      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          NGX-licensed stockbroking firms
        </h3>
        <ul>
          {licensedBrokers.map((b) => (
            <EntryRow key={b.name} entry={b} />
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Retail investing apps with direct NGX access
        </h3>
        <ul>
          {retailApps.map((a) => (
            <EntryRow key={a.name} entry={a} />
          ))}
        </ul>
      </div>
    </div>
  );
}
