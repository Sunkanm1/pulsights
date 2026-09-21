import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/stocks", label: "Stocks" },
  { href: "/compare", label: "Compare" },
  { href: "/watchlist", label: "Watchlist" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-sm font-bold text-slate-950">
            P
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-50">Pulsights</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-slate-50 sm:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
