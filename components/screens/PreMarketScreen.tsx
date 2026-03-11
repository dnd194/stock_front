"use client"

import { useEffect, useState } from "react"
import { getKSTTimeString } from "@/lib/kst"

export default function PreMarketScreen() {
  const [kstTime, setKstTime] = useState("--:--")

  useEffect(() => {
    setKstTime(getKSTTimeString())
    const id = setInterval(() => setKstTime(getKSTTimeString()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/80 border border-slate-200 shadow-sm mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300/60" />
          <span className="text-3xl font-semibold text-slate-600 tabular-nums">{kstTime}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          아직 집계 전이에요
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mb-6">
          오늘 첫 집계는 <strong className="text-slate-700">09:30</strong> (외국인)입니다.
          <br />
          잠시 후 다시 확인해 주세요.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-left text-sm text-slate-600 shadow-sm">
          <p className="font-medium text-slate-700 mb-2">📋 집계시간</p>
          <p>외국인: 09:30, 11:20, 13:20, 14:30</p>
          <p>기관종합: 10:00, 11:20, 13:20, 14:30</p>
          <p className="mt-2 text-xs text-slate-500">
            ±10분 정도 차이 있을 수 있으며, 장운영 사정에 따라 변동될 수 있습니다.
          </p>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다.
        </p>
      </div>
    </div>
  )
}
