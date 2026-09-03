"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MessageKey, messages } from "./messages";
import { Locale, normalizeLocale } from "./locale-config";

export type { Locale } from "./locale-config";
type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: MessageKey, values?: Record<string, string | number>) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function htmlLanguage(locale: Locale) { return locale === "zh" ? "zh-CN" : locale === "pt" ? "pt-BR" : locale; }

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  useEffect(() => { setLocaleState(initialLocale); }, [initialLocale]);
  useEffect(() => { document.documentElement.lang = htmlLanguage(locale); }, [locale]);
  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale(next) {
      const selected = normalizeLocale(next);
      document.cookie = `pictogo_lang=${selected}; Path=/; Max-Age=31536000; SameSite=Lax`;
      document.cookie = "pictogo_lang_source=manual; Path=/; Max-Age=31536000; SameSite=Lax";
      document.documentElement.lang = htmlLanguage(selected);
      setLocaleState(selected);
    },
    t(key, values = {}) {
      const source = messages[locale][key] || messages.en[key];
      return Object.entries(values).reduce<string>((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), source);
    },
  }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
