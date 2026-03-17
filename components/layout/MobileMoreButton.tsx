"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const buyMenu = {
  label: "순매수",
  children: [
    { href: "/", label: "Top10" },
    { href: "/ranking/total", label: "상위종목" },
    { href: "/history/total", label: "날짜검색" },
  ],
} as const

const sellMenu = {
  label: "순매도",
  children: [
    { href: "/sell/total", label: "상위종목" },
  ],
} as const

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "/foreign" || pathname === "/institution"
  }
  if (href.startsWith("/ranking")) return pathname.startsWith("/ranking")
  if (href.startsWith("/history")) return pathname.startsWith("/history")
  if (href.startsWith("/sell")) return pathname.startsWith("/sell")
  return pathname === href
}

export default function MobileMoreButton() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname.startsWith("/ranking") || pathname.startsWith("/sell") || pathname.startsWith("/history")) return null

  return (
    <div className="fixed bottom-16 right-6 z-40 md:hidden flex flex-col items-end gap-2">
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="relative z-50 w-48 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            <nav className="p-2" aria-label="더보기 메뉴">
              <ul className="space-y-1">
                {[buyMenu, sellMenu].map((menu) => (
                  <li key={menu.label}>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-700">
                      {menu.label}
                    </div>
                    <ul className="space-y-0.5">
                      {menu.children.map(({ href, label }) => {
                        const linkActive = isLinkActive(pathname, href)
                        return (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={() => setMenuOpen(false)}
                              className={`
                                block rounded-lg px-3 py-2.5 text-sm font-medium transition
                                ${linkActive ? "bg-gray-100 text-gray-900" : "text-gray-600 active:bg-gray-50"}
                              `}
                            >
                              {label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`
          flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-lg hover:bg-gray-50
          ${menuOpen ? "ring-2 ring-gray-300" : ""}
        `}
      >
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span><strong>더보기</strong></span>
      </button>
    </div>
  )
}
