import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "WebP to JPG Converter", description: "Convert WebP images to JPG locally in your browser for better compatibility.", alternates: { canonical: "/webp-to-jpg" }, openGraph: { title: "WebP to JPG Converter | Pictogo", description: "Convert WebP images to compatible JPG files locally in your browser.", url: "/webp-to-jpg" }, twitter: { card: "summary", title: "WebP to JPG Converter | Pictogo", description: "Convert WebP images to JPG locally in your browser." } };

export default function WebpToJpgPage() { return <LongTailToolPage titleKey="page.webpToJpgTitle" descriptionKey="page.webpToJpgDesc" detailKey="page.webpToJpgDetail" faq="webpToJpg" initial="convert" defaultOutputMime="image/jpeg"/>; }
