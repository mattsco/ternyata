export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

export function parseLocale(v: string | undefined): Locale {
  return v === "en" ? "en" : "fr";
}

/** Locale → tag BCP-47 pour Intl (dates, etc.). */
export const BCP47: Record<Locale, string> = { fr: "fr-FR", en: "en-GB" };

type Strings = {
  tagline: string;
  instruction: string;
  answerLabel: string;
  reveal: string;
  wordsUnit: string;
  clear: string;
  generate: string;
  modalTitle: string;
  modalHelp: string;
  copy: string;
  openClaude: string;
  openChatGPT: string;
  close: string;
  copied: string;
};

export const STRINGS: Record<Locale, Strings> = {
  fr: {
    tagline: "le film du jour, en bahasa",
    instruction: "Lis le synopsis. Devine le film. Sélectionne les mots à comprendre.",
    answerLabel: "réponse",
    reveal: "décrypter",
    wordsUnit: "mot(s) sélectionné(s)",
    clear: "effacer",
    generate: "générer le cours",
    modalTitle: "ton mini-cours",
    modalHelp: "Copie ce prompt dans Claude ou ChatGPT — ou ouvre-le directement.",
    copy: "copier",
    openClaude: "ouvrir dans Claude",
    openChatGPT: "ouvrir dans ChatGPT",
    close: "fermer",
    copied: "copié ✓",
  },
  en: {
    tagline: "today's film, in bahasa",
    instruction: "Read the synopsis. Guess the film. Select the words you want to learn.",
    answerLabel: "answer",
    reveal: "decrypt",
    wordsUnit: "word(s) selected",
    clear: "clear",
    generate: "build the lesson",
    modalTitle: "your mini-lesson",
    modalHelp: "Copy this prompt into Claude or ChatGPT — or open it directly.",
    copy: "copy",
    openClaude: "open in Claude",
    openChatGPT: "open in ChatGPT",
    close: "close",
    copied: "copied ✓",
  },
};

/** Construit le prompt de cours, dans la langue cible (gloss = langue du locale). */
export function buildPrompt(locale: Locale, context: string, words: string[]): string {
  if (locale === "en") {
    return [
      "I'm learning Indonesian (bahasa indonesia). Here is a film synopsis in Indonesian:",
      "",
      `"${context}"`,
      "",
      `Explain these words in context: ${words.join(", ")}.`,
      "",
      "For each word, give:",
      "- the English translation,",
      "- the part of speech,",
      "- the root word and any affixes (prefix/suffix),",
      "- a short example sentence in bahasa with its translation.",
      "",
      "Keep it concise, like a vocabulary card.",
    ].join("\n");
  }
  return [
    "Je suis en train d'apprendre le bahasa indonesia. Voici un synopsis de film en indonésien :",
    "",
    `"${context}"`,
    "",
    `Explique-moi ces mots dans leur contexte : ${words.join(", ")}.`,
    "",
    "Pour chaque mot, donne :",
    "- la traduction en français,",
    "- la nature grammaticale,",
    "- le mot-racine et ses affixes éventuels (préfixe/suffixe),",
    "- une courte phrase d'exemple en bahasa avec sa traduction.",
    "",
    "Réponds de façon concise, comme une petite fiche de vocabulaire.",
  ].join("\n");
}
