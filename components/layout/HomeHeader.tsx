"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import HomeSidebar from "./HomeSidebar"

const top10Tabs = [
  { href: "/home", label: "쌍끌이" },
  { href: "/home/foreign", label: "외국인" },
  { href: "/home/institution", label: "기관" },
] as const

const rankingTabs = [
  { href: "/ranking/total", label: "쌍끌이" },
  { href: "/ranking/foreign", label: "외국인" },
  { href: "/ranking/institution", label: "기관" },
] as const

const historyTabs = [
  { href: "/history/total", label: "쌍끌이" },
  { href: "/history/foreign", label: "외국인" },
  { href: "/history/institution", label: "기관" },
] as const

const sellTabs = [
  { href: "/sell/total", label: "쌍매도" },
  { href: "/sell/foreign", label: "외국인" },
  { href: "/sell/institution", label: "기관" },
] as const

export default function HomeHeader() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isSell = pathname.startsWith("/sell")
  const isRanking = pathname.startsWith("/ranking")
  const isHistory = pathname.startsWith("/history")
  const tabs = isSell ? sellTabs : isRanking ? rankingTabs : isHistory ? historyTabs : top10Tabs

  return (
    <>
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="hidden sm:flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50"
          aria-label="메뉴 열기"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className="flex flex-1 gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200"
          aria-label={
            isSell ? "순매도 상위종목 탭" :
            isRanking ? "순매수 상위종목 탭" :
            isHistory ? "날짜검색 탭" : "Top10 탭"
          }
        >
          {tabs.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex-1 sm:flex-none min-w-0 sm:min-w-[6rem] py-2.5 px-4 text-center text-sm font-medium rounded-lg transition
                  ${isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      <HomeSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  )
}
