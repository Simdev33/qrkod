import type { CodeView } from "./types";

/** API-hiba: a `code` a szótár errors-kulcsa (a felület a látogató nyelvén jeleníti meg). */
export class ApiError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

/** JSON-kérés a saját API-nkhoz; hibánál ApiError-t dob a szerver hibakódjával. */
export async function api<T = { code: CodeView }>(path: string, method: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("network");
  }
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // üres válasz
  }
  if (!res.ok) throw new ApiError((json as { error?: string } | null)?.error || "generic");
  return json as T;
}

/** Bármilyen elkapott hibából szótárkulcs. */
export const errorCode = (err: unknown) => (err instanceof ApiError ? err.code : err instanceof Error ? err.message : "generic");
