import { Faq, FaqSection } from "./Faq";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ImageTool } from "./ImageTool";
import { MessageKey } from "./messages";
import { ToolIntro } from "./ToolIntro";

type Tool = "compress" | "resize" | "convert";
type OutputMime = "image/jpeg" | "image/png" | "image/webp";
type Preset = "high" | "balanced" | "light" | "extreme" | "custom";

export function LongTailToolPage({ titleKey, descriptionKey, detailKey, faq, initial, defaultOutputMime, defaultResizeRatio, defaultCompressionMode }: { titleKey: MessageKey; descriptionKey: MessageKey; detailKey: MessageKey; faq: FaqSection; initial: Tool; defaultOutputMime?: OutputMime; defaultResizeRatio?: number; defaultCompressionMode?: Preset }) {
  return <><Header/><ToolIntro titleKey={titleKey} descriptionKey={descriptionKey} detailKey={detailKey}/><ImageTool initial={initial} defaultOutputMime={defaultOutputMime} defaultResizeRatio={defaultResizeRatio} defaultCompressionMode={defaultCompressionMode}/><Faq section={faq}/><Footer/></>;
}
