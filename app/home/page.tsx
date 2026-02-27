import type { Metadata } from "next"
import HomePageClient from "./page.client"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

export const metadata: Metadata = {
  title: "외국인·기관 동시 순매수 Top10",
  description:
    "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 받아보세요.",
  keywords: [
    "쌍끌이 종목",
    "외국인 순매수",
    "기관 순매수",
    "기금 순매수",
    "코스피",
    "한국투자증권 OpenAPI",
  ],
  alternates: {
    canonical: `${siteUrl}/home`,
  },
  openGraph: {
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 받아보세요.",
    url: `${siteUrl}/home`,
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
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 받아보세요.",
    images: [seoImageUrl],
  },
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 제공합니다.",
    inLanguage: "ko-KR",
    url: `${siteUrl}/home`,
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
      <HomePageClient />
    </>
  )
}
