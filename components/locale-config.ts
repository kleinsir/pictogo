export const SUPPORTED_LOCALES = ["zh", "en", "es", "pt", "ja"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export function normalizeLocale(value: string | null | undefined): Locale {
  return SUPPORTED_LOCALES.includes(value as Locale) ? value as Locale : "en";
}
