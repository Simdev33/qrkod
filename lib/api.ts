import type { CodeView } from "./types";

/** JSON-kérés a saját API-nkhoz; hibánál a szerver magyar hibaüzenetével dob. */
export async function api<T = { code: CodeView }>(path: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // üres válasz
  }
  if (!res.ok) {
    const msg = (json as { error?: string } | null)?.error;
    throw new Error(msg || "Valami hiba történt. Próbáld újra.");
  }
  return json as T;
}
