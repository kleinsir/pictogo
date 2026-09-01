import type { Metadata } from "next";
import { LongTailToolPage } from "@/components/LongTailToolPage";

export const metadata: Metadata = { title: "Resize Image to 16:9", description: "Resize or crop images to a 16:9 ratio locally in your browser.", alternates: { canonical: "/resize-image-to-16-9" }, openGraph: { title: "Resize Image to 16:9 | Pictogo", description: "Resize or crop images to a 16:9 ratio locally in your browser.", url: "/resize-image-to-16-9" }, twitter: { card: "summary", title: "Resize Image to 16:9 | Pictogo", description: "Resize or crop images to a 16:9 ratio locally in your browser." } };

export default function Resize16x9Page() { return <LongTailToolPage titleKey="page.resize16x9Title" descriptionKey="page.resize16x9Desc" detailKey="page.resize16x9Detail" faq="resize16x9" initial="resize" defaultResizeRatio={16 / 9}/>; }
