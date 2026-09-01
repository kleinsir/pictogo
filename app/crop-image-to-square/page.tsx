import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "Crop Image to Square", description: "Crop images to a 1:1 square ratio locally in your browser. Batch image cropping supported.", alternates: { canonical: "/crop-image-to-square" }, openGraph: { title: "Crop Image to Square | Pictogo", description: "Crop images to a strict 1:1 square ratio locally in your browser.", url: "/crop-image-to-square" }, twitter: { card: "summary", title: "Crop Image to Square | Pictogo", description: "Crop images to a 1:1 square ratio locally in your browser." } };

export default function CropSquarePage() { return <LongTailToolPage titleKey="page.cropSquareTitle" descriptionKey="page.cropSquareDesc" detailKey="page.cropSquareDetail" faq="cropSquare" initial="resize" defaultResizeRatio={1}/>; }
