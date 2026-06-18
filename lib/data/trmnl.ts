import { getCatalogue, getTodayIndex } from "@/lib/data/film";
import { BCP47, type Locale } from "@/lib/i18n";

const TZ = "Europe/Paris";

function fmt(locale: Locale, opts: Intl.DateTimeFormatOptions, d = new Date()): string {
  return new Intl.DateTimeFormat(BCP47[locale], { timeZone: TZ, ...opts }).format(d);
}

export type TrmnlPayload = {
  generated_at_label: string;
  film_date_label: string;
  film: { title: string; director: string; year: number; country: string };
  synopsis_lines: string[];
  vocab: { word: string; pos: string; gloss: string }[];
};

/**
 * Payload servi au plugin TRMNL (polling, clés à la racine).
 * Le serveur formate tous les libellés ; le template Liquid n'affiche.
 * `locale` ne change que la glose du vocabulaire et les libellés de date.
 */
export function getTrmnlPayload(locale: Locale): TrmnlPayload {
  const film = getCatalogue()[getTodayIndex()];
  const dateLabel = fmt(locale, { weekday: "short", day: "numeric", month: "short" });
  const timeLabel = fmt(locale, { hour: "2-digit", minute: "2-digit" });

  return {
    generated_at_label: `${dateLabel} · ${timeLabel}`,
    film_date_label: dateLabel,
    film: {
      title: film.title,
      director: film.director,
      year: film.year,
      country: film.country,
    },
    synopsis_lines: film.lines,
    vocab: film.vocab.map((v) => ({
      word: v.word,
      pos: v.pos,
      gloss: v.gloss[locale],
    })),
  };
}
