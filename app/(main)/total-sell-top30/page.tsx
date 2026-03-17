import type { Metadata } from "next"
import SellPageClient from "@/components/sell/SellPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "쌍매도 상위종목 Top30",
  description:
    "외국인·기관 동시 순매도 상위 종목 Top 30을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
  alternates: {
    canonical: `${siteUrl}/total-sell-top30`,
  },
  openGraph: {
    title: "순매도 상위종목 쌍매도 Top30 | 오늘의 쌍끌이",
    description:
      "외국인·기관 동시 순매도 상위 종목 Top 30을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
    url: `${siteUrl}/total-sell-top30`,
    type: "website",
    locale: "ko_KR",
    images: [{ url: seoImageUrl, width: 1024, height: 576, alt: "쌍끌이 SEO" }],
  },
}

export default function TotalSellTop30Page() {
  return <SellPageClient view="total" />
}
