"use client";
import Link from "next/link";
import { useLocale } from "./locale";

export function Header() {
  const { locale, setLocale, t } = useLocale();
  return <header className="border-b border-zinc-100 bg-white/90 backdrop-blur">
    <div className="page-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-sm text-white">图</span>{t("图快", "Pictogo")}
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-zinc-600 sm:flex">
        <Link href="/compress" className="hover:text-zinc-950">{t("图片压缩", "Compress")}</Link><Link href="/resize" className="hover:text-zinc-950">{t("调整尺寸", "Resize")}</Link><Link href="/convert" className="hover:text-zinc-950">{t("格式转换", "Convert")}</Link><a href="#more" className="hover:text-zinc-950">{t("更多工具", "More tools")}</a>
      </nav>
      <select aria-label="Language" value={locale} onChange={e => setLocale(e.target.value as "zh" | "en")} className="ml-4 rounded-md border-0 bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 outline-none">
        <option value="zh">中文</option><option value="en">English</option>
      </select>
    </div>
  </header>;
}
