"use client"

import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useIsPWA } from "@/hooks/useIsPWA"
import AddToHomeScreenModal from "./AddToHomeScreenModal"

const STORAGE_KEY = "add-to-home-dismissed"
const DISMISS_DAYS = 7

function wasDismissedRecently(): boolean {
  if (typeof window === "undefined") return false
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const ts = parseInt(raw, 10)
    if (Number.isNaN(ts)) return false
    const days = (Date.now() - ts) / (24 * 60 * 60 * 1000)
    return days < DISMISS_DAYS
  } catch {
    return false
  }
}

function setDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

export default function AddToHomeScreenBanner() {
  const isMobile = useIsMobile()
  const isPWA = useIsPWA()
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isMobile || isPWA || wasDismissedRecently()) return
    setShowBanner(true)
  }, [isMobile, isPWA])

  const handleOpenGuide = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const handleDismiss = () => {
    setDismissed()
    setShowBanner(false)
    setShowModal(false)
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">홈 화면에 추가</span>하면
            앱처럼 편하게 사용할 수 있어요.
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={handleOpenGuide}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              추가 방법
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      <AddToHomeScreenModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      />
    </>
  )
}
