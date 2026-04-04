"use client"

import { Suspense, type ReactNode } from "react"
import HomeHeader from "@/components/layout/HomeHeader"
import MobileMoreButton from "@/components/layout/MobileMoreButton"
import { useWeekendClosedChrome } from "@/components/layout/WeekendClosedChromeProvider"

export default function MainLayoutShell({ children }: { children: ReactNode }) {
  const { hideChrome } = useWeekendClosedChrome()

  return (
    <div
      className={
        hideChrome
          ? "min-h-screen text-gray-900"
          : "min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8"
      }
    >
      {!hideChrome && (
        <Suspense fallback={<div className="h-14 mb-6 sm:mb-8" />}>
          <HomeHeader />
        </Suspense>
      )}
      {children}
      {!hideChrome && <MobileMoreButton />}
    </div>
  )
}
