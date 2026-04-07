export type Stock = {
  name: string
  code: string
  foreignQty: number
  institutionQty: number
  foreignAmount: number
  institutionAmount: number
  fundAmount: number
  totalAmount: number
  /** 최근 NET_BUY_STREAK_LOOKBACK_DAYS(예: 7일) 안에서 해당 순매수 유형 순위에 들어간 서로 다른 날의 수 */
  netBuyDaysInWindow?: number
  /** 스냅샷 날짜(최신→과거) 기준 맨 앞부터 끊기지 않고 이어진 연속 일수 */
  netBuyConsecutiveDays?: number
}

export type MarketRefinedResponse = {
  success: boolean
  data: {
    refined: Stock[]
    gemini: { text: string } | null
    geminiPending?: boolean
  }
  message: string
  timestamp: string
}

export type MarketListResponse = {
  success: boolean
  data: {
    refined: Stock[]
  }
  message: string
  timestamp: string
}
