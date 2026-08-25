import { Header } from "@/components/Header";
import { HomeContent } from "@/components/HomeContent";
import Link from "next/link";

export default function Home() {
  return <><Header/><HomeContent/><footer className="page-shell flex flex-wrap justify-between gap-4 py-8 text-xs text-zinc-500"><span>© 2026 Pictogo</span><Link href="/privacy">Privacy</Link></footer></>;
}
