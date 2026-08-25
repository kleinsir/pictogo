"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import { useLocale } from "./locale";

type Mode = "share" | "web" | "small" | "custom";
type Format = "original" | "image/jpeg" | "image/png" | "image/webp";
type Item = { id: string; file: File; preview: string; status: "待处理" | "处理中" | "完成" | "失败"; result?: Blob; error?: string };
declare global {
  interface Window { __pictogoImageDraft?: Item[]; }
}
const allowed = ["image/jpeg", "image/png", "image/webp"];
const labels: Record<Mode, { icon: string; title: string; sub: string; quality: number }> = {
  share: { icon: "📱", title: "手机分享", sub: "兼顾清晰度和体积", quality: .78 },
  web: { icon: "🌐", title: "网站上传", sub: "适合网页与商品图", quality: .72 },
  small: { icon: "📦", title: "尽可能小", sub: "优先减小文件体积", quality: .55 },
  custom: { icon: "⚙️", title: "自定义", sub: "按你的偏好设置", quality: .8 }
};
function size(n: number) { return n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`; }
function ext(mime: string, fallback: string) { return mime === "image/jpeg" ? "jpg" : mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : fallback; }

export function ImageTool({ initial = "compress" }: { initial?: "compress" | "resize" | "convert" }) {
  const { t } = useLocale();
  // Files cannot live in the URL, so retain the current browser-session draft while
  // Next.js moves between the compression, resize and conversion pages.
  const input = useRef<HTMLInputElement>(null); const [items, setItems] = useState<Item[]>(() => typeof window === "undefined" ? [] : window.__pictogoImageDraft || []); const [drag, setDrag] = useState(false);
  const updateItems = (change: Item[] | ((current: Item[]) => Item[])) => setItems(current => {
    const next = typeof change === "function" ? change(current) : change;
    window.__pictogoImageDraft = next;
    return next;
  });
  const [tool, setTool] = useState(initial); const [mode, setMode] = useState<Mode>("share"); const [format, setFormat] = useState<Format>("original");
  const [width, setWidth] = useState(1920); const [height, setHeight] = useState(1920); const [quality, setQuality] = useState(80); const [advanced, setAdvanced] = useState(false); const [progress, setProgress] = useState(0); const [processing, setProcessing] = useState(false); const [done, setDone] = useState(false);
  const addFiles = (files: FileList | File[]) => { const good = Array.from(files).filter(f => allowed.includes(f.type)); const invalid = Array.from(files).length - good.length; if (invalid) alert("已忽略不支持的文件，请选择 JPG、PNG 或 WebP 图片。"); updateItems(prev => [...prev, ...good.map(file => ({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), status: "待处理" as const }))]); setDone(false); };
  const onDrop = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); };
  const original = useMemo(() => items.reduce((n, i) => n + i.file.size, 0), [items]); const processed = useMemo(() => items.reduce((n, i) => n + (i.result?.size || 0), 0), [items]); const finished = items.filter(i => i.result).length;
  async function run() { if (!items.length) return; setProcessing(true); setDone(false); setProgress(0); const chosenQ = mode === "custom" ? quality / 100 : labels[mode].quality; const next = [...items];
    for (let index = 0; index < next.length; index++) { next[index] = { ...next[index], status: "处理中", error: undefined }; updateItems([...next]);
      try { const item = next[index]; const image = await new Promise<HTMLImageElement>((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error("无法读取图片")); img.src = item.preview; });
        let ratio = 1; if (tool === "resize" || tool === "compress") { ratio = Math.min(1, width / image.naturalWidth, height / image.naturalHeight); }
        const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio)); canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio)); const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("浏览器不支持图片处理"); ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const mime = format === "original" ? (item.file.type === "image/png" && tool !== "compress" ? "image/png" : item.file.type) : format;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error("图片编码失败")), mime, mime === "image/png" ? undefined : chosenQ));
        next[index] = { ...next[index], status: "完成", result: blob };
      } catch (error) { next[index] = { ...next[index], status: "失败", error: error instanceof Error ? error.message : "处理失败" }; }
      updateItems([...next]); setProgress(Math.round(((index + 1) / next.length) * 100)); await new Promise(resolve => setTimeout(resolve, 0)); }
    setProcessing(false); setDone(true);
  }
  async function download() { const zip = new JSZip(); items.forEach((i, n) => { if (i.result) { const base = i.file.name.replace(/\.[^.]+$/, ""); const m = format === "original" ? i.result.type : format; zip.file(`${base}-图快.${ext(m, "jpg")}`, i.result); } }); const data = await zip.generateAsync({ type: "blob" }); const a = document.createElement("a"); a.href = URL.createObjectURL(data); a.download = "图快-处理后的图片.zip"; a.click(); URL.revokeObjectURL(a.href); }
  if (!items.length) return <Upload drop={onDrop} drag={drag} setDrag={setDrag} open={() => input.current?.click()} input={input} change={e => addFiles(e.target.files || [])} />;
  return <section className="page-shell py-8 sm:py-12"><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={e => addFiles(e.target.files || [])}/>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-zinc-500">{t("批量图片处理", "Batch image editor")}</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">{t(`已选择 ${items.length} 张图片`, `${items.length} images selected`)} <span className="font-normal text-zinc-400">· {size(original)}</span></h1></div><button onClick={() => input.current?.click()} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50">{t("继续添加", "Add more")}</button></div>
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]"><div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4"><div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1">{items.map(item => <div key={item.id} className="flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-50"><img src={item.preview} alt="" className="h-12 w-12 rounded-lg object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.file.name}</p><p className="text-xs text-zinc-500">{size(item.file.size)}{item.result && ` → ${size(item.result.size)}`}</p></div><span className={`text-xs ${item.status === "完成" ? "text-emerald-600" : item.status === "失败" ? "text-red-600" : "text-zinc-500"}`}>{item.status}</span></div>)}</div></div>
      <aside className="rounded-2xl border border-zinc-200 bg-white p-5"><div className="mb-5 grid grid-cols-3 rounded-xl bg-zinc-100 p-1 text-xs font-medium"><button onClick={() => setTool("compress")} className={`rounded-lg px-2 py-2 ${tool === "compress" ? "bg-white shadow-sm" : "text-zinc-500"}`}>{t("压缩", "Compress")}</button><button onClick={() => setTool("resize")} className={`rounded-lg px-2 py-2 ${tool === "resize" ? "bg-white shadow-sm" : "text-zinc-500"}`}>{t("调整尺寸", "Resize")}</button><button onClick={() => setTool("convert")} className={`rounded-lg px-2 py-2 ${tool === "convert" ? "bg-white shadow-sm" : "text-zinc-500"}`}>{t("转换格式", "Convert")}</button></div>
        {tool === "compress" && <><p className="text-sm font-semibold">你想把图片用在哪里？</p><div className="mt-3 grid grid-cols-2 gap-2">{(Object.keys(labels) as Mode[]).map(key => <button key={key} onClick={() => setMode(key)} className={`rounded-xl border p-3 text-left text-xs ${mode === key ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"}`}><span className="block text-base">{labels[key].icon}</span><b className="mt-1 block">{labels[key].title}</b><span className="mt-1 block text-zinc-500">{labels[key].sub}</span></button>)}</div></>}
        {(tool === "resize" || advanced) && <div className="mt-5 border-t border-zinc-100 pt-4"><p className="text-sm font-medium">最大尺寸（保持比例）</p><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs text-zinc-500">宽度<input value={width} min="1" type="number" onChange={e => setWidth(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-zinc-200 px-2 py-2 text-zinc-900"/></label><label className="text-xs text-zinc-500">高度<input value={height} min="1" type="number" onChange={e => setHeight(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-zinc-200 px-2 py-2 text-zinc-900"/></label></div></div>}
        {tool === "convert" && <div className="mt-5"><p className="text-sm font-medium">转换为</p><select value={format} onChange={e => setFormat(e.target.value as Format)} className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>}
        {tool !== "convert" && <button onClick={() => setAdvanced(!advanced)} className="mt-5 text-sm text-zinc-500 hover:text-zinc-950">{advanced ? "收起高级选项" : "高级选项"}</button>}
        {advanced && tool === "compress" && <label className="mt-3 block text-xs text-zinc-500">压缩质量：{quality}<input type="range" min="20" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="mt-2 w-full accent-blue-600"/></label>}
        {processing && <div className="mt-5"><div className="mb-1 flex justify-between text-xs text-zinc-500"><span>正在处理</span><span>{progress}%</span></div><div className="h-1.5 overflow-hidden rounded bg-zinc-100"><div className="h-full bg-blue-600 transition-all" style={{width:`${progress}%`}}/></div></div>}
        <button disabled={processing} onClick={run} className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{processing ? t("处理中…", "Processing…") : t("开始处理", "Process images")}</button>
      </aside></div>
    {done && <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex sm:items-center sm:justify-between"><div><h2 className="font-semibold text-zinc-900">处理完成 · 已处理 {finished} 张图片</h2><p className="mt-2 text-sm text-zinc-600">原始大小：{size(original)}　处理后：{size(processed)}　节省空间：{size(Math.max(0, original-processed))}　压缩比例：{original ? Math.max(0, (1 - processed/original)*100).toFixed(1) : 0}%</p></div><button onClick={download} disabled={!finished} className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 sm:mt-0">下载全部图片 ZIP</button></div>}</section>;
}
function Upload({ drop, drag, setDrag, open, input, change }: { drop: (e: DragEvent<HTMLDivElement>) => void; drag: boolean; setDrag: (v:boolean)=>void; open:()=>void; input: React.RefObject<HTMLInputElement>; change:(e:ChangeEvent<HTMLInputElement>)=>void }) { const { t } = useLocale(); return <section className="page-shell hero-grid py-12 sm:py-20"><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={change}/><div onClick={open} onDrop={drop} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} className={`mx-auto grid min-h-72 max-w-3xl cursor-pointer place-items-center rounded-3xl border-2 border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm transition ${drag?"drop-active":""}`}><div><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-2xl">↑</div><h2 className="mt-5 text-xl font-semibold tracking-tight">{t("拖入图片到这里", "Drop images here")}</h2><p className="mt-2 text-sm text-zinc-500">{t("或点击选择图片", "or click to choose images")}</p><p className="mt-6 text-xs text-zinc-400">{t("支持", "Supports")} JPG · PNG · WebP</p></div></div></section> }
