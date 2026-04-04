"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

type Ctx = {
  hideChrome: boolean
  setHideChrome: (hide: boolean) => void
}

const WeekendClosedChromeContext = createContext<Ctx | null>(null)

export function WeekendClosedChromeProvider({ children }: { children: ReactNode }) {
  const [hideChrome, setHideChrome] = useState(false)

  const value = useMemo(
    () => ({ hideChrome, setHideChrome }),
    [hideChrome]
  )

  return (
    <WeekendClosedChromeContext.Provider value={value}>
      {children}
    </WeekendClosedChromeContext.Provider>
  )
}

export function useWeekendClosedChrome() {
  const ctx = useContext(WeekendClosedChromeContext)
  if (!ctx) {
    throw new Error("useWeekendClosedChrome must be used within WeekendClosedChromeProvider")
  }
  return ctx
}
