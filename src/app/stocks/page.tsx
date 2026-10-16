import { getAllSectors, getCompanyList } from "@/lib/queries";
import { StockTable } from "@/components/StockTable";
import { SourceBadge } from "@/components/SourceBadge";

export const revalidate = 0;

export default async function StocksPage() {
  const [companies, sectors] = await Promise.all([getCompanyList(), getAllSectors()]);
  const first = companies[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">Stocks</h1>
        <p className="mt-1 text-sm text-ink-muted">Search, filter by sector, and sort by any metric.</p>
        <div className="mt-3">
          <SourceBadge asOf={first?.asOf} source={first?.source} isPlaceholder={first?.isPlaceholder} />
        </div>
      </div>
      <StockTable companies={companies} sectors={sectors} />
    </div>
  );
}
