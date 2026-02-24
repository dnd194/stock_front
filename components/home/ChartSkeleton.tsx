export default function ChartSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="h-10 bg-gray-200 rounded mb-8 w-64 animate-pulse" />
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-10 h-32 animate-pulse" />
      <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl h-96 animate-pulse" />
    </div>
  )
}
