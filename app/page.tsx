import FilmGame from "@/components/FilmGame";
import { getCatalogue, getTodayIndex } from "@/lib/data/film";
import { todayLabelParis } from "@/lib/dates";
import { parseLocale, STRINGS } from "@/lib/i18n";

// Recalcul à chaque requête → le film change chaque jour sans re-déploiement.
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = parseLocale(lang);

  return (
    <FilmGame
      film={getCatalogue()[getTodayIndex()]}
      locale={locale}
      strings={STRINGS[locale]}
      dateLabel={todayLabelParis(locale)}
    />
  );
}
