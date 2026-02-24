"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"
import type { Stock } from "@/lib/market"

const tooltipContentStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
} as const

const formatBillion = (value: unknown) =>
  typeof value === "number" ? `${(value / 100).toFixed(1)}억` : ""

type TwinPullChartProps = {
  data: Stock[]
  isMobile: boolean
}

export default function TwinPullChart({ data, isMobile }: TwinPullChartProps) {
  const height = isMobile ? 520 : 420

  if (isMobile) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 8, bottom: 5 }}
          style={{ fontFamily: "Pretendard, sans-serif" }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis
            type="number"
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: "#374151" }}
            tickFormatter={(v) => `${(v / 100).toFixed(0)}억`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={72}
            stroke="#9ca3af"
            tick={{ fontSize: 11, fontWeight: 500, fill: "#374151" }}
          />
          <Tooltip
            contentStyle={tooltipContentStyle}
            formatter={formatBillion}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend />
          <Bar
            dataKey="institutionAmount"
            name="기관"
            fill="#10b981"
            radius={[0, 6, 6, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="foreignAmount"
            name="외국인"
            fill="#2563eb"
            radius={[0, 6, 6, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} style={{ fontFamily: "Pretendard, sans-serif" }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          stroke="#9ca3af"
          interval={0}
          tick={{ fontSize: 11, fontWeight: 500, fill: "#374151" }}
        />
        <YAxis
          stroke="#9ca3af"
          tick={{ fontSize: 11, fill: "#374151" }}
          tickFormatter={(value) => `${(value / 100).toFixed(0)}억`}
        />
        <Tooltip
          contentStyle={tooltipContentStyle}
          formatter={formatBillion}
          labelStyle={{ fontWeight: 600 }}
        />
        <Legend />
        <Bar
          dataKey="institutionAmount"
          name="기관"
          fill="#10b981"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
        />
        <Bar
          dataKey="foreignAmount"
          name="외국인"
          fill="#2563eb"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
