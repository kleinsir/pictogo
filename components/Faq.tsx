"use client";

import { MessageKey } from "./messages";
import { useLocale } from "./locale";

export type FaqSection = "home" | "compress" | "resize" | "convert" | "jpgToWebp" | "pngToJpg" | "webpToJpg" | "compressTo1mb" | "compressTo500kb" | "cropSquare" | "resize16x9" | "batchCompressor";

export function Faq({ section }: { section: FaqSection }) {
  const { t } = useLocale();
  const items = [1, 2, 3, 4].map(number => ({
    question: t(`faq.${section}.q${number}` as MessageKey),
    answer: t(`faq.${section}.a${number}` as MessageKey),
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
  return <section className="page-shell border-t border-zinc-100 py-14" aria-labelledby={`${section}-faq-title`}>
    <div className="max-w-3xl">
      <h2 id={`${section}-faq-title`} className="text-2xl font-semibold tracking-tight">{t(`faq.${section}.title` as MessageKey)}</h2>
      <div className="mt-6 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white px-5">
        {items.map(item => <details key={item.question} className="group py-4"><summary className="cursor-pointer list-none pr-8 text-sm font-medium text-zinc-900 marker:content-none">{item.question}<span aria-hidden="true" className="float-right text-lg text-zinc-400 transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">{item.answer}</p></details>)}
      </div>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </section>;
}
