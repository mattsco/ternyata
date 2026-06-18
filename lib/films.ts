export type Film = {
  /** Rang TSPDT si le film y figure (sinon non affiché). */
  rank?: number;
  title: string;
  director: string;
  year: number;
  country: string;
  /** Synopsis en bahasa indonesia, 3 lignes. */
  lines: string[];
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
  ] },
  { title: "Mission: Impossible", director: "Brian De Palma", year: 1996, country: "USA", lines: [
    "Seorang agen rahasia dijebak dan dituduh mengkhianati timnya.",
    "Untuk membersihkan namanya, ia harus mencuri sebuah daftar rahasia.",
    "Setiap langkah penuh penyamaran, tipuan, dan misi yang mustahil.",
  ] },
  { rank: 591, title: "The Lord of the Rings: The Fellowship of the Ring", director: "Peter Jackson", year: 2001, country: "Nouvelle-Zélande", lines: [
    "Seorang hobbit muda mewarisi sebuah cincin yang sangat berbahaya.",
    "Cincin itu harus dihancurkan agar penguasa kegelapan tak bangkit.",
    "Sembilan sekutu berangkat menempuh perjalanan yang penuh bahaya.",
  ] },
  { title: "Jurassic Park", director: "Steven Spielberg", year: 1993, country: "USA", lines: [
    "Seorang miliarder membangun taman berisi dinosaurus hasil kloning.",
    "Saat sistem keamanan gagal, para predator pun lepas berkeliaran.",
    "Beberapa tamu harus bertahan hidup di pulau yang mematikan.",
  ] },
  { title: "Titanic", director: "James Cameron", year: 1997, country: "USA", lines: [
    "Seorang pelukis miskin dan gadis bangsawan jatuh cinta di atas kapal.",
    "Kapal megah itu diyakini tak mungkin tenggelam pada pelayaran perdananya.",
    "Namun sebuah gunung es mengubah malam itu menjadi bencana.",
  ] },
  { title: "The Lion King", director: "Roger Allers & Rob Minkoff", year: 1994, country: "USA", lines: [
    "Seekor anak singa ditakdirkan menjadi raja padang sabana.",
    "Pamannya yang licik membunuh sang ayah dan merebut takhta.",
    "Setelah dewasa, ia kembali untuk merebut kembali kerajaannya.",
  ] },
  { title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, country: "USA", lines: [
    "Seorang pria berhati tulus menjalani hidup yang luar biasa.",
    "Tanpa sengaja ia hadir di banyak peristiwa besar dalam sejarah.",
    "Seumur hidup, hatinya hanya tertuju pada satu wanita.",
  ] },
  { title: "Back to the Future", director: "Robert Zemeckis", year: 1985, country: "USA", lines: [
    "Seorang remaja terlempar ke masa lalu oleh mobil mesin waktu.",
    "Ia tanpa sengaja mengganggu pertemuan kedua orang tuanya.",
    "Kini ia harus memperbaiki sejarah agar dirinya tetap ada.",
  ] },
  { title: "Terminator 2: Judgment Day", director: "James Cameron", year: 1991, country: "USA", lines: [
    "Sebuah robot dari masa depan dikirim untuk melindungi seorang anak.",
    "Anak itu kelak akan memimpin perlawanan manusia melawan mesin.",
    "Robot lain yang jauh lebih canggih datang untuk membunuhnya.",
  ] },
  { rank: 205, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, country: "USA", lines: [
    "Dua pembunuh bayaran menjalani hari yang penuh kejadian aneh.",
    "Kisah mereka terjalin dengan seorang petinju dan istri bos mafia.",
    "Beberapa cerita saling bersilang dalam urutan yang tak biasa.",
  ] },
  { title: "Inception", director: "Christopher Nolan", year: 2010, country: "USA", lines: [
    "Seorang pencuri ahli masuk ke dalam mimpi untuk mencuri rahasia.",
    "Kali ini tugasnya terbalik: menanam sebuah gagasan di pikiran orang.",
    "Makin dalam mimpinya, makin kabur batas antara nyata dan khayal.",
  ] },
  { title: "The Dark Knight", director: "Christopher Nolan", year: 2008, country: "USA", lines: [
    "Seorang pahlawan bertopeng melindungi kotanya dari kejahatan.",
    "Musuh barunya, sang Joker, menebar kekacauan tanpa alasan jelas.",
    "Ia harus memilih antara keadilan dan citranya di mata publik.",
  ] },
];
