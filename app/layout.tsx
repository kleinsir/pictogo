import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pictogo.vercel.app"),
  title: { default: "Pictogo | Batch image tools", template: "%s | Pictogo" },
  description: "Batch-compress, resize, and convert images locally in your browser.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Pictogo", title: "Pictogo | Batch image tools", description: "Batch-compress, resize, and convert images locally in your browser.", url: "/" },
  twitter: { card: "summary", title: "Pictogo | Batch image tools", description: "Batch-compress, resize, and convert images locally in your browser." },
  icons: { icon: "/favicon.svg" },
  verification: { google: "vkMj49fiTjTnSHor3lp_SES5BnapsSeI2VZHCzuguWc" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Pictogo", applicationCategory: "MultimediaApplication", operatingSystem: "Web", description: "Batch-compress, resize, and convert images locally in your browser.", url: "https://pictogo.vercel.app", featureList: ["Local browser image processing", "Batch image compression", "Image resizing and fixed-ratio crops", "JPG, PNG, and WebP conversion", "ZIP downloads"] }) }} /></body></html>;
}
