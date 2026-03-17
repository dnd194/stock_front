"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type HomeSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const buyMenu = {
  label: "순매수",
  children: [
    { href: "/", label: "Top10" },
    { href: "/total-buy-top30", label: "상위종목" },
    { href: "/date", label: "날짜검색" },
  ],
} as const

const sellMenu = {
  label: "순매도",
  children: [
    { href: "/total-sell-top30", label: "상위종목" },
  ],
} as const

function isBuyActive(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/foreign-buy-top10" ||
    pathname === "/institution-buy-top10" ||
    pathname.startsWith("/total-buy-top30") ||
    pathname.startsWith("/foreign-buy-top30") ||
    pathname.startsWith("/institution-buy-top30") ||
    pathname.startsWith("/date")
  )
}

function isSellActive(pathname: string) {
  return (
    pathname.startsWith("/total-sell-top30") ||
    pathname.startsWith("/foreign-sell-top30") ||
    pathname.startsWith("/institution-sell-top30")
  )
}

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return (
      pathname === "/" ||
      pathname === "/foreign-buy-top10" ||
      pathname === "/institution-buy-top10"
    )
  }
  if (href === "/total-buy-top30") {
    return (
      pathname === "/total-buy-top30" ||
      pathname === "/foreign-buy-top30" ||
      pathname === "/institution-buy-top30"
    )
  }
  if (href === "/date") return pathname.startsWith("/date")
  if (href === "/total-sell-top30") {
    return (
      pathname === "/total-sell-top30" ||
      pathname === "/foreign-sell-top30" ||
      pathname === "/institution-sell-top30"
    )
  }
  return pathname === href
}

export default function HomeSidebar({ isOpen, onClose }: HomeSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 sm:bg-transparent"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-64 border-l border-gray-200 bg-white shadow-xl
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="메뉴"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm font-semibold text-gray-700">메뉴</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="메뉴 닫기"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {[buyMenu, sellMenu].map((menu) => {
              const isActive =
                menu.label === "순매수" ? isBuyActive(pathname) : isSellActive(pathname)

              return (
                <li key={menu.label}>
                  <div
                    className={`
                      rounded-lg px-4 py-3 text-sm font-semibold transition
                      ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600"}
                    `}
                  >
                    {menu.label}
                  </div>
                  <ul className="mt-1 pl-4 space-y-1 border-l-2 border-gray-200 ml-2">
                    {menu.children.map(({ href, label }) => {
                      const linkActive = isLinkActive(pathname, href)
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={onClose}
                            className={`
                              block rounded-lg px-3 py-2 text-sm font-medium transition
                              ${linkActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                            `}
                          >
                            {label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
