import HomeTabs from "@/components/home/HomeTabs"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8">
      <HomeTabs />
      {children}
    </div>
  )
}
