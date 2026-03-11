"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileMoreButton() {
  const pathname = usePathname()
  if (pathname.startsWith("/ranking")) return null

  return (
    <div className="fixed bottom-16 right-6 z-30 sm:hidden">
      <Link
        href="/ranking/total"
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-lg hover:bg-gray-50"
      >
        <svg
          className="h-4 w-4 shrink-0"
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
        <span>더보기</span>
      </Link>
    </div>
  )
}
