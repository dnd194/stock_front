import type { Metadata } from "next"
import SellPageClient from "@/components/sell/SellPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "순매도 상위종목 외국인",
  description:
    "외국인 순매도 상위 종목을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
  alternates: {
    canonical: `${siteUrl}/sell/foreign`,
  },
  openGraph: {
    title: "순매도 상위종목 외국인 | 오늘의 쌍끌이",
    description:
      "외국인 순매도 상위 종목을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
    url: `${siteUrl}/sell/foreign`,
    type: "website",
    locale: "ko_KR",
    images: [{ url: seoImageUrl, width: 1024, height: 576, alt: "쌍끌이 SEO" }],
  },
}

export default function SellForeignPage() {
  return <SellPageClient view="foreign" />
}
