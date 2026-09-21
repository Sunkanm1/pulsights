import { getCompanyList } from "@/lib/queries";
import { WatchlistView } from "@/components/WatchlistView";

export const revalidate = 0;

export default async function WatchlistPage() {
  const companies = await getCompanyList();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Watchlist</h1>
        <p className="mt-1 text-sm text-slate-500">Saved in this browser only — no account needed.</p>
      </div>
      <WatchlistView companies={companies} />
    </div>
  );
}
