import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, LOCALE_COOKIE, pickLocale } from "@/lib/i18n/config";

// English is the main language and lives at the root without a prefix; the pages are served from /en/…
// internally.
// - /en and /en/… → permanent redirect to the address without the prefix;
// - /hu, /de, /fr, /es → as they are;
// - / → on the first visit, the browser’s language (the language switcher’s cookie wins);
// - the first, Hungarian-only version’s addresses (/kezeles/…, /kodjaim…) → their Hungarian pages;
// - every other address without a prefix is English.
// The QR short links (/q/…) and the API are not touched (see the matcher).

const LEGACY: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^\/kezeles\/([^/]+)\/?$/, (m) => `/hu/manage/${m[1]}`],
  [/^\/kodjaim\/?$/, () => "/hu/my-codes"],
  [/^\/feltetelek\/?$/, () => "/hu/terms"],
];

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(first)) return NextResponse.next();

  for (const [re, to] of LEGACY) {
    const m = pathname.match(re);
    if (m) {
      url.pathname = to(m);
      return NextResponse.redirect(url, 308);
    }
  }

  if (pathname === "/") {
    const wanted = pickLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get("accept-language"));
    if (wanted !== DEFAULT_LOCALE) {
      url.pathname = `/${wanted}`;
      const response = NextResponse.redirect(url, 307);
      response.headers.set("Vary", "Accept-Language, Cookie");
      return response;
    }
  }

  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Not touched: API, the QR short links, Next.js internals and every file with an extension (icons, images…).
  matcher: ["/((?!api/|q/|_next/|.*\\..*).*)"],
};
