"use client"

import { useState } from "react"

type AddToHomeScreenModalProps = {
  isOpen: boolean
  onClose: () => void
}

type TabId = "ios" | "android"

export default function AddToHomeScreenModal({
  isOpen,
  onClose,
}: AddToHomeScreenModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("ios")

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-home-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2
            id="add-to-home-title"
            className="text-lg font-semibold text-gray-900"
          >
            홈 화면에 추가하기
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="닫기"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="border-b border-gray-200">
          <div
            role="tablist"
            aria-label="OS 선택"
            className="flex border-b border-gray-100"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "ios"}
              aria-controls="ios-panel"
              id="ios-tab"
              onClick={() => setActiveTab("ios")}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === "ios"
                  ? "text-emerald-600 border-emerald-600"
                  : "text-gray-500 border-transparent"
              }`}
            >
              🍎 iOS (iPhone / iPad)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "android"}
              aria-controls="android-panel"
              id="android-tab"
              onClick={() => setActiveTab("android")}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === "android"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent"
              }`}
            >
              🤖 Android
            </button>
          </div>

          <div
            id="ios-panel"
            role="tabpanel"
            className={`p-5 ${activeTab !== "ios" ? "hidden" : ""}`}
          >
            <ol className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  1
                </span>
                <span>
                  Safari에서 <strong>공유</strong> 버튼
                  <span className="ml-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
                    □↑
                  </span>
                  를 탭하세요.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  2
                </span>
                <span>
                  아래로 스크롤하여 <strong>홈 화면에 추가</strong>를 탭하세요.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  3
                </span>
                <span>
                  <strong>추가</strong>를 탭하면 홈 화면에 앱 아이콘이 생성됩니다.
                </span>
              </li>
            </ol>
          </div>

          <div
            id="android-panel"
            role="tabpanel"
            className={`p-5 ${activeTab !== "android" ? "hidden" : ""}`}
          >
            <ol className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                  1
                </span>
                <span>
                  Chrome 주소창 오른쪽의 <strong>⋮</strong> (메뉴) 버튼을 탭하세요.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                  2
                </span>
                <span>
                  <strong>홈 화면에 추가</strong> 또는 <strong>앱 설치</strong>를 탭하세요.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                  3
                </span>
                <span>
                  <strong>추가</strong> 또는 <strong>설치</strong>를 탭하면 홈 화면에 앱 아이콘이 생성됩니다.
                </span>
              </li>
            </ol>
          </div>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
