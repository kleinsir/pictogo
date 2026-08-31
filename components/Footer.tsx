"use client";
import Link from "next/link";
import { useLocale } from "./locale";
export function Footer(){const {t}=useLocale();return <footer className="page-shell flex flex-wrap justify-between gap-4 py-8 text-xs text-zinc-500"><span>© 2026 Pictogo · {t("footer")}</span><Link href="/privacy">{t("privacy.link")}</Link></footer>}
