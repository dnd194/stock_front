"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import NProgress from "nprogress"
import type { Stock, MarketRefinedResponse, MarketListResponse } from "@/lib/market"
import {
  isBeforeFirstAggregation,
  isWeekendClosedWindow,
} from "@/lib/kst"
import ChartSkeleton from "@/components/screens/ChartSkeleton"
import PreMarketScreen from "@/components/screens/PreMarketScreen"
import WeekendClosedScreen from "@/components/screens/WeekendClosedScreen"
import StockCard from "@/components/stock/StockCard"

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const DISPLAY_LIMIT = 30

export type SellView = "total" | "foreign" | "institution"

function fetchRefined(): Promise<MarketRefinedResponse> {
  return fetch(`${apiUrl}/sell/total`).then((res) => res.json())
}

function fetchForeign(): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/sell/foreign`).then((res) => res.json())
}

function fetchInstitution(): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/sell/institution`).then((res) => res.json())
}

function fetchForView(view: SellView) {
  if (view === "total") return fetchRefined()
  if (view === "foreign") return fetchForeign()
  return fetchInstitution()
}

function getPageTitle(view: SellView): string {
  if (view === "total") return "순매도 상위종목 쌍매도"
  if (view === "foreign") return "순매도 상위종목 외국인"
  return "순매도 상위종목 기관"
}

export default function SellPageClient({
  view = "total",
}: {
  view?: SellView
}) {
  const [data, setData] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isWeekendClosed, setIsWeekendClosed] = useState<boolean | null>(null)
  const [isPreMarket, setIsPreMarket] = useState<boolean | null>(null)

  useEffect(() => {
    setIsWeekendClosed(isWeekendClosedWindow())
    setIsPreMarket(isBeforeFirstAggregation())
  }, [])

  useEffect(() => {
    if (isWeekendClosed === true || isPreMarket === true) {
      setIsLoading(false)
      NProgress.done()
      return
    }
    if (isWeekendClosed === false && isPreMarket === false) {
      NProgress.start()
      fetchForView(view)
        .then((res) => {
          if (res.success && Array.isArray(res.data?.refined)) {
            setData(res.data.refined)
          }
          setTimeout(() => {
            setIsLoading(false)
            NProgress.done()
          }, 1000)
        })
        .catch(() => {
          setIsLoading(false)
          NProgress.done()
        })
      return () => {
        NProgress.done()
      }
    }
  }, [isPreMarket, isWeekendClosed, view])

  if (isWeekendClosed === null || isPreMarket === null) return <ChartSkeleton />
  if (isWeekendClosed) return <WeekendClosedScreen />
  if (isPreMarket) return <PreMarketScreen />
  if (isLoading) return <ChartSkeleton />

  const displayedList = data.slice(0, DISPLAY_LIMIT)
  const pageTitle = getPageTitle(view)

  return (
    <main>
      <div className="mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold shrink-0">{pageTitle}</h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 whitespace-nowrap overflow-x-auto">
        ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
      </p>

      <section
        className="space-y-4"
        aria-label={`${pageTitle} 목록`}
      >
        {displayedList.map((stock: Stock) => (
          <StockCard key={stock.code} stock={stock} />
        ))}
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-xs sm:text-sm text-gray-500 whitespace-nowrap overflow-x-auto">
          ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
        </p>
      </footer>

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-lg hover:bg-gray-50"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Top10</span>
        </Link>
      </div>
    </main>
  )
}
