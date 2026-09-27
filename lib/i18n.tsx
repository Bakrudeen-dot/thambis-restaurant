"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, LANG_LABELS, LANGS, type Dictionary, type L10n, type Lang } from "@/data/translations";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (l: Lang) => void;
  /** Pick the current language from an { en, ta, ar } object. */
  pick: (v: L10n) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
export const STORAGE_KEY = "thambis-lang";

function applyToDocument(lang: Lang) {
  const meta = LANG_LABELS[lang];
  const html = document.documentElement;
  html.lang = meta.htmlLang;
  html.dir = meta.dir;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Initial language: ?lang= query → saved preference → English.
  useEffect(() => {
    let initial: Lang = "en";
    try {
      const q = new URLSearchParams(window.location.search).get("lang") as Lang | null;
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (q && LANGS.includes(q)) initial = q;
      else if (saved && LANGS.includes(saved)) initial = saved;
    } catch {
      /* storage unavailable — keep English */
    }
    setLangState(initial);
    applyToDocument(initial);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    applyToDocument(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: LANG_LABELS[lang].dir, t: dictionaries[lang], setLang, pick: (v) => v[lang] ?? v.en }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/**
 * Runs before first paint (inlined in <head>) so Arabic visitors don't see
 * the page flip from LTR to RTL after hydration.
 */
export const languageBootScript = `(function(){try{var q=new URLSearchParams(location.search).get('lang');var s=localStorage.getItem('${STORAGE_KEY}');var l=(q==='en'||q==='ta'||q==='ar')?q:((s==='ta'||s==='ar'||s==='en')?s:'en');document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`;
