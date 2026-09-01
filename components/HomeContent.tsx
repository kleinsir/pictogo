"use client";

import Link from "next/link";
import { ImageTool } from "./ImageTool";
import { useLocale } from "./locale";
import { Faq } from "./Faq";
import { RelatedTools } from "./RelatedTools";

export function HomeContent() {
  const { t } = useLocale();
  return <main>
    <section className="page-shell pt-16 text-center sm:pt-24">
      <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">🔒 {t("home.safe")}</p>
      <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">{t("home.title")}</h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">{t("home.subtitle")}</p>
    </section>
    <ImageTool/>
    <section className="page-shell grid gap-8 py-14 sm:grid-cols-3">
      <Feature icon="🔒" title={t("home.local")} text={t("home.localText")}/><Feature icon="⚡" title={t("home.batch")} text={t("home.batchText")}/><Feature icon="🎯" title={t("home.easy")} text={t("home.easyText")}/>
    </section>
    <section id="more" className="border-y border-zinc-100 bg-zinc-50 py-16"><div className="page-shell">
      <p className="text-sm text-zinc-500">{t("home.more")}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{t("home.moreTitle")}</h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><Card href="/compress" title={t("nav.compress")} text={t("preset.balanced.size")}/><Card href="/resize" title={t("nav.resize")} text={t("resize.fitDesc")}/><Card href="/convert" title={t("nav.convert")} text={t("page.convertDesc")}/></div>
    </div></section><RelatedTools group="popular"/><Faq section="home"/>
  </main>;
}
function Feature({icon,title,text}:{icon:string,title:string,text:string}) { return <div><span className="text-xl">{icon}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm text-zinc-500">{text}</p></div>; }
function Card({href,title,text}:{href:string,title:string,text:string}) { return <Link href={href} className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"><h3 className="font-semibold">{title} <span className="text-blue-600">→</span></h3><p className="mt-2 text-sm text-zinc-500">{text}</p></Link>; }
