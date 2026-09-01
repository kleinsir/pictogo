"use client";
import Link from "next/link";
import { useLocale } from "./locale";
export function Footer(){const {t}=useLocale();return <footer className="mt-auto shrink-0 border-t border-zinc-200/70 bg-white/60"><div className="page-shell flex flex-wrap justify-between gap-4 pb-16 pt-8 text-xs text-zinc-500"><span>© 2026 Pictogo · {t("footer")}</span><nav className="flex items-center gap-4"><Link href="/feedback" className="transition hover:text-zinc-900">{t("footer.feedback")}</Link><Link href="/privacy" className="transition hover:text-zinc-900">{t("privacy.link")}</Link></nav></div></footer>}
