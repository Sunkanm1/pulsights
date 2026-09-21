import { getCompanyList } from "@/lib/queries";
import { CompareView } from "@/components/CompareView";
import { SourceBadge } from "@/components/SourceBadge";

export const revalidate = 0;

export default async function ComparePage() {
  const companies = await getCompanyList();
  const first = companies[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">Compare</h1>
        <p className="mt-1 text-sm text-slate-400">Put 2–4 stocks side by side across all 8 metrics.</p>
        <div className="mt-3">
          <SourceBadge asOf={first?.asOf} source={first?.source} isPlaceholder={first?.isPlaceholder} />
        </div>
      </div>
      <CompareView companies={companies} />
    </div>
  );
}
