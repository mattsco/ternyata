import { BCP47, type Locale } from "@/lib/i18n";

const TZ = "Europe/Paris";

/**
 * Numéro de jour absolu en heure de Paris (jours depuis l'époque Unix).
 * Graine déterministe : un même jour civil → un même film, partout.
 * Évite le piège `toISOString().slice(0,10)` (date UTC en retard le soir).
 */
export function parisDayNumber(d: Date = new Date()): number {
  const paris = new Date(d.toLocaleString("en-US", { timeZone: TZ }));
  return Math.floor(
    Date.UTC(paris.getFullYear(), paris.getMonth(), paris.getDate()) / 86400000
  );
}

/** Libellé de date (ex. « jeudi 18 juin »), localisé, en Europe/Paris. */
export function todayLabelParis(locale: Locale = "fr", d: Date = new Date()): string {
  return new Intl.DateTimeFormat(BCP47[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(d);
}
