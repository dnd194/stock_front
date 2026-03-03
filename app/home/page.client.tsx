"use client"

import { useEffect, useState, useRef } from "react"
import NProgress from "nprogress"
import type {
  Stock,
  MarketRefinedResponse,
  MarketListResponse,
} from "@/lib/market"
import {
  isBeforeFirstAggregation,
  isInstitutionDataUnavailableWindow,
  isWeekendClosedWindow,
} from "@/lib/kst"
import { useIsMobile } from "@/hooks/useIsMobile"
import ChartSkeleton from "@/components/home/ChartSkeleton"
import PreMarketScreen from "@/components/home/PreMarketScreen"
import WeekendClosedScreen from "@/components/home/WeekendClosedScreen"
import SummaryCards from "@/components/home/SummaryCards"
import AggregationNotices from "@/components/home/AggregationNotices"
import TwinPullChart, {
  type ChartSeries,
} from "@/components/home/TwinPullChart"
import StockCard from "@/components/home/StockCard"
import GeminiSummaryModal from "@/components/home/GeminiSummaryModal"

const GEMINI_RETRY_DELAY_MS = 4000
const GEMINI_RETRY_MAX = 6

export type HomeView = "twin" | "foreign" | "institution"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

function fetchRefined(): Promise<MarketRefinedResponse> {
  return fetch(`${apiUrl}/market/refined`).then((res) => res.json())
}

function fetchForeign(): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/market/foreign`).then((res) => res.json())
}

function fetchInstitution(): Promise<MarketListResponse> {
  return fetch(`${apiUrl}/market/institution`).then((res) => res.json())
}

function fetchForView(view: HomeView) {
  if (view === "twin") return fetchRefined()
  if (view === "foreign") return fetchForeign()
  return fetchInstitution()
}

function getChartSeries(view: HomeView): ChartSeries {
  if (view === "foreign") return "foreign"
  if (view === "institution") return "institution"
  return "both"
}

function getPageTitle(view: HomeView): string {
  if (view === "twin") return "오늘의 쌍끌이 종목 Top 10"
  if (view === "foreign") return "외국인 순매수 Top 10"
  return "기관 순매수 Top 10"
}

export default function HomePageClient({
  view = "twin",
}: {
  view?: HomeView
}) {
  const [data, setData] = useState<Stock[]>([])
  const [geminiText, setGeminiText] = useState("")
  const [geminiPending, setGeminiPending] = useState(false)
  const [geminiModalOpen, setGeminiModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showInstitutionUnavailableBanner, setShowInstitutionUnavailableBanner] =
    useState(false)
  const [isWeekendClosed, setIsWeekendClosed] = useState<boolean | null>(null)
  const [isPreMarket, setIsPreMarket] = useState<boolean | null>(null)
  const isMobile = useIsMobile()
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryCountRef = useRef(0)

  useEffect(() => {
    setShowInstitutionUnavailableBanner(isInstitutionDataUnavailableWindow())
    setIsWeekendClosed(isWeekendClosedWindow())
    setIsPreMarket(isBeforeFirstAggregation())
  }, [])

  useEffect(() => {
    if (isWeekendClosed === true) {
      setIsLoading(false)
      NProgress.done()
      return
    }

    if (isPreMarket === true) {
      setIsLoading(false)
      NProgress.done()
      return
    }
    if (isWeekendClosed === false && isPreMarket === false) {
      NProgress.start()
      Promise.all([
        fetchForView(view),
        view !== "twin" ? fetchRefined() : null,
      ])
        .then(([mainRes, refinedRes]) => {
          if (mainRes.success && Array.isArray(mainRes.data?.refined)) {
            setData(mainRes.data.refined)
          }
          const geminiSource = refinedRes ?? mainRes
          if (
            geminiSource.success &&
            "gemini" in geminiSource.data
          ) {
            const refined = geminiSource.data as MarketRefinedResponse["data"]
            if (refined.gemini?.text) {
              setGeminiText(refined.gemini.text)
              setGeminiPending(false)
            } else if (refined.geminiPending === true) {
              setGeminiPending(true)
            }
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

  // geminiPending일 때 10초마다 재호출 (최대 GEMINI_RETRY_MAX회)
  useEffect(() => {
    if (!geminiPending || geminiText) return

    const scheduleRetry = () => {
      retryTimeoutRef.current = setTimeout(() => {
        retryCountRef.current += 1
        fetchRefined().then((res) => {
          if (res.success && res.data?.gemini?.text) {
            setGeminiText(res.data.gemini.text)
            setGeminiPending(false)
            retryCountRef.current = 0
          } else if (retryCountRef.current < GEMINI_RETRY_MAX) {
            scheduleRetry()
          } else {
            setGeminiPending(false)
            retryCountRef.current = 0
          }
        })
      }, GEMINI_RETRY_DELAY_MS)
    }

    scheduleRetry()

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }
  }, [geminiPending, geminiText])

  if (isWeekendClosed === null || isPreMarket === null) return <ChartSkeleton />
  if (isWeekendClosed) return <WeekendClosedScreen />
  if (isPreMarket) return <PreMarketScreen />
  if (isLoading) return <ChartSkeleton />

  const displayedList = data.slice(0, 10)
  const chartSeries = getChartSeries(view)
  const pageTitle = getPageTitle(view)
  const totalForeign = data.reduce((acc, cur) => acc + cur.foreignAmount, 0)
  const totalInstitution = data.reduce(
    (acc, cur) => acc + cur.institutionAmount,
    0
  )
  const totalFund = data.reduce((acc, cur) => acc + cur.fundAmount, 0)

  return (
    <main>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{pageTitle}</h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 whitespace-nowrap overflow-x-auto">
        ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
      </p>

      <AggregationNotices
        showInstitutionUnavailableBanner={showInstitutionUnavailableBanner}
      />

      {(geminiPending || geminiText) && (
        <div className="mb-6 flex justify-center">
          {geminiPending && !geminiText && (
            <p className="text-sm text-gray-500">AI 요약 생성 중…</p>
          )}
        </div>
      )}

      <SummaryCards
        totalForeign={totalForeign}
        totalInstitution={totalInstitution}
        totalFund={totalFund}
      />

      <section className="relative bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-sm mb-10 sm:mb-12">
        {geminiText && !isMobile && (
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              onClick={() => setGeminiModalOpen(true)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              ✨ AI 분석
            </button>
          </div>
        )}
        <TwinPullChart
          data={displayedList}
          isMobile={isMobile}
          series={chartSeries}
        />
      </section>

      {geminiText && isMobile && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            type="button"
            onClick={() => setGeminiModalOpen(true)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-lg hover:bg-gray-50"
          >
            ✨ AI 분석
          </button>
        </div>
      )}

      <section
        className="space-y-4"
        aria-label={
          view === "twin"
            ? "오늘의 쌍끌이 종목 목록"
            : view === "foreign"
              ? "외국인 순매수 종목 목록"
              : "기관 순매수 종목 목록"
        }
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

      <GeminiSummaryModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        text={geminiText}
      />
    </main>
  )
}
