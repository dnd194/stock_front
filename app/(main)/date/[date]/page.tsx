import type { Metadata } from "next"
import HistoryDatePageClient from "@/components/history/HistoryDatePageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const seoImagePath = "/seoImage_resize.png"
const seoImageUrl = `${siteUrl}${seoImagePath}`

const MIN_DATE = "2026-03-10"

type Props = {
  params: Promise<{ date: string }>
  searchParams: Promise<{ view?: string }>
}

function isValidDate(date: string): boolean {
  const match = date.match(/^\d{4}-\d{2}-\d{2}$/)
  if (!match) return false
  const d = new Date(date)
  return !isNaN(d.getTime())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params
  if (!isValidDate(date) || date < MIN_DATE) {
    return { title: "날짜별 순매수 | 오늘의 쌍끌이" }
  }
  return {
    title: `${date} 외국인·기관 순매수`,
    description: `${date} 날짜의 외국인·기관 동시 순매수 상위 종목을 확인하세요. 한국투자증권 OpenAPI 기반 제공.`,
    alternates: {
      canonical: `${siteUrl}/date/${date}`,
    },
    openGraph: {
      title: `${date} 외국인·기관 순매수 | 오늘의 쌍끌이`,
      description: `${date} 날짜의 외국인·기관 동시 순매수 상위 종목을 확인하세요.`,
      url: `${siteUrl}/date/${date}`,
      type: "website",
      locale: "ko_KR",
      images: [{ url: seoImageUrl, width: 1024, height: 576, alt: "쌍끌이 SEO" }],
    },
  }
}

export default async function DatePage({ params, searchParams }: Props) {
  const { date } = await params
  const { view } = await searchParams

  const validView =
    view === "foreign" || view === "institution" ? view : "total"
  const effectiveDate =
    isValidDate(date) && date >= MIN_DATE ? date : MIN_DATE

  return (
    <HistoryDatePageClient
      initialDate={effectiveDate}
      view={validView}
    />
  )
}
