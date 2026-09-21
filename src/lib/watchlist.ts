"use client";

// Client-side only watchlist (localStorage), no auth/backend needed for v1.
// Exposed as a useSyncExternalStore-backed hook so components subscribe to
// the external store correctly instead of setState-in-effect.

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "pulsights:watchlist";
const CHANGE_EVENT = "pulsights:watchlist-changed";
const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedSnapshot: string[] = EMPTY;

function getSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cachedSnapshot = Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    cachedSnapshot = [];
  }
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function writeWatchlist(symbols: string[]) {
  try {
    const raw = JSON.stringify(symbols);
    window.localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedSnapshot = symbols;
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    // localStorage unavailable (private mode, etc.) — fail silently, v1 has no backend fallback.
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useWatchlist(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function isWatchlisted(symbol: string): boolean {
  return getSnapshot().includes(symbol);
}

export function toggleWatchlist(symbol: string): boolean {
  const current = getSnapshot();
  const isIn = current.includes(symbol);
  const next = isIn ? current.filter((s) => s !== symbol) : [...current, symbol];
  writeWatchlist(next);
  return !isIn;
}
