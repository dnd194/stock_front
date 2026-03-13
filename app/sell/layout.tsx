import HomeHeader from "@/components/layout/HomeHeader"
import MobileMoreButton from "@/components/layout/MobileMoreButton"

export default function SellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8">
      <HomeHeader />
      {children}
      <MobileMoreButton />
    </div>
  )
}
