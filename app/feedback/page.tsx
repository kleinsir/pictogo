import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackContent } from "@/components/FeedbackContent";

const description = "Send product feedback, bug reports, and image format requests to the Pictogo team by email.";

export const metadata: Metadata = {
  title: "Feedback",
  description,
  alternates: { canonical: "/feedback" },
  openGraph: { title: "Feedback | Pictogo", description, url: "/feedback" },
  twitter: { card: "summary", title: "Feedback | Pictogo", description },
};

export default function FeedbackPage() { return <><Header/><FeedbackContent/><Footer/></>; }
