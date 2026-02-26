"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SplashScreen from "@/components/splash/Splash"
import "nprogress/nprogress.css"

export default function SplashPageClient() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return <SplashScreen />
}
