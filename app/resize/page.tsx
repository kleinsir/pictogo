import type { Metadata } from "next"; import { Header } from "@/components/Header"; import { ImageTool } from "@/components/ImageTool";
export const metadata: Metadata = { title: "批量调整图片尺寸 | 图快", description: "在浏览器中批量调整图片的最大宽度和高度，保持原始比例。" };
export default function Resize(){return <><Header/><div className="page-shell pt-10 text-center"><h1 className="text-3xl font-semibold tracking-tight">批量调整图片尺寸</h1><p className="mt-3 text-zinc-500">保持比例，轻松调整每一张图片。</p></div><ImageTool initial="resize"/></>}
