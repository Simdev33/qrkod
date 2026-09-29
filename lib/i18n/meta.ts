import type { Metadata } from "next";
import { DEFAULT_LOCALE, localePath, LOCALES, type Locale } from "./config";

/** Kanonikus cím + hreflang-változatok egy adott oldalhoz (a path nyelvi előtag nélkül). */
export function alternates(lang: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(lang, path), languages };
}
