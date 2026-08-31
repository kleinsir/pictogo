import type { MetadataRoute } from "next";

const baseUrl = "https://pictogo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/compress", "/resize", "/convert", "/privacy"].map(path => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === "/privacy" ? "yearly" : "weekly", priority: path === "/" ? 1 : 0.8 }));
}
