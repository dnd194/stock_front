"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts"

import NProgress from "nprogress";
type Stock = {
  name: string
  code: string
  foreignQty: number
  institutionQty: number
  foreignAmount: number
  institutionAmount: number
  fundAmount: number
  totalAmount: number
}

type MarketRefinedResponse = {
  success: boolean
  data: Stock[]
  message: string
  timestamp: string
}

// Skeleton 컴포넌트
function ChartSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="h-10 bg-gray-200 rounded mb-8 w-64 animate-pulse" />
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 h-32 animate-pulse" />
      <div className="bg-white border border-gray-200 p-6 rounded-2xl h-96 animate-pulse" />
    </div>
  )
}

export default function HomePage() {
  const [data, setData] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로딩 시작
    NProgress.start();

    fetch("http://localhost:3001/market/refined")
      .then((res) => res.json())
      .then((res: MarketRefinedResponse) => {
        if (res.success && Array.isArray(res.data)) {
          setData(res.data);
        }
        setTimeout(() => {
          setIsLoading(false);
          NProgress.done(); // 로딩 완료
        }, 1000); // 부드러운 등장 딜레이
      })
      .catch(() => {
        setIsLoading(false);
        NProgress.done();
      });

    // cleanup
    return () => {
      NProgress.done();
    };
  }, []);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  const top10 = data.slice(0, 10)

  const totalForeign = data.reduce((acc, cur) => acc + cur.foreignAmount, 0)
  const totalInstitution = data.reduce((acc, cur) => acc + cur.institutionAmount, 0)
  const totalFund = data.reduce((acc, cur) => acc + cur.fundAmount, 0)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">

      {/* 🔥 1️⃣ 헤더 */}
      <h1 className="text-3xl font-bold mb-2">
        오늘의 쌍끌이 종목 Top 10
      </h1>
      
      {/* 📝 데이터 출처 표시 */}
      <p className="text-sm text-gray-500 mb-8">
        ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
      </p>

      {/* 📊 2️⃣ 요약 카드 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <div className="flex justify-between text-center">
          <div>
            <p className="text-gray-500 text-sm">외국인 총 매수</p>
            <p className="text-2xl font-bold text-blue-600">
              {totalForeign.toLocaleString()} 백만
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">기관 총 매수</p>
            <p className="text-2xl font-bold text-emerald-600">
              {totalInstitution.toLocaleString()} 백만
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">기금 총 매수</p>
            <p className="text-2xl font-bold text-cyan-600">
              {totalFund.toLocaleString()} 백만
            </p>
          </div>
        </div>
      </div>

      {/* 📈 3️⃣ 전체 비교 차트 (top10) */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-12">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={top10}
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              interval={0}
              tick={{
                fontSize: 11,
                fontWeight: 500,
                fill: "#374151"
              }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{
                fontSize: 11,
                fill: "#374151"
              }}
              tickFormatter={(value) => `${(value / 100).toFixed(0)}억`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
              }}
              formatter={(value) =>
                typeof value === "number" ? `${(value / 100).toFixed(1)}억` : ""
              }
              labelStyle={{
                fontWeight: 600
              }}
            />

            <Legend />


            {/* 기관 */}
            <Bar
              dataKey="institutionAmount"
              name="기관"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />

            {/* 외국인 */}
            <Bar
              dataKey="foreignAmount"
              name="외국인"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
            
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🏷 4️⃣ 종목 카드 리스트 */}
      <div className="space-y-4">
        {data.map(stock => (
          <div
            key={stock.code}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">
                  {stock.name}
                </h2>
                <p className="text-sm text-gray-500">
                  외국인 {stock.foreignAmount.toLocaleString()} ·
                  기관 {stock.institutionAmount.toLocaleString()} ·
                  기금 {stock.fundAmount.toLocaleString()}
                </p>
              </div>

              <div className="text-cyan-600 font-semibold">
                {stock.totalAmount.toLocaleString()}
              </div>
            </div>

            {/* 강도 바 */}
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${
                      (stock.foreignAmount / stock.totalAmount) * 100
                    }%`
                  }}
                />
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${
                      (stock.institutionAmount / stock.totalAmount) * 100
                    }%`
                  }}
                />
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* 📝 데이터 출처 표시 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          ** 본 데이터는 한국투자증권 OpenAPI를 기반으로 제공됩니다. **
        </p>
      </div>

    </div>
  )
}