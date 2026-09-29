import "server-only";
import type { Locale } from "./config";
import de from "./dictionaries/de";
import en from "./dictionaries/en";
import es from "./dictionaries/es";
import fr from "./dictionaries/fr";
import hu, { type Dictionary } from "./dictionaries/hu";
import { legalDe } from "./legal/de";
import { legalEn } from "./legal/en";
import { legalEs } from "./legal/es";
import { legalFr } from "./legal/fr";
import { legalHu } from "./legal/hu";
import type { LegalTexts } from "./legal/types";

const DICTIONARIES: Record<Locale, Dictionary> = { hu, en, de, fr, es };
const LEGAL: Record<Locale, LegalTexts> = { hu: legalHu, en: legalEn, de: legalDe, fr: legalFr, es: legalEs };

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang];
export const getLegal = (lang: Locale): LegalTexts => LEGAL[lang];
