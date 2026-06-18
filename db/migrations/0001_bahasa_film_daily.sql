-- Pipeline quotidien (v2) — NON câblé en v1 (le site lit le catalogue seed).
-- Le cron (tirage 1–1000 → TMDB → synopsis LLM) fera UPSERT d'une ligne/jour ;
-- l'endpoint de lecture servira la ligne du jour (ou la dernière disponible).
-- Clé = date Europe/Paris (cf. lib/dates.ts ; piège UTC documenté dans la spec).

create table if not exists bahasa_film_daily (
  date_paris      date primary key,
  rank            int  not null check (rank between 1 and 1000),
  title           text not null,
  director        text not null,
  year            int  not null,
  country         text not null,
  synopsis_lines  jsonb not null,   -- string[3]
  vocab           jsonb,            -- optionnel (la version web laisse l'utilisateur choisir ses mots)
  source          text not null default 'tmdb',  -- 'tmdb' | 'allocine' | 'none'
  status          text not null default 'ok',    -- 'ok' | 'degraded'
  created_at      timestamptz not null default now()
);

-- Historique des rangs déjà servis (tirage sans remise — cf. spec D4).
create table if not exists bahasa_seen_ranks (
  rank       int primary key check (rank between 1 and 1000),
  seen_on    date not null
);

-- Lecture publique en RLS : aucune donnée sensible (contrairement à kerbrise).
alter table bahasa_film_daily enable row level security;
create policy "lecture publique" on bahasa_film_daily for select using (true);
-- Écriture réservée au service role (bypass RLS) depuis le cron.
