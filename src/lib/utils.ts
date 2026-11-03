// ============================================================
// Utility helpers
// ============================================================
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pick a random element from an array */
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick a random element that isn't the same as the last one */
export function pickRandomExcluding<T>(arr: T[], exclude: T): T {
  if (arr.length === 1) return arr[0];
  const filtered = arr.filter((x) => x !== exclude);
  return pickRandom(filtered);
}

/** Shuffle an array (Fisher-Yates) */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Format a percentage (0-100) */
export function formatPercent(n: number): string {
  return `${Math.round(n)}%`;
}

/** Clamp a number between min and max */
export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Generate a simple session ID */
export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Persist data to localStorage safely */
export function safeLocalSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

/** Read data from localStorage safely */
export function safeLocalGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Remove data from localStorage safely */
export function safeLocalRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
}

/** Check if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Simple sleep */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Pluralise helper */
export function plural(n: number, singular: string, plural: string): string {
  return n === 1 ? singular : plural;
}
