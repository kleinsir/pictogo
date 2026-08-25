import type { Metadata } from "next"; import { Header } from "@/components/Header"; import { ImageTool } from "@/components/ImageTool";
export const metadata: Metadata = { title: "批量图片格式转换 | 图快", description: "在浏览器本地批量将图片转换为 JPG、PNG 或 WebP 格式。" };
export default function Convert(){return <><Header/><div className="page-shell pt-10 text-center"><h1 className="text-3xl font-semibold tracking-tight">批量图片格式转换</h1><p className="mt-3 text-zinc-500">JPG、PNG、WebP，一次全部转换。</p></div><ImageTool initial="convert"/></>}
