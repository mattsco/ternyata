# Ternyata

Version web du screen TRMNL « Film du jour en bahasa ». Une page, ouverte au double-clic — pas de build, pas de serveur.

## Principe
Chaque jour, le synopsis d'un film (liste TSPDT « Greatest Films ») s'affiche en **bahasa indonesia**. Le nom du film est **masqué** : on devine d'abord, on révèle ensuite. Tous les mots sont **sélectionnables** ; les mots choisis construisent un prompt « explique-moi ces mots… » qu'on copie ou ouvre dans Claude / ChatGPT pour un mini-cours de vocabulaire.

## Fichiers
- `index.html` — la page (contenu + interactivité, tout-en-un).
- `docs/` — documentation TRMNL :
  - `trmnl-bahasa-film.md` — spec de l'écran TRMNL bahasa (la source de ce projet).
  - `trmnl-sejour-display.md` — spec de l'écran « séjour » (conventions device/token/Liquid).
  - `trmnl-plugin-guide.md` — guide plugin TRMNL.

## État (v1)
- Contenu **seed** : ~14 films canoniques, synopsis bahasa fidèles écrits à la main.
- Rotation **déterministe par date** (Europe/Paris) ; lien « Un autre film » pour s'entraîner.
- Génération du cours = **prompt copié / ouverture d'une IA** (zéro backend, zéro clé).

## À brancher plus tard
Le vrai pipeline quotidien (tirage 1–1000 → TMDB → synopsis LLM) vit côté kerbrise (cf. `docs/trmnl-bahasa-film.md`). Quand il existera, cette page lira son endpoint au lieu du contenu seed — le format `{title, director, year, country, lines[]}` est déjà aligné.
# ternyata
