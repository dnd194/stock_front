export type Stock = {
  name: string
  code: string
  foreignQty: number
  institutionQty: number
  foreignAmount: number
  institutionAmount: number
  fundAmount: number
  totalAmount: number
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
