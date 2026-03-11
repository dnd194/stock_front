type AggregationNoticesProps = {
  showInstitutionUnavailableBanner: boolean
}

export default function AggregationNotices({
  showInstitutionUnavailableBanner,
}: AggregationNoticesProps) {
  return (
    <>
      {showInstitutionUnavailableBanner && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="font-medium">⏱ 집계 시간 안내</span>
          <p className="mt-1">
            현재 시각(09:30~10:00)은 기관 데이터가 아직 집계되지 않아{" "}
            <strong>외국인 데이터만</strong> 반영됩니다.
          </p>
        </div>
      )}

      <details className="mb-6 sm:mb-8 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
        <summary className="cursor-pointer font-medium text-gray-700 select-none">
          📋 집계시간 보기
        </summary>
        <div className="mt-3 space-y-2 pl-0">
          <p>
            <strong>외국인:</strong> 09:30, 11:20, 13:20, 14:30
          </p>
          <p>
            <strong>기관종합:</strong> 10:00, 11:20, 13:20, 14:30
          </p>
          <p className="text-gray-500 text-xs mt-2">
            입력한 시간은 ±10분 정도 차이가 발생할 수 있으며, 장운영 사정에 따라
            변동될 수 있습니다.
          </p>
        </div>
      </details>
    </>
  )
}
