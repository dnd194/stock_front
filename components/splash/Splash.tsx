"use client"

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white animate-fadeIn">

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          오늘의 쌍끌이
        </h1>
        <p className="text-gray-500 mt-3 text-sm">
          외국인 · 기관 동반 매수 종목 분석
        </p>
      </div>

      {/* 금융 느낌 막대 애니메이션 */}
      <div className="flex items-end gap-2 mb-10 h-12">
        <div className="w-2 bg-blue-400 rounded animate-bar1" />
        <div className="w-2 bg-blue-500 rounded animate-bar2" />
        <div className="w-2 bg-blue-600 rounded animate-bar3" />
        <div className="w-2 bg-blue-500 rounded animate-bar2" />
        <div className="w-2 bg-blue-400 rounded animate-bar1" />
      </div>

      <p className="text-xs text-gray-400 mt-4">
        데이터를 불러오는 중...
      </p>
    </div>
  )
}