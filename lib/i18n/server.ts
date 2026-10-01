import "server-only";
import type { Locale } from "./config";
import de from "./dictionaries/de";
import en, { type Dictionary } from "./dictionaries/en";
import es from "./dictionaries/es";
import fr from "./dictionaries/fr";
import hu from "./dictionaries/hu";
import { legalDe } from "./legal/de";
import { legalEn } from "./legal/en";
import { legalEs } from "./legal/es";
import { legalFr } from "./legal/fr";
import { legalHu } from "./legal/hu";
import type { LegalTexts } from "./legal/types";
import { fill, priceVars, type Vars } from "./format";
import { brand } from "@/lib/site";

const DICTIONARIES: Record<Locale, Dictionary> = { en, hu, de, fr, es };
const LEGAL: Record<Locale, LegalTexts> = { en: legalEn, hu: legalHu, de: legalDe, fr: legalFr, es: legalEs };

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang];

/** A dictionary text with the brand and the prices filled in (for metadata and other server texts). */
export const fillText = (lang: Locale, template: string, vars: Vars = {}) =>
  fill(template, { brand: brand.name, ...priceVars(lang), ...vars });
export const getLegal = (lang: Locale): LegalTexts => LEGAL[lang];
