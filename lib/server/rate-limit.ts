import "server-only";

// A simple in-memory limit (per server instance) – enough to slow down abuse of the payment endpoints.
const g = globalThis as unknown as { __qrLimits?: Map<string, number[]> };
const hits: Map<string, number[]> = (g.__qrLimits ??= new Map());

export function limited(key: string, max: number, windowMs: number, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}
