type SummaryCardsProps = {
  totalForeign: number
  totalInstitution: number
  totalFund: number
}

export default function SummaryCards({
  totalForeign,
  totalInstitution,
  totalFund,
}: SummaryCardsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:flex sm:justify-between text-center">
        <div className="flex flex-col sm:block justify-center py-2 sm:py-0 border-b border-gray-100 sm:border-0 last:border-0">
          <p className="text-gray-500 text-sm">외국인 총 매수</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
            {totalForeign.toLocaleString()} 백만
          </p>
        </div>
        <div className="flex flex-col sm:block justify-center py-2 sm:py-0 border-b border-gray-100 sm:border-0 last:border-0">
          <p className="text-gray-500 text-sm">기관 총 매수</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
            {totalInstitution.toLocaleString()} 백만
          </p>
        </div>
        <div className="flex flex-col sm:block justify-center py-2 sm:py-0">
          <p className="text-gray-500 text-sm">기금 총 매수</p>
          <p className="text-xl sm:text-2xl font-bold text-cyan-600 mt-1">
            {totalFund.toLocaleString()} 백만
          </p>
        </div>
      </div>
    </div>
  )
}
