import type { MetadataRoute } from "next";
import { restaurantConfig } from "@/data/restaurantConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = restaurantConfig.siteUrl;
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/menu", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  return routes.map((r) => ({ url: `${base}${r.path}`, lastModified: new Date(), changeFrequency: "monthly", priority: r.priority }));
}
