import type { Metadata } from "next"
import HistoryPageClient from "@/components/history/HistoryPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "날짜별 기관 순매수",
  description:
    "날짜별 기관 순매수 상위 종목을 검색하세요. 한국투자증권 OpenAPI 기반 제공.",
  alternates: {
    canonical: `${siteUrl}/history/institution`,
  },
  openGraph: {
    title: "날짜별 기관 순매수 | 오늘의 쌍끌이",
    description:
      "날짜별 기관 순매수 상위 종목을 검색하세요. 한국투자증권 OpenAPI 기반 제공.",
    url: `${siteUrl}/history/institution`,
    type: "website",
    locale: "ko_KR",
    images: [{ url: seoImageUrl, width: 1024, height: 576, alt: "쌍끌이 SEO" }],
  },
}

export default function HistoryInstitutionPage() {
  return <HistoryPageClient view="institution" />
}
