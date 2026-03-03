"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { href: "/home", label: "쌍끌이" },
  { href: "/home/foreign", label: "외국인" },
  { href: "/home/institution", label: "기관" },
] as const

export default function HomeTabs() {
  const pathname = usePathname()

  return (
    <nav
      className="flex gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200 mb-6 sm:mb-8"
      aria-label="종목 순위 탭"
    >
      {tabs.map(({ href, label }) => {
        const isActive =
          href === "/home"
            ? pathname === "/home"
            : pathname.startsWith(href)
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
  )
}
