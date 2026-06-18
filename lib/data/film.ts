import { FILMS, type Film } from "@/lib/films";
import { parisDayNumber } from "@/lib/dates";

/**
 * Accesseur de données — frontière entre l'UI et la source.
 *
 * v1 : source = catalogue seed committé (`lib/films.ts`), rotation déterministe
 * par date Paris.
 * v2 : `getTodayFilm()` lira la ligne `bahasa_film_daily` du jour (générée par le
 * cron TMDB+LLM) via le client Supabase service role ; l'UI ne changera pas.
 */

export function getCatalogue(): Film[] {
  return FILMS;
}

/** Index du film du jour dans le catalogue (déterministe, Europe/Paris). */
export function getTodayIndex(): number {
  return parisDayNumber() % FILMS.length;
}

export function getTodayFilm(): Film {
  return FILMS[getTodayIndex()];
}
