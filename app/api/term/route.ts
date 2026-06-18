import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getTrmnlPayload } from "@/lib/data/trmnl";
import { parseLocale } from "@/lib/i18n";

/**
 * GET /api/term — payload TRMNL « film du jour en bahasa » (polling).
 *
 * 🔒 PROTÉGÉ par token : `Authorization: Bearer <TRMNL_API_TOKEN>` (env Vercel),
 * envoyé par le plugin via « polling headers ». Le contenu n'est pas sensible,
 * le token évite surtout l'abus de l'endpoint.
 *
 * `?lang=fr|en` : langue de la glose du vocabulaire (défaut fr).
 * Labels pré-formatés côté serveur (date Europe/Paris). Le template Liquid n'affiche.
 */
export const dynamic = "force-dynamic";

function tokenValid(authHeader: string | null): boolean {
  const expected = process.env.TRMNL_API_TOKEN;
  if (!expected) return false;
  const m = /^Bearer\s+(.+)$/i.exec(authHeader ?? "");
  if (!m) return false;
  const a = Buffer.from(m[1]);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!tokenValid(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const locale = parseLocale(new URL(req.url).searchParams.get("lang") ?? undefined);
  return NextResponse.json(getTrmnlPayload(locale));
}
