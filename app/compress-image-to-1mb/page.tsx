import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "Compress Image to 1MB", description: "Compress images toward 1MB locally in your browser. Actual size depends on the original image.", alternates: { canonical: "/compress-image-to-1mb" }, openGraph: { title: "Compress Image to 1MB | Pictogo", description: "Compress images toward 1MB locally in your browser.", url: "/compress-image-to-1mb" }, twitter: { card: "summary", title: "Compress Image to 1MB | Pictogo", description: "Compress images toward 1MB locally in your browser." } };

export default function CompressTo1mbPage() { return <LongTailToolPage titleKey="page.compressTo1mbTitle" descriptionKey="page.compressTo1mbDesc" detailKey="page.compressTo1mbDetail" faq="compressTo1mb" initial="compress" defaultCompressionMode="balanced"/>; }
