import type { Metadata } from "next"
import HomePageClient from "./page.client"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
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
    canonical: siteUrl ? `${siteUrl}/home` : "/home",
  },
  openGraph: {
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 받아보세요.",
    url: siteUrl ? `${siteUrl}/home` : "/home",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "외국인·기관 동시 순매수 상위 종목 Top 10을 확인하고 AI 분석까지 받아보세요.",
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
    url: siteUrl ? `${siteUrl}/home` : undefined,
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
