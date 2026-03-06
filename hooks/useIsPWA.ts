"use client"

import { useEffect, useState } from "react"

/** PWA(standalone) 모드로 실행 중인지 확인 */
export function useIsPWA(): boolean {
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    const check = () => {
      const standaloneMedia = window.matchMedia("(display-mode: standalone)").matches
      const iosStandalone =
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
      setIsPWA(standaloneMedia || iosStandalone)
    }
    check()
  }, [])

  return isPWA
}
