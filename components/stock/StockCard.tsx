import type { ReactNode } from "react"
import type { Stock } from "@/lib/market"

type StockCardProps = {
  stock: Stock
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 23c4.97 0 8-3.58 8-8 0-3.31-2.69-6.41-3.99-8.5-.83-1.45-1.5-2.5-2.01-3.5C12.7 6.45 12.2 8.24 12 10c-.43-2.5-1.5-4-2-5-.5 1-1.17 2.05-2 3.5C6.69 8.59 4 11.69 4 15c0 4.42 3.03 8 8 8z" />
    </svg>
  )
}

/** 신규 매수세(1일·0일): 연속 스냅샷 0 → 불꽃 아님 */
function NewFlowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.4 7.44h7.8l-6.3 4.56 2.4 7.44L12 16.88l-6.3 4.56 2.4-7.44-6.3-4.56h7.8L12 2z" />
    </svg>
  )
}

/** 매수세 재유입(1일·1일): 상승·회복 흐름 (불꽃과 구분) */
function ReentryTrendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MetricHelpDetails({ children }: { children: ReactNode }) {
  return (
    <details className="group mt-1.5">
      <summary
        className="flex cursor-pointer list-none items-center gap-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 [&::-webkit-details-marker]:hidden"
        aria-label="지표 설명 펼치기"
      >
        <ChevronIcon className="h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
        <span className="underline decoration-gray-300 underline-offset-2">
          지표 설명
        </span>
      </summary>
      <div className="mt-2 border-t border-black/5 pt-2 text-[11px] sm:text-xs leading-relaxed text-gray-600">
        {children}
      </div>
    </details>
  )
}

function NetBuyStreakBlock({ stock }: { stock: Stock }) {
  const daysInWindow = stock.netBuyDaysInWindow ?? 0
  const consecutive = stock.netBuyConsecutiveDays ?? 0
  if (daysInWindow < 1 && consecutive < 1) return null

  const isNewBuyingFlow = daysInWindow === 1 && consecutive === 0
  const isReentryOnly = daysInWindow === 1 && consecutive === 1

  if (isNewBuyingFlow) {
    return (
      <div className="mt-3 rounded-lg border border-sky-100 bg-sky-50/90 px-3 py-2.5">
        <div className="flex gap-2.5">
          <NewFlowIcon className="h-5 w-5 shrink-0 text-sky-600" />
          <div className="min-w-0 flex-1 text-xs sm:text-sm">
            <p className="font-medium text-sky-950">신규 매수세 · 순위 첫 진입</p>
            <p className="mt-0.5 text-[11px] text-sky-900/80">
              최근 7일 중 순위 진입 <strong className="tabular-nums">1</strong>일
              · 연속{" "}
              <strong className="tabular-nums">0</strong>일
            </p>
            <MetricHelpDetails>
              <p>
                구간 안에서는 이 순매수 유형 순위에 올라온 날이 하루뿐이고,
                스냅샷 기준으로는 직전 날과 이어지는 연속 매수 흐름이
                잡히지 않은 상태에 가깝습니다. 다일 연속 강세(불꽃) 패턴이
                아니라, 이번에 새로 나타난 매수세로 보는 편이 자연스러워요.
              </p>
            </MetricHelpDetails>
          </div>
        </div>
      </div>
    )
  }

  if (isReentryOnly) {
    return (
      <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/90 px-3 py-2.5">
        <div className="flex gap-2.5">
          <ReentryTrendIcon className="h-5 w-5 shrink-0 text-emerald-600" />
          <div className="min-w-0 flex-1 text-xs sm:text-sm">
            <p className="font-medium text-emerald-950">
              간만의 순위 진입 · 매수세 재유입
            </p>
            <MetricHelpDetails>
              <p>
                최근 7일 안에서는 오늘만 이 순매수 유형 순위에 들어왔고, 연속으로
                이어진 날도 하루뿐이라 직전 구간에서는 끊어져 있던 흐름이에요.
                연속 순매수가 쌓인 패턴이라기보다는, 한동안 순위 밖이었다가
                다시 매수세가 들어온 것으로 볼 수 있습니다.
              </p>
            </MetricHelpDetails>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50/90 px-3 py-2.5">
      <div className="flex gap-2.5">
        <FlameIcon className="h-5 w-5 shrink-0 text-orange-500" />
        <div className="min-w-0 flex-1 text-xs sm:text-sm">
          <p className="font-medium text-orange-950">
            최근 7일 중{" "}
            <strong className="tabular-nums">{daysInWindow}</strong>일 순위
            진입
            {consecutive >= 1 ? (
              <>
                {" "}
                · 연속{" "}
                <strong className="tabular-nums">{consecutive}</strong>일
              </>
            ) : null}
          </p>
          <MetricHelpDetails>
            <p>
              <span className="font-medium text-gray-700">순위 진입 일수:</span>{" "}
              최근 7일(캘린더) 안에서, 현재 보고 있는 순매수 유형 순위에 이름을
              올린 서로 다른 날의 수입니다.
            </p>
            <p className="mt-2">
              <span className="font-medium text-gray-700">연속 일수:</span>{" "}
              DB 스냅샷 날짜를 전체 종목 기준 가장 최근 날부터 과거로 볼 때,
              그 흐름에서 끊기지 않고 이어진 연속 일수입니다.
            </p>
          </MetricHelpDetails>
        </div>
      </div>
    </div>
  )
}

export default function StockCard({ stock }: StockCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">{stock.name}</h2>
          <p className="text-sm text-gray-500">
            외국인 {stock.foreignAmount.toLocaleString()} · 기관{" "}
            {stock.institutionAmount.toLocaleString()} · 기금{" "}
            {stock.fundAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-cyan-600 font-semibold">
          {stock.totalAmount.toLocaleString()}
        </div>
      </div>

      <NetBuyStreakBlock stock={stock} />

      <div className="mt-4 space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(stock.foreignAmount / stock.totalAmount) * 100}%`,
            }}
          />
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500"
            style={{
              width: `${(stock.institutionAmount / stock.totalAmount) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
