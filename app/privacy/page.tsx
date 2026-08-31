import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PrivacyContent } from "@/components/PrivacyContent";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = { title: "Privacy", description: "How Pictogo processes images locally in your browser.", alternates: { canonical: "/privacy" }, openGraph: { title: "Privacy | Pictogo", description: "How Pictogo processes images locally in your browser.", url: "/privacy" }, twitter: { card: "summary", title: "Privacy | Pictogo", description: "How Pictogo processes images locally in your browser." } };
export default function Privacy(){return <><Header/><PrivacyContent/><Footer/></>}
