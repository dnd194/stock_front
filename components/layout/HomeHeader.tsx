"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import HomeSidebar from "./HomeSidebar"

const top10Tabs = [
  { href: "/", label: "쌍끌이" },
  { href: "/foreign-buy-top10", label: "외국인" },
  { href: "/institution-buy-top10", label: "기관" },
] as const

const rankingTabs = [
  { href: "/total-buy-top30", label: "쌍끌이" },
  { href: "/foreign-buy-top30", label: "외국인" },
  { href: "/institution-buy-top30", label: "기관" },
] as const

const sellTabs = [
  { href: "/total-sell-top30", label: "쌍매도" },
  { href: "/foreign-sell-top30", label: "외국인" },
  { href: "/institution-sell-top30", label: "기관" },
] as const

export default function HomeHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isSell =
    pathname.startsWith("/total-sell") ||
    pathname.startsWith("/foreign-sell") ||
    pathname.startsWith("/institution-sell")
  const isRanking =
    pathname.startsWith("/total-buy-top30") ||
    pathname.startsWith("/foreign-buy-top30") ||
    pathname.startsWith("/institution-buy-top30")
  const isHistory = pathname.startsWith("/date/")
  const dateMatch = pathname.match(/^\/date\/(\d{4}-\d{2}-\d{2})$/)
  const historyTabs = dateMatch
    ? [
        { href: `/date/${dateMatch[1]}`, label: "쌍끌이" },
        { href: `/date/${dateMatch[1]}?view=foreign`, label: "외국인" },
        { href: `/date/${dateMatch[1]}?view=institution`, label: "기관" },
      ]
    : [
        { href: "/date", label: "쌍끌이" },
        { href: "/date?view=foreign", label: "외국인" },
        { href: "/date?view=institution", label: "기관" },
      ]
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
            let isActive: boolean
            if (href === "/") {
              isActive = pathname === "/"
            } else if (href.includes("?")) {
              const [path, query] = href.split("?")
              const view = query?.replace("view=", "")
              isActive =
                pathname === path && searchParams.get("view") === view
            } else if (isHistory && pathname.startsWith("/date/")) {
              // 쌍끌이 탭: view 파라미터가 없을 때만 활성
              isActive = pathname === href && !searchParams.get("view")
            } else {
              isActive = pathname === href
            }
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
