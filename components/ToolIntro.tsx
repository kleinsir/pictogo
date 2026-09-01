"use client";
import { useLocale } from "./locale";
import { MessageKey } from "./messages";
export function ToolIntro({ titleKey, descriptionKey, detailKey }: { titleKey: MessageKey; descriptionKey: MessageKey; detailKey?: MessageKey }) { const { t } = useLocale(); return <div className="page-shell pt-10 text-center"><h1 className="text-3xl font-semibold tracking-tight">{t(titleKey)}</h1><p className="mx-auto mt-3 max-w-2xl text-zinc-500">{t(descriptionKey)}</p>{detailKey && <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{t(detailKey)}</p>}<p className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">🔒 {t("upload.local")}</p></div>; }
