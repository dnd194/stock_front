"use client"

import { useEffect, useState } from "react"
import NProgress from "nprogress"
import type { Stock, MarketRefinedResponse } from "@/lib/market"
import {
  isBeforeFirstAggregation,
  isInstitutionDataUnavailableWindow,
} from "@/lib/kst"
import { useIsMobile } from "@/hooks/useIsMobile"
import ChartSkeleton from "@/components/home/ChartSkeleton"
import PreMarketScreen from "@/components/home/PreMarketScreen"
import SummaryCards from "@/components/home/SummaryCards"
import AggregationNotices from "@/components/home/AggregationNotices"
import TwinPullChart from "@/components/home/TwinPullChart"
import StockCard from "@/components/home/StockCard"

export default function HomePage() {
  const [data, setData] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showInstitutionUnavailableBanner, setShowInstitutionUnavailableBanner] =
    useState(false)
  const [isPreMarket, setIsPreMarket] = useState<boolean | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    setShowInstitutionUnavailableBanner(isInstitutionDataUnavailableWindow())
    setIsPreMarket(isBeforeFirstAggregation())
  }, [])

  useEffect(() => {
    if (isPreMarket === true) {
      setIsLoading(false)
      NProgress.done()
      return
    }
    if (isPreMarket === false) {
      NProgress.start()
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/market/refined`)
        .then((res) => res.json())
        .then((res: MarketRefinedResponse) => {
          if (res.success && Array.isArray(res.data)) {
            setData(res.data)
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
  }, [isPreMarket])

  if (isPreMarket === null) return <ChartSkeleton />
  if (isPreMarket) return <PreMarketScreen />
  if (isLoading) return <ChartSkeleton />

  const top10 = data.slice(0, 10)
  const totalForeign = data.reduce((acc, cur) => acc + cur.foreignAmount, 0)
  const totalInstitution = data.reduce(
    (acc, cur) => acc + cur.institutionAmount,
    0
  )
  const totalFund = data.reduce((acc, cur) => acc + cur.fundAmount, 0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        오늘의 쌍끌이 종목 Top 10
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 whitespace-nowrap overflow-x-auto">
        ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
      </p>

      <AggregationNotices
        showInstitutionUnavailableBanner={showInstitutionUnavailableBanner}
      />

      <SummaryCards
        totalForeign={totalForeign}
        totalInstitution={totalInstitution}
        totalFund={totalFund}
      />

      <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-sm mb-10 sm:mb-12">
        <TwinPullChart data={top10} isMobile={isMobile} />
      </div>

      <div className="space-y-4">
        {data.map((stock) => (
          <StockCard key={stock.code} stock={stock} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-xs sm:text-sm text-gray-500 whitespace-nowrap overflow-x-auto">
          ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
        </p>
      </div>
    </div>
  )
}
