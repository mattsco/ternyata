import { NextResponse } from "next/server";
import { getTrmnlPayload } from "@/lib/data/trmnl";
import { parseLocale } from "@/lib/i18n";

/**
 * GET /api/term — payload TRMNL « film du jour en bahasa » (polling).
 *
 * Endpoint PUBLIC : le contenu n'est pas sensible (un synopsis + du vocabulaire),
 * pas de token. Contrepartie assumée : n'importe qui peut poller l'URL.
 *
 * `?lang=fr|en` : langue de la glose du vocabulaire (défaut fr).
 * Labels pré-formatés côté serveur (date Europe/Paris). Le template Liquid n'affiche.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const locale = parseLocale(new URL(req.url).searchParams.get("lang") ?? undefined);
  return NextResponse.json(getTrmnlPayload(locale));
}
