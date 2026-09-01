import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "Batch Image Compressor", description: "Compress multiple images at once locally in your browser and download single images or a ZIP file.", alternates: { canonical: "/batch-image-compressor" }, openGraph: { title: "Batch Image Compressor | Pictogo", description: "Compress multiple images locally and download individual files or a ZIP.", url: "/batch-image-compressor" }, twitter: { card: "summary", title: "Batch Image Compressor | Pictogo", description: "Compress multiple images locally and download a ZIP." } };

export default function BatchImageCompressorPage() { return <LongTailToolPage titleKey="page.batchCompressorTitle" descriptionKey="page.batchCompressorDesc" detailKey="page.batchCompressorDetail" faq="batchCompressor" initial="compress" defaultCompressionMode="balanced"/>; }
