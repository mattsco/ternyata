# Plugin TRMNL — ternyata (film du jour en bahasa)

Affiche le synopsis du jour en bahasa indonesia + 3 mots de vocabulaire, à partir
du payload `/api/term` (stratégie **polling**). La réponse (titre du film) est en
bas, dans la `title_bar` : on lit le synopsis, on devine, on vérifie.

## Structure (projet `trmnlp`)
```
trmnl-plugin/
├── .trmnlp.yml        # config du serveur de dev local (fixtures, non uploadé)
├── src/
│   ├── full.liquid    # markup de l'écran plein (source de vérité)
│   └── settings.yml   # définition du plugin (uploadé par `trmnlp push`)
└── README.md
```

## Dev local (live reload)
```bash
gem install trmnl_preview      # ou Docker : trmnl/trmnlp serve
cd trmnl-plugin
trmnlp serve                   # http://localhost:4567
```
En local, le serveur rend `full.liquid` avec les fixtures de `.trmnlp.yml`.
En prod, `trmnlp serve` peut fetch la vraie `polling_url` (endpoint public, pas de token).

## Mise en service
1. Déployer ternyata sur Vercel.
2. Dans `settings.yml`, remplacer `polling_url` par le vrai domaine (`https://<domaine>/api/term`).
   Glose en anglais : `…/api/term?lang=en`.
3. Créer le plugin privé sur TRMNL (`trmnlp push` ou éditeur web).
4. Ajouter le plugin à la playlist du device.

L'endpoint `/api/term` est **public** (contenu non sensible) : aucun token à configurer.

## Contrat de données (`/api/term`, racine)
`generated_at_label`, `film_date_label`, `film {title, director, year, country}`,
`synopsis_lines[3]`, `vocab[3] {word, pos, gloss}`.
⚠️ Renommer une clé = écran cassé en silence (pas de compilateur Liquid).
