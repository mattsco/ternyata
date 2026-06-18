"use client";

import { useMemo, useState } from "react";
import type { Film } from "@/lib/films";
import { buildPrompt, STRINGS, type Locale } from "@/lib/i18n";

type Strings = (typeof STRINGS)[Locale];

type Token =
  | { type: "sp"; text: string }
  | { type: "w"; pre: string; core: string; post: string };

function tokenize(line: string): Token[] {
  return line.split(/(\s+)/).map((tok): Token => {
    if (/^\s+$/.test(tok)) return { type: "sp", text: tok };
    const m = tok.match(/^([“"'(]*)(.*?)([.,;:!?”")]*)$/);
    if (!m) return { type: "w", pre: "", core: tok, post: "" };
    return { type: "w", pre: m[1], core: m[2], post: m[3] };
  });
}

const BTN =
  "border border-[#1b2620] px-3 py-1.5 text-xs text-[#34e06a] transition-colors hover:bg-[#34e06a]/10";

export default function FilmGame({
  film,
  locale,
  strings: t,
  dateLabel,
}: {
  film: Film;
  locale: Locale;
  strings: Strings;
  dateLabel: string;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tokenized = useMemo(() => film.lines.map(tokenize), [film]);
  const prompt = buildPrompt(locale, film.lines.join(" "), [...selected]);

  function toggleWord(core: string) {
    const k = core.toLowerCase();
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      /* clipboard indisponible */
    }
    setCopied(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-40 pt-8 text-[15px]">
      {/* En-tête terminal */}
      <header className="flex items-start justify-between border-b border-[#1b2620] pb-3">
        <div>
          <div className="cursor text-lg font-bold lowercase tracking-tight glow">
            ternyata
          </div>
          <div className="mt-1 text-[11px] text-[#5d7a68]">$ {t.tagline}</div>
        </div>
        <div className="text-right">
          <nav className="text-[11px]">
            <a
              href="/?lang=fr"
              className={locale === "fr" ? "glow" : "text-[#5d7a68] hover:text-[#b9ccbf]"}
            >
              FR
            </a>
            <span className="px-1 text-[#1b2620]">/</span>
            <a
              href="/?lang=en"
              className={locale === "en" ? "glow" : "text-[#5d7a68] hover:text-[#b9ccbf]"}
            >
              EN
            </a>
          </nav>
          <div className="mt-1.5 text-[11px] lowercase text-[#5d7a68]">
            // {dateLabel}
          </div>
        </div>
      </header>

      <p className="mb-7 mt-6 text-xs text-[#5d7a68]">// {t.instruction}</p>

      {/* Synopsis */}
      <div className="mb-9 text-[22px] leading-[1.7]">
        {tokenized.map((tokens, li) => (
          <span key={li}>
            {tokens.map((tok, i) =>
              tok.type === "sp" ? (
                <span key={i}>{tok.text}</span>
              ) : (
                <span key={i}>
                  {tok.pre}
                  {tok.core && (
                    <span
                      onClick={() => toggleWord(tok.core)}
                      className={
                        "kata" + (selected.has(tok.core.toLowerCase()) ? " on" : "")
                      }
                    >
                      {tok.core}
                    </span>
                  )}
                  {tok.post}
                </span>
              )
            )}
            {li < tokenized.length - 1 ? " " : ""}
          </span>
        ))}
      </div>

      {/* Réponse masquée */}
      <div className="border border-[#1b2620] bg-[#0c1013] px-4 py-3.5">
        <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#5d7a68]">
          &gt; {t.answerLabel}
        </div>
        {revealed ? (
          <div>
            <div className="text-lg font-bold glow">{film.title}</div>
            <div className="mt-1 text-xs text-[#5d7a68]">
              {film.director} · {film.year} · {film.country}
              {film.rank ? `  ·  TSPDT #${film.rank}` : ""}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="redacted h-4 flex-1" aria-hidden />
            <button onClick={() => setRevealed(true)} className={BTN}>
              [ {t.reveal} ]
            </button>
          </div>
        )}
      </div>

      {/* Barre d'action */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-40 border-t border-[#1b2620] bg-[#07090b]/95 backdrop-blur transition-transform " +
          (selected.size > 0 ? "translate-y-0" : "translate-y-full")
        }
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-6 py-3 text-xs">
          <div className="flex-1 text-[#5d7a68]">
            &gt; <b className="tabular-nums glow">{selected.size}</b> {t.wordsUnit}
          </div>
          <button onClick={() => setSelected(new Set())} className={BTN}>
            [ {t.clear} ]
          </button>
          <button
            onClick={() => {
              setCopied(false);
              setModalOpen(true);
            }}
            className="border border-[#34e06a] bg-[#34e06a]/10 px-3 py-1.5 text-xs text-[#7dffb0] hover:bg-[#34e06a]/20"
          >
            [ {t.generate} ]
          </button>
        </div>
      </div>

      {/* Modal prompt */}
      {modalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5"
        >
          <div className="max-h-[85vh] w-full max-w-xl overflow-auto border border-[#34e06a]/40 bg-[#0c1013] p-5">
            <h3 className="text-sm font-bold lowercase glow">&gt; {t.modalTitle}</h3>
            <p className="mb-3 mt-1 text-[11px] text-[#5d7a68]">{t.modalHelp}</p>
            <textarea
              readOnly
              value={prompt}
              className="min-h-[180px] w-full resize-y border border-[#1b2620] bg-[#07090b] p-3 text-[12px] leading-relaxed text-[#b9ccbf] outline-none"
            />
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <button onClick={copyPrompt} className={BTN}>
                [ {t.copy} ]
              </button>
              <button
                onClick={() => {
                  copyPrompt();
                  window.open("https://claude.ai/new", "_blank");
                }}
                className={BTN}
              >
                [ {t.openClaude} ]
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://chatgpt.com/?q=" + encodeURIComponent(prompt),
                    "_blank"
                  )
                }
                className={BTN}
              >
                [ {t.openChatGPT} ]
              </button>
              <button onClick={() => setModalOpen(false)} className={BTN}>
                [ {t.close} ]
              </button>
              {copied && <span className="text-[11px] glow">{t.copied}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
