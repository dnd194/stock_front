"use client"

export default function WeekendClosedScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white/85 p-8 sm:p-10 shadow-xl backdrop-blur">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
          <span className="text-3xl" aria-hidden>
            🌙
          </span>
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-bold text-slate-800">
          월요일에 만나요
        </h1>
        <p className="mt-3 text-center text-sm sm:text-base text-slate-600 leading-relaxed">
          주말 장휴장 시간에는 데이터 집계를 쉬고 있어요.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-700">운영 안내</p>
          <p className="mt-1">표시 구간: 토요일 08:00 ~ 월요일 00:00 (KST)</p>
        </div>

      </div>
    </div>
  )
}
