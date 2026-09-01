import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "Compress Image to 500KB", description: "Compress images toward 500KB locally in your browser. Actual size depends on the original image.", alternates: { canonical: "/compress-image-to-500kb" }, openGraph: { title: "Compress Image to 500KB | Pictogo", description: "Compress images toward 500KB locally in your browser.", url: "/compress-image-to-500kb" }, twitter: { card: "summary", title: "Compress Image to 500KB | Pictogo", description: "Compress images toward 500KB locally in your browser." } };

export default function CompressTo500kbPage() { return <LongTailToolPage titleKey="page.compressTo500kbTitle" descriptionKey="page.compressTo500kbDesc" detailKey="page.compressTo500kbDetail" faq="compressTo500kb" initial="compress" defaultCompressionMode="extreme"/>; }
