import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, LOCALE_COOKIE, pickLocale } from "@/lib/i18n/config";

// Nyelvi útválasztás: minden oldal /<nyelv>/… alatt él. Az előtag nélküli címeket a látogató nyelvére
// irányítjuk (korábbi választás → böngésző nyelve → angol). A QR-kódok rövid linkjei (/q/…) és az API
// kimarad a matcherből, azok nyelvfüggetlenek.

const YEAR = 60 * 60 * 24 * 365;

/** Az első, csak magyar nyelvű változat címei → az új, nyelvi előtagos útvonalak. */
const LEGACY: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^\/kezeles\/([^/]+)\/?$/, (m) => `/hu/manage/${m[1]}`],
  [/^\/kodjaim\/?$/, () => "/hu/my-codes"],
  [/^\/feltetelek\/?$/, () => "/hu/terms"],
  [/^\/fizetes\/demo\/([^/]+)\/?$/, (m) => `/hu/pay/demo/${m[1]}`],
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (hasLocale(first)) {
    const res = NextResponse.next();
    // A legutóbb használt nyelvet megjegyezzük (a /q/ átirányítás és a főoldal is ezt használja).
    if (req.cookies.get(LOCALE_COOKIE)?.value !== first) {
      res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: YEAR, sameSite: "lax" });
    }
    return res;
  }

  const url = req.nextUrl.clone();
  for (const [re, to] of LEGACY) {
    const m = pathname.match(re);
    if (m) {
      url.pathname = to(m);
      return NextResponse.redirect(url, 308);
    }
  }

  const lang = pickLocale(req.cookies.get(LOCALE_COOKIE)?.value, req.headers.get("accept-language"));
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Kimarad: API, a QR rövid linkjei, a Next belső fájljai és minden kiterjesztéses fájl (ikon, kép…).
  matcher: ["/((?!api/|q/|_next/|.*\\..*).*)"],
};
