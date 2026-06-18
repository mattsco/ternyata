export type Vocab = {
  word: string;
  /** Nature : "n." | "v." | "adj." … */
  pos: string;
  /** Glose par langue (l'écran/cours choisit selon le locale). */
  gloss: { fr: string; en: string };
};

export type Film = {
  /** Rang TSPDT si le film y figure (sinon non affiché). */
  rank?: number;
  title: string;
  director: string;
  year: number;
  country: string;
  /** Synopsis en bahasa indonesia, 3 lignes. */
  lines: string[];
  /** 3 mots de vocabulaire (affichés tels quels sur le TRMNL, passif). */
  vocab: Vocab[];
};

/**
 * Catalogue seed (v1). Films grand public (années 80–2010) — faciles à reconnaître,
 * synopsis bahasa fidèles écrits à la main pour éviter toute hallucination.
 * Le pipeline quotidien (tirage 1–1000 → TMDB → synopsis LLM) remplacera cette
 * source par une lecture de `bahasa_film_daily` (cf. lib/data/film.ts) — le type ne change pas.
 *
 * Un film par jour : la rotation est déterministe par date Paris (lib/data/film.ts).
 */
export const FILMS: Film[] = [
  { title: "The Matrix", director: "Lana & Lilly Wachowski", year: 1999, country: "USA", lines: [
    "Seorang peretas menemukan bahwa dunia hanyalah simulasi komputer.",
    "Manusia sebenarnya diperbudak oleh mesin sebagai sumber energi.",
    "Ia harus memilih: menerima kebenaran atau tetap dalam ilusi.",
  ], vocab: [
    { word: "peretas", pos: "n.", gloss: { fr: "hacker, pirate", en: "hacker" } },
    { word: "diperbudak", pos: "v.", gloss: { fr: "être réduit en esclavage", en: "to be enslaved" } },
    { word: "kebenaran", pos: "n.", gloss: { fr: "la vérité", en: "truth" } },
  ] },
  { title: "Mission: Impossible", director: "Brian De Palma", year: 1996, country: "USA", lines: [
    "Seorang agen rahasia dijebak dan dituduh mengkhianati timnya.",
    "Untuk membersihkan namanya, ia harus mencuri sebuah daftar rahasia.",
    "Setiap langkah penuh penyamaran, tipuan, dan misi yang mustahil.",
  ], vocab: [
    { word: "dijebak", pos: "v.", gloss: { fr: "être piégé", en: "to be framed" } },
    { word: "mengkhianati", pos: "v.", gloss: { fr: "trahir", en: "to betray" } },
    { word: "penyamaran", pos: "n.", gloss: { fr: "déguisement", en: "disguise" } },
  ] },
  { rank: 591, title: "The Lord of the Rings: The Fellowship of the Ring", director: "Peter Jackson", year: 2001, country: "Nouvelle-Zélande", lines: [
    "Seorang hobbit muda mewarisi sebuah cincin yang sangat berbahaya.",
    "Cincin itu harus dihancurkan agar penguasa kegelapan tak bangkit.",
    "Sembilan sekutu berangkat menempuh perjalanan yang penuh bahaya.",
  ], vocab: [
    { word: "mewarisi", pos: "v.", gloss: { fr: "hériter de", en: "to inherit" } },
    { word: "dihancurkan", pos: "v.", gloss: { fr: "être détruit", en: "to be destroyed" } },
    { word: "kegelapan", pos: "n.", gloss: { fr: "l'obscurité", en: "darkness" } },
  ] },
  { title: "Jurassic Park", director: "Steven Spielberg", year: 1993, country: "USA", lines: [
    "Seorang miliarder membangun taman berisi dinosaurus hasil kloning.",
    "Saat sistem keamanan gagal, para predator pun lepas berkeliaran.",
    "Beberapa tamu harus bertahan hidup di pulau yang mematikan.",
  ], vocab: [
    { word: "keamanan", pos: "n.", gloss: { fr: "la sécurité", en: "security" } },
    { word: "berkeliaran", pos: "v.", gloss: { fr: "rôder, errer", en: "to roam" } },
    { word: "mematikan", pos: "adj.", gloss: { fr: "mortel", en: "deadly" } },
  ] },
  { title: "Titanic", director: "James Cameron", year: 1997, country: "USA", lines: [
    "Seorang pelukis miskin dan gadis bangsawan jatuh cinta di atas kapal.",
    "Kapal megah itu diyakini tak mungkin tenggelam pada pelayaran perdananya.",
    "Namun sebuah gunung es mengubah malam itu menjadi bencana.",
  ], vocab: [
    { word: "pelukis", pos: "n.", gloss: { fr: "peintre", en: "painter" } },
    { word: "bangsawan", pos: "n.", gloss: { fr: "noble, aristocrate", en: "aristocrat" } },
    { word: "tenggelam", pos: "v.", gloss: { fr: "couler, sombrer", en: "to sink" } },
  ] },
  { title: "The Lion King", director: "Roger Allers & Rob Minkoff", year: 1994, country: "USA", lines: [
    "Seekor anak singa ditakdirkan menjadi raja padang sabana.",
    "Pamannya yang licik membunuh sang ayah dan merebut takhta.",
    "Setelah dewasa, ia kembali untuk merebut kembali kerajaannya.",
  ], vocab: [
    { word: "ditakdirkan", pos: "v.", gloss: { fr: "être destiné", en: "to be destined" } },
    { word: "licik", pos: "adj.", gloss: { fr: "rusé, sournois", en: "cunning" } },
    { word: "takhta", pos: "n.", gloss: { fr: "le trône", en: "throne" } },
  ] },
  { title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, country: "USA", lines: [
    "Seorang pria berhati tulus menjalani hidup yang luar biasa.",
    "Tanpa sengaja ia hadir di banyak peristiwa besar dalam sejarah.",
    "Seumur hidup, hatinya hanya tertuju pada satu wanita.",
  ], vocab: [
    { word: "tulus", pos: "adj.", gloss: { fr: "sincère", en: "sincere" } },
    { word: "peristiwa", pos: "n.", gloss: { fr: "événement", en: "event" } },
    { word: "tertuju", pos: "v.", gloss: { fr: "dirigé vers", en: "directed toward" } },
  ] },
  { title: "Back to the Future", director: "Robert Zemeckis", year: 1985, country: "USA", lines: [
    "Seorang remaja terlempar ke masa lalu oleh mobil mesin waktu.",
    "Ia tanpa sengaja mengganggu pertemuan kedua orang tuanya.",
    "Kini ia harus memperbaiki sejarah agar dirinya tetap ada.",
  ], vocab: [
    { word: "terlempar", pos: "v.", gloss: { fr: "être projeté", en: "to be flung" } },
    { word: "mengganggu", pos: "v.", gloss: { fr: "déranger, perturber", en: "to disturb" } },
    { word: "memperbaiki", pos: "v.", gloss: { fr: "réparer, corriger", en: "to fix" } },
  ] },
  { title: "Terminator 2: Judgment Day", director: "James Cameron", year: 1991, country: "USA", lines: [
    "Sebuah robot dari masa depan dikirim untuk melindungi seorang anak.",
    "Anak itu kelak akan memimpin perlawanan manusia melawan mesin.",
    "Robot lain yang jauh lebih canggih datang untuk membunuhnya.",
  ], vocab: [
    { word: "melindungi", pos: "v.", gloss: { fr: "protéger", en: "to protect" } },
    { word: "perlawanan", pos: "n.", gloss: { fr: "la résistance", en: "resistance" } },
    { word: "canggih", pos: "adj.", gloss: { fr: "sophistiqué, avancé", en: "advanced" } },
  ] },
  { rank: 205, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, country: "USA", lines: [
    "Dua pembunuh bayaran menjalani hari yang penuh kejadian aneh.",
    "Kisah mereka terjalin dengan seorang petinju dan istri bos mafia.",
    "Beberapa cerita saling bersilang dalam urutan yang tak biasa.",
  ], vocab: [
    { word: "pembunuh", pos: "n.", gloss: { fr: "tueur, meurtrier", en: "killer" } },
    { word: "terjalin", pos: "v.", gloss: { fr: "s'entremêler", en: "to intertwine" } },
    { word: "bersilang", pos: "v.", gloss: { fr: "se croiser", en: "to intersect" } },
  ] },
  { title: "Inception", director: "Christopher Nolan", year: 2010, country: "USA", lines: [
    "Seorang pencuri ahli masuk ke dalam mimpi untuk mencuri rahasia.",
    "Kali ini tugasnya terbalik: menanam sebuah gagasan di pikiran orang.",
    "Makin dalam mimpinya, makin kabur batas antara nyata dan khayal.",
  ], vocab: [
    { word: "pencuri", pos: "n.", gloss: { fr: "voleur", en: "thief" } },
    { word: "menanam", pos: "v.", gloss: { fr: "planter, implanter", en: "to plant" } },
    { word: "khayal", pos: "n.", gloss: { fr: "l'imaginaire, illusion", en: "fantasy" } },
  ] },
  { title: "The Dark Knight", director: "Christopher Nolan", year: 2008, country: "USA", lines: [
    "Seorang pahlawan bertopeng melindungi kotanya dari kejahatan.",
    "Musuh barunya, sang Joker, menebar kekacauan tanpa alasan jelas.",
    "Ia harus memilih antara keadilan dan citranya di mata publik.",
  ], vocab: [
    { word: "bertopeng", pos: "adj.", gloss: { fr: "masqué", en: "masked" } },
    { word: "kekacauan", pos: "n.", gloss: { fr: "le chaos", en: "chaos" } },
    { word: "keadilan", pos: "n.", gloss: { fr: "la justice", en: "justice" } },
  ] },
];
