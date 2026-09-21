import { howToBuyIntro, licensedBrokers, retailApps, type HowToBuyEntry } from "@/data/how-to-buy";

function EntryRow({ entry }: { entry: HowToBuyEntry }) {
  return (
    <li className="flex items-start justify-between gap-3 border-t border-slate-100 py-3 first:border-0">
      <div className="min-w-0">
        <p className="font-medium text-slate-900">{entry.name}</p>
        <p className="mt-0.5 text-sm text-slate-500">{entry.description}</p>
        <span
          className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            entry.cscsCompliant === "yes" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {entry.cscsCompliant === "yes" ? "CSCS-compliant" : "Confirm coverage for this stock"}
        </span>
      </div>
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900"
      >
        Visit ↗
      </a>
    </li>
  );
}

export function HowToBuyPanel({ symbol }: { symbol: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">How to buy {symbol}</h2>
      <p className="mt-2 text-sm text-slate-500">{howToBuyIntro}</p>

      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          NGX-licensed stockbroking firms
        </h3>
        <ul>
          {licensedBrokers.map((b) => (
            <EntryRow key={b.name} entry={b} />
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
