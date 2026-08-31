"use client";
import { useLocale } from "./locale";
export function PrivacyContent(){const {t}=useLocale();return <main className="page-shell max-w-3xl py-16"><p className="text-sm text-zinc-500">{t("privacy.eyebrow")}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">{t("privacy.title")}</h1><div className="mt-8 space-y-6 leading-7 text-zinc-600"><p>{t("privacy.p1")}</p><p>{t("privacy.p2")}</p><p>{t("privacy.p3")}</p></div></main>}
