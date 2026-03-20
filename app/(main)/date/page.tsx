import { redirect } from "next/navigation"

const MIN_DATE = "2026-03-10"

function getYesterdayDateString(): string {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const d = new Date(kstMs)
  d.setUTCDate(d.getUTCDate() - 1)
  const y = d.getUTCFullYear()
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = d.getUTCDate().toString().padStart(2, "0")
  const yesterday = `${y}-${m}-${day}`
  return yesterday >= MIN_DATE ? yesterday : MIN_DATE
}

export default function DateRedirectPage() {
  redirect(`/date/${getYesterdayDateString()}`)
}
