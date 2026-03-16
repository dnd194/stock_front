"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
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
const MIN_DATE = "2026-03-10"

export type HistoryView = "total" | "foreign" | "institution"

function getInitialDate(): string {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const d = new Date(kstMs)
  const y = d.getUTCFullYear()
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = d.getUTCDate().toString().padStart(2, "0")
  const today = `${y}-${m}-${day}`
  return today >= MIN_DATE ? today : MIN_DATE
}

function fetchRefined(date: string): Promise<MarketRefinedResponse> {
  return fetch(`${apiUrl}/history/buy/total?date=${encodeURIComponent(date)}`).then((res) => res.json())
}

function fetchForeign(date: string): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/history/buy/foreign?date=${encodeURIComponent(date)}`).then((res) => res.json())
}

function fetchInstitution(date: string): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/history/buy/institution?date=${encodeURIComponent(date)}`).then((res) => res.json())
}

function fetchForView(view: HistoryView, date: string) {
  if (view === "total") return fetchRefined(date)
  if (view === "foreign") return fetchForeign(date)
  return fetchInstitution(date)
}

function getPageTitle(view: HistoryView, date: string): string {
  if (view === "total") return `${date} 쌍끌이`
  if (view === "foreign") return `${date} 외국인 순매수`
  return `${date} 기관 순매수`
}

export default function HistoryPageClient({
  view = "total",
}: {
  view?: HistoryView
}) {
  const [data, setData] = useState<Stock[]>([])
  const [selectedDate, setSelectedDate] = useState(() => getInitialDate())
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
      const effectiveDate = selectedDate >= MIN_DATE ? selectedDate : MIN_DATE
      NProgress.start()
      const fetchPromise = fetchForView(view, effectiveDate)
        .then((res) => {
          if (res.success && Array.isArray(res.data?.refined)) {
            setData(res.data.refined)
          }
          return res
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false)
            NProgress.done()
          }, 1000)
        })

      toast.promise(fetchPromise, {
        loading: "조회 중...",
        success: "조회되었습니다",
        error: "조회에 실패했습니다",
      })

      return () => {
        NProgress.done()
      }
    }
  }, [isPreMarket, isWeekendClosed, view, selectedDate])

  if (isWeekendClosed === null || isPreMarket === null) return <ChartSkeleton />
  if (isWeekendClosed) return <WeekendClosedScreen />
  if (isPreMarket) return <PreMarketScreen />

  const displayedList = data.slice(0, DISPLAY_LIMIT)
  const pageTitle = getPageTitle(view ,selectedDate)

  return (
    <main>
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold shrink-0">{pageTitle}</h1>
        <div className="shrink-0">
          <input
            type="date"
            value={selectedDate}
            min={MIN_DATE}
            onChange={(e) => {
              const val = e.target.value
              if (val >= MIN_DATE) setSelectedDate(val)
            }}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="날짜 선택"
          />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 whitespace-nowrap overflow-x-auto">
        ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
      </p>

      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <section
          className="space-y-4"
          aria-label={`${pageTitle} 목록`}
        >
          {displayedList.map((stock: Stock) => (
            <StockCard key={stock.code} stock={stock} />
          ))}
        </section>
      )}

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-xs sm:text-sm text-gray-500 whitespace-nowrap overflow-x-auto">
          ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
        </p>
      </footer>

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link
          href="/home"
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
