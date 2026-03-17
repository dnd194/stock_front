import { Suspense } from "react"
import HomeHeader from "@/components/layout/HomeHeader"
import MobileMoreButton from "@/components/layout/MobileMoreButton"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8">
      <Suspense fallback={<div className="h-14 mb-6 sm:mb-8" />}>
        <HomeHeader />
      </Suspense>
      {children}
      <MobileMoreButton />
    </div>
  )
}
