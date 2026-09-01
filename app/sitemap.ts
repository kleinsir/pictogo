import type { MetadataRoute } from "next";

const baseUrl = "https://pictogo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages = ["/", "/compress", "/resize", "/convert", "/privacy", "/feedback"];
  const longTailPages = ["/jpg-to-webp", "/png-to-jpg", "/webp-to-jpg", "/compress-image-to-1mb", "/compress-image-to-500kb", "/crop-image-to-square", "/resize-image-to-16-9", "/batch-image-compressor"];
  return [...corePages, ...longTailPages].map(path => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === "/privacy" ? "yearly" : "weekly", priority: path === "/" ? 1 : path === "/feedback" ? 0.5 : longTailPages.includes(path) ? 0.7 : 0.8 }));
}
