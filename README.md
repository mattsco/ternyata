# Ternyata

Version web du screen TRMNL « Film du jour en bahasa ». Même stack que kerbrise : **Next.js 16 / React 19 / Tailwind / Supabase**, déployable sur Vercel.

## Principe
Chaque jour, **un** film s'affiche : son synopsis en **bahasa indonesia**, le nom **masqué** (on devine, puis on décrypte). Tous les mots sont **sélectionnables** ; les mots choisis construisent un prompt « explique-moi ces mots… » qu'on copie ou ouvre dans Claude / ChatGPT pour un mini-cours de vocabulaire.

Bilingue : interface FR par défaut, EN via `?lang=en` (le gloss du cours suit la langue). Pratique pour partager avec un prof anglophone.

Design : terminal e-ink « old school » / phosphore vert, monospace, scanlines CRT.

## Lancer
```bash
npm install
npm run dev      # http://localhost:3000
```
Aucune variable d'environnement n'est requise en v1 (contenu seed). Voir `.env.local.example` pour le pipeline v2.

## Structure
```
app/
  page.tsx              Server Component — calcule le film du jour, rend le jeu
  layout.tsx, globals.css
components/
  FilmGame.tsx          Client Component — sélection de mots, révélation, prompt
lib/
  films.ts              Catalogue seed (type Film) — synopsis bahasa écrits à la main
  dates.ts              parisDayNumber / todayLabelParis (déterminisme par date Paris)
  data/film.ts          Accesseur : seed en v1, basculera vers Supabase en v2
  supabase/             client / server / service (conventions kerbrise)
  api/term/route.ts     Endpoint TRMNL (token) — payload du jour, ?lang=fr|en
lib/
  data/trmnl.ts         Builder du payload TRMNL (labels formatés côté serveur)
db/migrations/
  0001_bahasa_film_daily.sql   Schéma du pipeline quotidien (prêt, non câblé)
trmnl-plugin/           Plugin TRMNL (settings.yml + full.liquid + dev trmnlp)
docs/                   Spec TRMNL bahasa + docs TRMNL kerbrise
```

## Deux surfaces, une source
Le web (`app/page.tsx`) et le TRMNL (`app/api/term` + `trmnl-plugin/`) lisent le même `lib/data/film.ts`. Le web est interactif (mots cliquables) ; le TRMNL est passif (3 mots de vocabulaire pré-affichés, réponse en bas).

## État
- **v1 (actuel)** : contenu seed (~14 films canoniques), rotation déterministe par date, génération du cours = prompt copié / ouverture d'une IA (zéro backend, zéro clé). Supabase scaffoldé mais non utilisé.
- **v2 (à venir)** : pipeline quotidien côté cron Vercel — tirage 1–1000 → résolution TMDB → synopsis LLM → upsert `bahasa_film_daily`. `getTodayFilm()` lira alors la DB sans toucher l'UI. Détails : `docs/trmnl-bahasa-film.md`.
