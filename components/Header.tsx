"use client";
import Link from "next/link";
import { useLocale } from "./locale";
import { BrandMark } from "./BrandMark";

export function Header() {
  const { locale, setLocale, t } = useLocale();
  return <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
    <div className="page-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950">
        <BrandMark />{t("brand.name")}
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-zinc-600 sm:flex">
        <Link href="/compress" className="hover:text-zinc-950">{t("nav.compress")}</Link><Link href="/resize" className="hover:text-zinc-950">{t("nav.resize")}</Link><Link href="/convert" className="hover:text-zinc-950">{t("nav.convert")}</Link><a href="#more" className="hover:text-zinc-950">{t("nav.more")}</a>
      </nav>
      <label className="ml-4 flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-700 shadow-sm"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.2 3.8 8.5S14.5 18.1 12 20.5C9.5 18.1 8.2 15.3 8.2 12S9.5 5.9 12 3.5Z"/></svg><select aria-label={t("language")} value={locale} onChange={e => setLocale(e.target.value as "zh" | "en")} className="border-0 bg-transparent text-xs font-medium outline-none">
        <option value="zh">中文</option><option value="en">English</option>
      </select></label>
    </div>
  </header>;
}
