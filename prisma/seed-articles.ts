// Placeholder editorial content for the Pulsights News section.
//
// IMPORTANT: These are hand-written PLACEHOLDER articles, not real NGX news
// scraped or licensed from any publisher. They exist so the blog UI has
// something realistic-shaped to render before a real news feed / CMS is
// wired up. Every row seeded from this file is flagged `isPlaceholder: true`
// and stamped with a `source` label so the UI can be honest about it — same
// pattern as prisma/seed-companies.ts for the financial data.
//
// Deliberately avoid baking specific price/percentage moves into the prose:
// those numbers come from Quote/Fundamentals and drift on every cron
// refresh, while this copy does not.

export type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  category:
    | "MARKET_NEWS"
    | "EARNINGS"
    | "DIVIDENDS"
    | "IPO_LISTINGS"
    | "ANALYSIS"
    | "MACRO"
    | "COMPANY_NEWS";
  tags: string[];
  authorName: string;
  authorRole?: string;
  featured?: boolean;
  readMinutes: number;
  companySymbol?: string; // links to a company seeded in seed-companies.ts
  daysAgo: number; // publishedAt = now - daysAgo
};

export const seedArticles: SeedArticle[] = [
  {
    slug: "ngx-tracked-20-weekly-wrap",
    title: "NGX week in review: banks and industrials set the tone",
    excerpt:
      "A look at how the Tracked-20 composite moved this week, which sectors led, and what desks are watching into the next session.",
    content: `The Nigerian Exchange spent the week trading on a familiar script: banking-sector earnings chatter, industrial demand data, and the usual naira liquidity questions that shape sentiment across Lagos trading floors.

Desks flagged continued rotation between banking and industrial names as investors positioned ahead of the next round of corporate disclosures. Volumes stayed concentrated in the same handful of large-cap tickers that dominate the Tracked-20 composite, with mid-cap names seeing comparatively thin turnover.

## What moved the tape

Banking counters remained the most actively discussed group, with capital adequacy and cost-of-funds commentary continuing to shape how the market prices the sector heading into the next reporting window. Industrial goods names tracked cement and construction demand signals, while consumer goods tickers stayed sensitive to input-cost and FX pass-through conversations.

## What we're watching next

- Whether banking-sector cost-of-funds pressure eases as the interest-rate cycle evolves
- Cement and building-materials demand into the next construction season
- FX liquidity conditions and their pass-through to consumer goods margins

As always: this is a market wrap, not investment advice. Check the Markets page for live Tracked-20 composite figures.`,
    category: "MARKET_NEWS",
    tags: ["market-wrap", "ngx", "tracked-20"],
    authorName: "Pulsights Desk",
    authorRole: "Markets team",
    featured: true,
    readMinutes: 4,
    daysAgo: 1,
  },
  {
    slug: "dangote-cement-capacity-expansion-explainer",
    title: "Why Dangote Cement's capacity expansion matters for the sector",
    excerpt:
      "A explainer on how additional plant capacity typically flows through to volumes, unit costs, and margin — and what to watch in the next set of results.",
    content: `Dangote Cement remains Africa's largest cement producer, and capacity decisions at its Obajana and Ibese plants tend to ripple across the entire Nigerian building-materials sector — affecting everything from smaller cement peers' pricing power to the input costs faced by construction and real-estate names.

## The mechanics of a capacity expansion

When a cement producer adds kiln capacity, the near-term effect is usually higher depreciation and financing costs, with the payoff arriving later as utilization rises and per-tonne fixed costs fall. That lag is why capacity-expansion years can look mixed on a pure profit basis even when the long-term logic is sound.

## What to check in the numbers

- **Revenue per tonne** — whether volume growth is being achieved without heavy discounting
- **Operating cash flow vs. reported profit** — a widening gap can flag working-capital or FX-translation effects common for Nigerian industrials with import-linked input costs
- **Debt trend** — capacity expansion is typically debt-funded, so total debt and interest cover are worth tracking alongside revenue growth

Pulsights carries Dangote Cement's revenue, profit, operating cash flow, debt and dividend history on its company page — useful context before drawing conclusions from any single quarter.`,
    category: "ANALYSIS",
    tags: ["dangcem", "industrial-goods", "explainer"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    readMinutes: 5,
    companySymbol: "DANGCEM",
    daysAgo: 3,
  },
  {
    slug: "banking-sector-earnings-season-primer",
    title: "Banking-sector earnings season: a reader's primer",
    excerpt:
      "Tier-1 banks report on staggered timelines. Here's what the recurring line items — NIM, cost-of-risk, CAR — actually tell you.",
    content: `Nigeria's tier-1 banks — GTCO, Zenith Bank, UBA, Access Holdings, FBN Holdings and Stanbic IBTC among them — report results on staggered timelines throughout the year, and the same handful of line items tend to dominate the commentary each cycle.

## The line items that matter

**Net interest margin (NIM)** captures the spread between what a bank earns on loans/securities and what it pays on deposits and borrowings. In a rising-rate environment, NIM often expands first on the asset side before funding costs catch up.

**Cost-of-risk** is loan-loss provisioning as a share of the loan book. It's the number that tends to move the most in periods of currency volatility, since FX-denominated exposures can require sudden provisioning adjustments.

**Capital adequacy ratio (CAR)** is the regulatory buffer banks must hold against risk-weighted assets. Recapitalization cycles — like the one the Central Bank of Nigeria has pushed in recent years — directly target this number.

## Reading across banks, not just within one

Because tier-1 banks share the same macro backdrop, the more useful comparison is often relative: which bank is growing fee income fastest, which has the most non-performing-loan discipline, which is diluting shareholders least to meet capital requirements. Pulsights' Compare tool is built for exactly that — pick two to four banks and look at ROE, P/E and P/B side by side.`,
    category: "ANALYSIS",
    tags: ["banking", "earnings", "primer"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    featured: true,
    readMinutes: 6,
    daysAgo: 4,
  },
  {
    slug: "mtn-nigeria-data-revenue-trend",
    title: "MTN Nigeria: what to watch beyond the headline subscriber count",
    excerpt:
      "Subscriber growth gets the headlines, but data revenue mix and FX-linked cost lines usually explain more of the year-on-year swing.",
    content: `MTN Nigeria Communications remains the country's largest telecoms operator by subscriber base, but the subscriber number itself has become a less useful single metric for gauging the business than it once was.

## Why data-revenue mix matters more now

As voice revenue plateaus industry-wide, the more informative trend is the data segment's share of total service revenue and how average revenue per user (ARPU) trends across the base. A flat subscriber count paired with rising data ARPU can still mean a healthier quarter than headline growth in low-value connections.

## The FX line to watch

MTN Nigeria carries USD-linked obligations tied to network equipment and tower leases, which means naira depreciation shows up directly in cost lines even when operating performance is stable in local-currency terms. That's a recurring theme across Nigerian telecoms and one reason operating cash flow can diverge from reported profit in a volatile FX year.

Pulsights tracks MTN Nigeria's revenue, profit, EPS and dividend history alongside Airtel Africa for a same-sector comparison.`,
    category: "COMPANY_NEWS",
    tags: ["mtnn", "telecommunications"],
    authorName: "Pulsights Desk",
    authorRole: "Markets team",
    readMinutes: 4,
    companySymbol: "MTNN",
    daysAgo: 6,
  },
  {
    slug: "dividend-season-what-yield-actually-tells-you",
    title: "Dividend season: what yield actually tells you (and what it doesn't)",
    excerpt:
      "A high trailing yield can mean a generous payout policy — or a falling share price. Here's how to tell the difference before you chase it.",
    content: `Dividend yield is one of the most-quoted numbers in Nigerian equities coverage, and one of the easiest to misread. Because yield is simply the latest declared dividend per share divided by the current price, it can rise for two very different reasons: the company raised its payout, or the share price fell.

## Three questions worth asking before chasing a high yield

1. **Is the payout covered by earnings?** Compare dividend per share to EPS. A payout ratio consistently above 100% is unsustainable without either profit growth or balance-sheet strain.
2. **Is operating cash flow keeping pace with reported profit?** A company can show accounting profit while struggling to generate the cash needed to fund distributions.
3. **What moved — the dividend or the price?** A yield spike after a sharp price decline often reflects market concern about the business, not the payout getting more generous.

## Where Nigerian dividend policy differs

Several NGX-listed industrials and consumer-goods names — Dangote Cement, Nestle Nigeria, Nigerian Breweries among them — have historically paid out a high share of earnings, partly reflecting limited reinvestment need relative to cash generation. Banks, by contrast, balance dividends against regulatory capital requirements, which can mean more conservative payout ratios even in strong-earnings years.

Every company page on Pulsights includes a dividend-history chart going back through the tracked period — useful for spotting whether a payout has been consistent or lumpy before relying on trailing yield alone.`,
    category: "DIVIDENDS",
    tags: ["dividends", "yield", "explainer"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    readMinutes: 5,
    daysAgo: 8,
  },
  {
    slug: "seplat-energy-oil-gas-sector-watch",
    title: "Oil & gas on the NGX: why Seplat and Oando trade on different drivers",
    excerpt:
      "Both are NGX-listed energy names, but upstream production economics and downstream/trading exposure pull their numbers in different directions.",
    content: `Seplat Energy and Oando are both prominent NGX-listed names in the oil & gas sector, but they're exposed to meaningfully different parts of the value chain, which is why their numbers don't always move together even when Brent crude does.

## Upstream vs. downstream exposure

Seplat's business is weighted toward upstream production — oil and gas extraction — which means its revenue and profit are more directly linked to production volumes and realized crude/gas prices. Oando's footprint spans upstream, midstream and trading activity, giving it a different sensitivity profile, including working-capital dynamics tied to trading volumes that don't show up the same way in a pure-upstream producer's accounts.

## What tends to move these names

- Global benchmark crude prices (Brent) and Nigeria's realized differential to it
- Domestic gas supply commitments and any regulatory changes affecting royalty or fiscal terms
- Naira-denominated cost lines against dollar-denominated revenue — a currency mismatch that runs through most Nigerian energy names

Pulsights' Compare tool lets you put Seplat and Oando side by side across revenue, margin and valuation multiples in one view.`,
    category: "ANALYSIS",
    tags: ["oil-gas", "seplat", "oando"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    readMinutes: 5,
    companySymbol: "SEPLAT",
    daysAgo: 10,
  },
  {
    slug: "how-cscs-clearing-works-for-new-investors",
    title: "New to NGX investing? Here's how settlement actually works",
    excerpt:
      "CSCS accounts, T+2 settlement, and why your broker matters more on the NGX than it might on other exchanges you've used.",
    content: `If you're opening your first Nigerian brokerage account, a few mechanics are worth understanding before your first trade settles.

## The CSCS account

Every NGX trade settles through the Central Securities Clearing System (CSCS), which acts as the central depository for shares. Your broker opens a CSCS sub-account on your behalf when you onboard — this is what actually holds your shares, separate from any cash wallet the broker's app shows you.

## Settlement timing

NGX equities settle on a T+2 basis: a trade executed today typically settles two business days later. That matters if you're planning to sell shares shortly after buying — funds and shares aren't immediately transferable until settlement completes.

## Choosing a broker

Licensed NGX-registered stockbroking firms and CSCS-compliant retail investing apps both give you access to the exchange, but coverage and fee structures vary, and not every app supports every listed ticker. Pulsights' "How to buy" panel on each company page lists which routes are typically available for that stock — always confirm current coverage and fees directly with the broker before funding an account.

This is general information about how NGX settlement works, not a recommendation of any specific broker or investment.`,
    category: "MARKET_NEWS",
    tags: ["how-to", "cscs", "brokers"],
    authorName: "Pulsights Desk",
    authorRole: "Markets team",
    readMinutes: 4,
    daysAgo: 12,
  },
  {
    slug: "naira-fx-liquidity-and-equities",
    title: "How naira FX liquidity conditions show up in equity prices",
    excerpt:
      "Currency moves don't hit every NGX-listed sector the same way. A rough guide to which balance sheets are most exposed.",
    content: `Nigerian equities react to FX policy and liquidity conditions more directly than in many markets, because so many listed companies carry dollar-linked costs, debt, or input purchases against naira-denominated revenue.

## Who's most exposed

**Import-dependent consumer goods and industrials** — companies sourcing raw materials or equipment in dollars while selling in naira face margin compression when the currency weakens faster than they can raise prices.

**Telecoms with dollar-linked liabilities** — network equipment financing and tower-lease agreements are frequently dollar-denominated, so translation losses can show up in reported earnings even when the underlying operating business is healthy.

**Oil & gas producers** — often partially hedged by dollar-denominated revenue from crude sales, which can make them relatively more insulated than import-heavy sectors, though local cost lines still carry naira exposure.

**Banks** — carry both sides of the exposure: FX-denominated loans and deposits, revaluation gains or losses on net open positions, and regulatory capital ratios that are sensitive to FX-driven risk-weighted-asset changes.

## A framework, not a forecast

None of this is a prediction about where the naira goes next — it's a lens for reading why a currency move might affect one sector's reported numbers differently than another's the next time FX volatility hits the tape.`,
    category: "MACRO",
    tags: ["fx", "naira", "macro"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    featured: true,
    readMinutes: 6,
    daysAgo: 14,
  },
  {
    slug: "consumer-goods-input-costs-nestle-nb-guinness",
    title: "Consumer goods margins: Nestle, Nigerian Breweries and Guinness under one lens",
    excerpt:
      "Three FMCG names, three different exposure profiles to input costs, packaging, and consumer spending power.",
    content: `Nestle Nigeria, Nigerian Breweries and Guinness Nigeria all sit in the consumer goods sector on the NGX, and all three face a similar structural challenge: raw-material and packaging costs that are partly dollar-linked, sold into a naira-priced, price-sensitive consumer market.

## Where they differ

Nestle's portfolio skews toward food and nutrition staples with relatively inelastic demand, which can support pricing power even in tighter consumer-spending environments. Brewers — Nigerian Breweries and Guinness Nigeria — sell more discretionary products, making volumes more sensitive to disposable-income pressure, alongside excise-duty policy that applies specifically to alcoholic beverages.

## The metric worth tracking

Gross margin trend, read alongside revenue growth, tends to be more informative here than revenue alone: rising revenue with compressing margin usually signals a business absorbing cost inflation rather than pricing through it — worth checking against each company's operating cash flow to see how much is translating to distributable cash.

Each of these three companies' fundamentals — including multi-year revenue and profit trend charts — are on their individual Pulsights company pages.`,
    category: "ANALYSIS",
    tags: ["consumer-goods", "fmcg", "margins"],
    authorName: "Pulsights Desk",
    authorRole: "Research desk",
    readMinutes: 5,
    companySymbol: "NESTLE",
    daysAgo: 17,
  },
  {
    slug: "airtel-africa-pan-african-listing-explainer",
    title: "Airtel Africa's dual listing: what NGX investors should know",
    excerpt:
      "Airtel Africa trades on both the NGX and the London Stock Exchange. Here's why that matters for how its shares are priced and covered.",
    content: `Airtel Africa holds a dual listing on the Nigerian Exchange and the London Stock Exchange, which is relatively unusual among NGX-listed telecoms and shapes both its coverage and its price behavior.

## Why the dual listing matters

A London listing typically means a broader base of international institutional coverage and analyst estimates than a purely domestic listing would attract, and pricing can be influenced by flows and sentiment in both markets rather than NGX trading alone.

## Pan-African revenue mix

Unlike MTN Nigeria, which is Nigeria-focused, Airtel Africa's revenue is spread across multiple African markets. That diversifies single-country regulatory and currency risk, but introduces a different kind of complexity: reported results have to aggregate performance and FX translation across several currencies, not just the naira.

## What to compare it against

Airtel Africa and MTN Nigeria are the two most-covered NGX telecom names, but a direct comparison should account for the different revenue footprints — Airtel Africa's multi-country base versus MTN Nigeria's domestic concentration — before drawing conclusions from headline growth-rate differences.`,
    category: "COMPANY_NEWS",
    tags: ["airtelafri", "telecommunications", "listings"],
    authorName: "Pulsights Desk",
    authorRole: "Markets team",
    readMinutes: 4,
    companySymbol: "AIRTELAFRI",
    daysAgo: 20,
  },
  {
    slug: "reading-a-sector-breakdown-chart",
    title: "How to read a market-cap sector breakdown (and its blind spots)",
    excerpt:
      "Sector-weight charts are a useful first glance at a market — as long as you remember what they leave out.",
    content: `Pulsights' Markets page includes a sector breakdown showing how the Tracked-20 composite's combined market capitalization splits across banking, telecoms, industrials and the rest. It's a useful first-glance tool, with a few caveats worth keeping in mind.

## What it shows well

Market-cap weighting is a reasonable proxy for which sectors currently command the most investor capital among the tracked names, and shifts in sector share over time can reflect either price performance or new listings/delistings changing the composition.

## What it can't tell you

A sector's large weight doesn't mean every company in it is performing well — a single mega-cap name can dominate a sector's total market cap while smaller peers in the same sector tell a very different story. It's a composition view, not a performance view; pair it with the gainers/losers table for that.

## A note on the Tracked-20 composite itself

Pulsights tracks 20 NGX-listed companies — a meaningful but partial slice of the exchange's full list of 150+ listed companies. The Tracked-20 composite is an equal-weighted average of those 20, not the official NGX All-Share Index, and the two will diverge. We label this clearly rather than imply otherwise.`,
    category: "MARKET_NEWS",
    tags: ["explainer", "sectors", "tracked-20"],
    authorName: "Pulsights Desk",
    authorRole: "Markets team",
    readMinutes: 4,
    daysAgo: 23,
  },
];
