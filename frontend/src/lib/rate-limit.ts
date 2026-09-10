import { NextResponse } from "next/server";

interface RateLimitOptions {
  limit: number;
  window: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [, store] of stores) {
      for (const [key, entry] of store) {
        entry.timestamps = entry.timestamps.filter((t) => now - t < 3600_000);
        if (entry.timestamps.length === 0) store.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
  if (
    cleanupTimer &&
    typeof cleanupTimer === "object" &&
    "unref" in cleanupTimer
  ) {
    cleanupTimer.unref();
  }
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return "127.0.0.1";
}

export function rateLimit({ limit, window: windowSec }: RateLimitOptions) {
  const storeKey = `${limit}:${windowSec}:${Math.random()}`;
  const store = new Map<string, RateLimitEntry>();
  stores.set(storeKey, store);
  startCleanup();

  return function check(req: Request): NextResponse | null {
    const ip = getClientIp(req);
    const now = Date.now();
    const windowMs = windowSec * 1000;

    let entry = store.get(ip);
    if (!entry) {
      entry = { timestamps: [] };
      store.set(ip, entry);
    }

    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

    if (entry.timestamps.length >= limit) {
      const oldestInWindow = entry.timestamps[0];
      const resetAt = oldestInWindow + windowMs;
      const retryAfter = Math.ceil((resetAt - now) / 1000);

      const msg = `Too many requests. Please try again in ${formatRetryDelay(retryAfter)}.`;
      return NextResponse.json(
        {
          success: false,
          error: msg,
          message: msg,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
          },
        },
      );
    }

    entry.timestamps.push(now);

    return null;
  };
}

function formatRetryDelay(totalSeconds: number): string {
  if (totalSeconds <= 0) return "a moment";
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  return parts.join(", ");
}
