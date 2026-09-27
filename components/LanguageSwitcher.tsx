"use client";

import { LANG_LABELS, LANGS } from "@/data/translations";
import { useLanguage } from "@/lib/i18n";

export default function LanguageSwitcher({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const base = tone === "light" ? "text-cream/60 hover:text-cream" : "text-ink/55 hover:text-ink";
  const active = tone === "light" ? "text-cream" : "text-ink";
  const sep = tone === "light" ? "bg-cream/25" : "bg-ink/20";

  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className={`mx-2.5 h-3.5 w-px ${sep}`} aria-hidden="true" />}
          <button
            type="button"
            onClick={() => setLang(l)}
            lang={LANG_LABELS[l].htmlLang}
            aria-pressed={lang === l}
            className={`relative min-h-[40px] px-1 text-[0.8rem] font-semibold transition-colors ${lang === l ? active : base}`}
          >
            {LANG_LABELS[l].short}
            {lang === l && <span className="absolute inset-x-1 bottom-1.5 h-px bg-brass" aria-hidden="true" />}
          </button>
        </span>
      ))}
    </div>
  );
}
