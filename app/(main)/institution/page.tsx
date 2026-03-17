import type { Metadata } from "next"
import HomePageClient from "../page.client"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "기관 순매수 Top10",
  description:
    "기관 순매수 상위 종목 Top 10을 실시간으로 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
  keywords: [
    "기관 순매수",
    "기관 매수 종목",
    "쌍끌이",
    "코스피",
    "한국투자증권 OpenAPI",
  ],
  alternates: {
    canonical: `${siteUrl}/institution`,
  },
  openGraph: {
    title: "기관 순매수 Top10 | 오늘의 쌍끌이",
    description:
      "기관 순매수 상위 종목 Top 10을 실시간으로 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
    url: `${siteUrl}/institution`,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: seoImageUrl,
        width: 1024,
        height: 576,
        alt: "대한민국 국기를 배경으로 상승하는 코스피 주식 시장 그래프",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "기관 순매수 Top10 | 오늘의 쌍끌이",
    description:
      "기관 순매수 상위 종목 Top 10을 실시간으로 확인하세요. 한국투자증권 OpenAPI 기반 제공.",
    images: [seoImageUrl],
  },
}

export default function InstitutionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "기관 순매수 Top10 | 오늘의 쌍끌이",
    description:
      "기관 순매수 상위 종목 Top 10을 실시간으로 제공합니다.",
    inLanguage: "ko-KR",
    url: `${siteUrl}/institution`,
    image: seoImageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "오늘의 쌍끌이",
      url: siteUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient view="institution" />
    </>
  )
}
