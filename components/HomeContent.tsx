"use client";

import Link from "next/link";
import { ImageTool } from "./ImageTool";
import { useLocale } from "./locale";

export function HomeContent() {
  const { t } = useLocale();
  return <main>
    <section className="page-shell pt-16 text-center sm:pt-24">
      <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">🔒 {t("图片在浏览器本地处理，不上传服务器", "Images are processed locally in your browser. Never uploaded.")}</p>
      <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">{t("批量处理图片，简单到拖进去就行。", "Batch image editing, as easy as drag and drop.")}</h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">{t("压缩、调整尺寸、转换格式，一次处理几十甚至上百张图片。", "Compress, resize and convert dozens or hundreds of images at once.")}</p>
    </section>
    <ImageTool/>
    <section className="page-shell grid gap-8 py-14 sm:grid-cols-3">
      <Feature icon="🔒" title={t("本地处理", "Local processing")} text={t("图片无需上传服务器", "Your images never leave your device.")}/>
      <Feature icon="⚡" title={t("批量处理", "Batch processing")} text={t("一次处理几十甚至上百张图片", "Process dozens or hundreds of images at once.")}/>
      <Feature icon="🎯" title={t("简单易用", "Easy to use")} text={t("无需理解复杂图片参数", "No complicated image settings to learn.")}/>
    </section>
    <section id="more" className="border-y border-zinc-100 bg-zinc-50 py-16"><div className="page-shell">
      <p className="text-sm text-zinc-500">{t("更多图片工具", "More image tools")}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{t("把图片工作变得更轻松", "Make image work effortless")}</h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><Card href="/compress" title={t("图片压缩", "Image compression")} text={t("减小文件体积，保留清晰细节", "Smaller files, crisp details.")}/><Card href="/resize" title={t("调整图片尺寸", "Resize images")} text={t("批量缩放，始终保持比例", "Batch resize while keeping proportions.")}/><Card href="/convert" title={t("图片格式转换", "Image conversion")} text={t("JPG、PNG、WebP 一键转换", "Convert JPG, PNG and WebP in one click.")}/></div>
    </div></section>
  </main>;
}
function Feature({icon,title,text}:{icon:string,title:string,text:string}) { return <div><span className="text-xl">{icon}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm text-zinc-500">{text}</p></div>; }
function Card({href,title,text}:{href:string,title:string,text:string}) { return <Link href={href} className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"><h3 className="font-semibold">{title} <span className="text-blue-600">→</span></h3><p className="mt-2 text-sm text-zinc-500">{text}</p></Link>; }
