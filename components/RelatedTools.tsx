"use client";

import Link from "next/link";
import { useLocale } from "./locale";
import { MessageKey } from "./messages";

type Group = "popular" | "compress" | "convert" | "resize";

const groups: Record<Group, { href: string; key: MessageKey }[]> = {
  popular: [
    { href: "/jpg-to-webp", key: "related.jpgToWebp" }, { href: "/png-to-jpg", key: "related.pngToJpg" },
    { href: "/compress-image-to-1mb", key: "related.compress1mb" }, { href: "/crop-image-to-square", key: "related.square" },
  ],
  compress: [
    { href: "/compress-image-to-1mb", key: "related.compress1mb" }, { href: "/compress-image-to-500kb", key: "related.compress500kb" }, { href: "/batch-image-compressor", key: "related.batch" },
  ],
  convert: [
    { href: "/jpg-to-webp", key: "related.jpgToWebp" }, { href: "/png-to-jpg", key: "related.pngToJpg" }, { href: "/webp-to-jpg", key: "related.webpToJpg" },
  ],
  resize: [
    { href: "/crop-image-to-square", key: "related.square" }, { href: "/resize-image-to-16-9", key: "related.sixteenNine" },
  ],
};

export function RelatedTools({ group }: { group: Group }) {
  const { t } = useLocale();
  return <section className="page-shell border-t border-zinc-200/70 py-14"><h2 className="text-xl font-semibold tracking-[-.015em]">{t("related.title")}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{groups[group].map(item => <Link key={item.href} href={item.href} className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-white/80 px-4 py-3 text-sm font-medium text-zinc-700 shadow-[0_8px_24px_rgba(24,39,75,.03)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_12px_28px_rgba(37,99,235,.07)]"><span>{t(item.key)}</span><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-400 transition group-hover:bg-blue-50 group-hover:text-blue-600"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8"><path d="m7.5 5 5 5-5 5"/></svg></span></Link>)}</div></section>;
}
