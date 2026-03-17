import { redirect } from "next/navigation"

const MIN_DATE = "2026-03-10"

function getTodayDateString(): string {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const d = new Date(kstMs)
  const y = d.getUTCFullYear()
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = d.getUTCDate().toString().padStart(2, "0")
  const today = `${y}-${m}-${day}`
  return today >= MIN_DATE ? today : MIN_DATE
}

export default function DateRedirectPage() {
  redirect(`/date/${getTodayDateString()}`)
}
