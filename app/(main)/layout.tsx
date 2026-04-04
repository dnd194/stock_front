import MainLayoutShell from "@/components/layout/MainLayoutShell"
import { WeekendClosedChromeProvider } from "@/components/layout/WeekendClosedChromeProvider"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WeekendClosedChromeProvider>
      <MainLayoutShell>{children}</MainLayoutShell>
    </WeekendClosedChromeProvider>
  )
}
