import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "JPG to WebP Converter", description: "Convert JPG images to WebP locally in your browser. Batch conversion supported, with no image upload.", alternates: { canonical: "/jpg-to-webp" }, openGraph: { title: "JPG to WebP Converter | Pictogo", description: "Convert JPG images to WebP locally in your browser.", url: "/jpg-to-webp" }, twitter: { card: "summary", title: "JPG to WebP Converter | Pictogo", description: "Convert JPG images to WebP locally in your browser." } };

export default function JpgToWebpPage() { return <LongTailToolPage titleKey="page.jpgToWebpTitle" descriptionKey="page.jpgToWebpDesc" detailKey="page.jpgToWebpDetail" faq="jpgToWebp" initial="convert" defaultOutputMime="image/webp"/>; }
