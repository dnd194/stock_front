"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type HomeSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { href: "/home", label: "Top10" },
  { href: "/ranking/total", label: "상위종목" },
] as const

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
            {menuItems.map(({ href, label }) => {
              const isActive =
                href === "/home"
                  ? pathname === "/home" ||
                    pathname === "/home/foreign" ||
                    pathname === "/home/institution"
                  : pathname.startsWith("/ranking")
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`
                      block rounded-lg px-4 py-3 text-sm font-medium transition
                      ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
