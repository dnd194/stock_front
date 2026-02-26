import type { Metadata } from "next"
import SplashPageClient from "./page.client"

export const metadata: Metadata = {
  title: "오늘의 쌍끌이",
  description: "오늘의 외국인·기관 동시 순매수 종목을 확인하세요.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page() {
  return <SplashPageClient />
}