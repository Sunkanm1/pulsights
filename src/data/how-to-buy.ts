// "How to buy this stock" directory content. Two honest categories, not a
// ranked top-5 listicle — see AGENTS brief. Domains point at each firm's
// homepage (not a specific signup deep-link, since those change); verify
// the current signup flow on the firm's own site before acting.

export type HowToBuyEntry = {
  name: string;
  description: string;
  url: string;
  cscsCompliant: "yes" | "verify";
};

export const licensedBrokers: HowToBuyEntry[] = [
  {
    name: "Meristem Securities",
    description: "Full-service NGX dealing member with an online trading portal and research desk.",
    url: "https://meristemng.com",
    cscsCompliant: "yes",
  },
  {
    name: "CardinalStone Securities",
    description: "NGX-licensed stockbroker offering brokerage, research and wealth management.",
    url: "https://cardinalstone.com",
    cscsCompliant: "yes",
  },
  {
    name: "United Capital Securities",
    description: "Investment banking group with a retail brokerage arm and online trading app.",
    url: "https://unitedcapitalplcgroup.com",
    cscsCompliant: "yes",
  },
  {
    name: "Chapel Hill Denham",
    description: "Investment bank with brokerage services for institutional and high-net-worth retail clients.",
    url: "https://chapelhilldenham.com",
    cscsCompliant: "yes",
  },
  {
    name: "Stanbic IBTC Stockbrokers",
    description: "Brokerage arm of Stanbic IBTC, with an online trading platform tied to your Stanbic account.",
    url: "https://www.stanbicibtcstockbrokers.com",
    cscsCompliant: "yes",
  },
  {
    name: "Coronation Securities",
    description: "Brokerage arm of Coronation Group, serving retail and institutional NGX investors.",
    url: "https://coronationgroup.com",
    cscsCompliant: "yes",
  },
  {
    name: "Afrinvest Securities",
    description: "Brokerage and research arm of Afrinvest, a long-running Nigerian investment bank.",
    url: "https://afrinvest.com",
    cscsCompliant: "yes",
  },
  {
    name: "Vetiva Securities",
    description: "Brokerage arm of Vetiva Capital Management with an online trading platform.",
    url: "https://vetiva.com",
    cscsCompliant: "yes",
  },
];

export const retailApps: HowToBuyEntry[] = [
  {
    name: "Chaka",
    description: "Nigerian investing app offering direct access to NGX-listed stocks alongside global markets.",
    url: "https://chaka.com",
    cscsCompliant: "yes",
  },
  {
    name: "Trove",
    description: "Investing app that added direct NGX stock trading alongside its original US-stocks offering — confirm the specific ticker is listed in-app before assuming coverage.",
    url: "https://trove.finance",
    cscsCompliant: "verify",
  },
  {
    name: "InvestNaija (Access Bank)",
    description: "Access Bank's retail investing app for Nigerian mutual funds and NGX stocks, tied to an Access Bank account.",
    url: "https://myinvestnaija.com",
    cscsCompliant: "yes",
  },
  {
    name: "Zedcrest Wealth",
    description: "Digital wealth platform from Zedcrest Capital offering NGX stock trading and fixed income.",
    url: "https://zedcrestwealth.com",
    cscsCompliant: "yes",
  },
];

export const howToBuyIntro =
  "To hold NGX-listed shares in your own name, you need a CSCS (Central Securities Clearing System) account — Nigeria's central securities depository requires one regardless of which broker or app you use. Most of the options below open one for you as part of sign-up.";
