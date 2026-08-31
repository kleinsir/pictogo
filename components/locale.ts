"use client";

import { useEffect, useState } from "react";
import { MessageKey, messages } from "./messages";

export type Locale = "zh" | "en";

function cookieLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const selected = document.cookie.match(/(?:^|; )pictogo_lang=(zh|en)/)?.[1] as Locale | undefined;
  if (selected) return selected;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(cookieLocale);
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    const receive = () => setLocaleState(cookieLocale());
    window.addEventListener("pictogo-language-change", receive);
    return () => window.removeEventListener("pictogo-language-change", receive);
  }, [locale]);
  const setLocale = (next: Locale) => {
    document.cookie = `pictogo_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    setLocaleState(next);
    window.dispatchEvent(new Event("pictogo-language-change"));
  };
  const t = (key: MessageKey, values: Record<string, string | number> = {}): string => Object.entries(values).reduce<string>((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), messages[locale][key]);
  return { locale, setLocale, t };
}
