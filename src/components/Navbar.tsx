"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/stocks", label: "Stocks" },
  { href: "/compare", label: "Compare" },
  { href: "/watchlist", label: "Watchlist" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-amber-400">
            P
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Pulsights</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-2.5 py-1.5 text-sm font-medium transition sm:px-3 ${
                  active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
                {active && <span className="absolute -bottom-[13px] left-2.5 right-2.5 h-0.5 rounded-full bg-amber-600 sm:left-3 sm:right-3" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
