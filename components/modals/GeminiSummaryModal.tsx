"use client"

type GeminiSummaryModalProps = {
  isOpen: boolean
  onClose: () => void
  text: string
}

/** **text** → strong, ### → 제목, 줄바꿈 유지 */
function simpleMarkdown(html: string): string {
  const lines = html.split("\n")
  const out: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("### ")) {
      out.push(`<p class="mt-4 mb-1 font-bold text-gray-900">${escapeHtml(trimmed.slice(4))}</p>`)
    } else if (trimmed.startsWith("## ")) {
      out.push(`<p class="mt-4 mb-1 font-bold text-gray-900">${escapeHtml(trimmed.slice(3))}</p>`)
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      out.push(`<p class="font-semibold text-gray-900">${escapeHtml(trimmed.slice(2, -2))}</p>`)
    } else {
      const escaped = escapeHtml(trimmed)
      const bold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      out.push(`<p class="mb-1">${bold}</p>`)
    }
  }
  return out.join("")
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export default function GeminiSummaryModal({
  isOpen,
  onClose,
  text,
}: GeminiSummaryModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white shadow-xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">AI 수급 요약</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="닫기"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 py-4 text-sm text-gray-700 [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-900"
          dangerouslySetInnerHTML={{
            __html: simpleMarkdown(text || "요약 내용이 없습니다."),
          }}
        />
      </div>
    </>
  )
}
