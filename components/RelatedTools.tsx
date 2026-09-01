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
  return <section className="page-shell border-t border-zinc-100 py-12"><h2 className="text-xl font-semibold tracking-tight">{t("related.title")}</h2><div className="mt-5 flex flex-wrap gap-2">{groups[group].map(item => <Link key={item.href} href={item.href} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-blue-300 hover:text-blue-700">{t(item.key)} <span aria-hidden="true">→</span></Link>)}</div></section>;
}
