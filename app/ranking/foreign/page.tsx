import type { Metadata } from "next"
import RankingPageClient from "@/components/ranking/RankingPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "외국인 순매수 상위종목",
  description:
    "외국인 순매수 상위종목을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
  alternates: {
    canonical: `${siteUrl}/ranking/foreign`,
  },
  openGraph: {
    title: "외국인 순매수 상위종목 | 오늘의 쌍끌이",
    description:
      "외국인 순매수 상위종목을 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
    url: `${siteUrl}/ranking/foreign`,
    type: "website",
    locale: "ko_KR",
    images: [{ url: seoImageUrl, width: 1024, height: 576, alt: "쌍끌이 SEO" }],
  },
}

export default function RankingForeignPage() {
  return <RankingPageClient view="foreign" />
}
