import type { Stock } from "@/lib/market"

type StockCardProps = {
  stock: Stock
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
