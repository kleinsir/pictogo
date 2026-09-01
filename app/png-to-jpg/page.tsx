import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "PNG to JPG Converter", description: "Convert PNG images to JPG locally in your browser. Transparent areas are filled with a white background.", alternates: { canonical: "/png-to-jpg" }, openGraph: { title: "PNG to JPG Converter | Pictogo", description: "Convert PNG images to JPG locally with white backgrounds for transparent areas.", url: "/png-to-jpg" }, twitter: { card: "summary", title: "PNG to JPG Converter | Pictogo", description: "Convert PNG images to JPG locally in your browser." } };

export default function PngToJpgPage() { return <LongTailToolPage titleKey="page.pngToJpgTitle" descriptionKey="page.pngToJpgDesc" detailKey="page.pngToJpgDetail" faq="pngToJpg" initial="convert" defaultOutputMime="image/jpeg"/>; }
