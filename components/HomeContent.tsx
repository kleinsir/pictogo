"use client";

import Link from "next/link";
import { ImageTool } from "./ImageTool";
import { useLocale } from "./locale";
import { Faq } from "./Faq";
import { RelatedTools } from "./RelatedTools";

export function HomeContent() {
  const { t } = useLocale();
  return <main>
    <section className="page-shell relative pt-16 text-center sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-8 -z-10 h-64 w-[min(760px,90vw)] -translate-x-1/2 rounded-full bg-blue-100/45 blur-3xl"/>
      <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-blue-700 shadow-sm"><ShieldIcon/>{t("home.safe")}</p>
      <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-.035em] text-zinc-950 sm:text-6xl">{t("home.title")}</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">{t("home.subtitle")}</p>
    </section>
    <ImageTool/>
    <section className="page-shell grid gap-4 py-14 sm:grid-cols-3 sm:py-20">
      <Feature icon="shield" title={t("home.local")} text={t("home.localText")}/><Feature icon="stack" title={t("home.batch")} text={t("home.batchText")}/><Feature icon="spark" title={t("home.easy")} text={t("home.easyText")}/>
    </section>
    <section id="more" className="border-y border-zinc-200/70 bg-white/70 py-16"><div className="page-shell">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">{t("home.more")}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.02em] sm:text-3xl">{t("home.moreTitle")}</h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><Card href="/compress" title={t("nav.compress")} text={t("preset.balanced.size")}/><Card href="/resize" title={t("nav.resize")} text={t("resize.fitDesc")}/><Card href="/convert" title={t("nav.convert")} text={t("page.convertDesc")}/></div>
    </div></section><RelatedTools group="popular"/><Faq section="home"/>
  </main>;
}
function Feature({icon,title,text}:{icon:"shield"|"stack"|"spark";title:string;text:string}) { return <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_12px_35px_rgba(24,39,75,.04)]"><span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-blue-600"><FeatureIcon kind={icon}/></span><h3 className="mt-5 font-semibold tracking-tight">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>; }
function Card({href,title,text}:{href:string;title:string;text:string}) { return <Link href={href} className="group rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(24,39,75,.035)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_16px_40px_rgba(37,99,235,.08)]"><div className="flex items-center justify-between gap-3"><h3 className="font-semibold tracking-tight">{title}</h3><span className="grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-zinc-500 transition group-hover:bg-blue-50 group-hover:text-blue-600"><ChevronIcon/></span></div><p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p></Link>; }
function ShieldIcon(){return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8"><path d="M12 3.5 19 6v5.2c0 4.2-2.7 7.6-7 9.3-4.3-1.7-7-5.1-7-9.3V6l7-2.5Z"/><path d="m9 12 2 2 4-4"/></svg>}
function FeatureIcon({kind}:{kind:"shield"|"stack"|"spark"}){if(kind==="shield")return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7"><path d="M12 3.5 19 6v5.2c0 4.2-2.7 7.6-7 9.3-4.3-1.7-7-5.1-7-9.3V6l7-2.5Z"/><path d="m9 12 2 2 4-4"/></svg>;if(kind==="stack")return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7"><rect x="5" y="4" width="14" height="12" rx="2"/><path d="M8 20h8M8 8h8M8 12h5"/></svg>;return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7"><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/></svg>}
function ChevronIcon(){return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8"><path d="m7.5 5 5 5-5 5"/></svg>}
