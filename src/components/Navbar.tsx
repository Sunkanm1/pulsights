"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, TrendingUp, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/markets", label: "Markets" },
  { href: "/stocks", label: "Stocks" },
  { href: "/compare", label: "Compare" },
  { href: "/watchlist", label: "Watchlist" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-ink">
            <TrendingUp className="h-4.5 w-4.5" strokeWidth={2.5} />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-ink">Pulsights</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
                {active && <span className="absolute -bottom-[13px] left-3 right-3 h-0.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink-muted hover:text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-2 md:hidden">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-2 py-2.5 text-sm font-medium ${
                  active ? "text-accent" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
