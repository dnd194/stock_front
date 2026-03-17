import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const kstMs = today.getTime() + 9 * 60 * 60 * 1000
  const d = new Date(kstMs)
  const todayStr = `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${siteUrl}/foreign-buy-top10`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/institution-buy-top10`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/total-buy-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/foreign-buy-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/institution-buy-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/total-sell-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/foreign-sell-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/institution-sell-top30`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${siteUrl}/date`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/date/${todayStr}`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ]
}
