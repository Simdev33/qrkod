import "server-only";
import { headers } from "next/headers";
import { configuredOrigin } from "@/lib/site";

// A QR-kódba írt rövid link alapcíme. Vercelen mindig a projekt éles domainje (így egy előnézeti
// deployon készült kód is az éles címre mutat), helyben a kérés hosztja — így a helyi hálón
// telefonnal is beolvasható.

const fromEnv = configuredOrigin;

function fromHeaders(h: Headers) {
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3244";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || /^[\d.:]+$/.test(host) ? "http" : "https");
  return `${proto.split(",")[0].trim()}://${host.split(",")[0].trim()}`;
}

export const originOf = (req: Request) => fromEnv() || fromHeaders(req.headers);

export async function currentOrigin() {
  return fromEnv() || fromHeaders(await headers());
}

/** A kérés kiszolgálásának időpontja (külön függvényben, hogy a komponens teste tiszta maradjon). */
export const requestTime = () => Date.now();

export const shortLink = (origin: string, id: string) => `${origin}/q/${id}`;

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "helyi";
}
