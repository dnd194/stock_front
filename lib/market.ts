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
  data: Stock[]
  message: string
  timestamp: string
}
