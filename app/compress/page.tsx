import type { Metadata } from "next"; import { Header } from "@/components/Header"; import { ImageTool } from "@/components/ImageTool";
export const metadata: Metadata = { title: "批量图片压缩 | 图快", description: "免费在浏览器本地批量压缩 JPG、PNG 和 WebP 图片。" };
export default function Compress(){return <><Header/><div className="page-shell pt-10 text-center"><h1 className="text-3xl font-semibold tracking-tight">批量图片压缩</h1><p className="mt-3 text-zinc-500">选择图片，轻松减小文件体积。</p></div><ImageTool initial="compress"/></>}
