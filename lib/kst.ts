/** KST 0시 기준 분 단위 (0~1439) */
export function getKSTMinutes(): number {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const kstDate = new Date(kstMs)
  return kstDate.getUTCHours() * 60 + kstDate.getUTCMinutes()
}

/** KST 현재 시각 포맷 "HH:mm" */
export function getKSTTimeString(): string {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const d = new Date(kstMs)
  const h = d.getUTCHours()
  const m = d.getUTCMinutes()
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

/** 08:00 ~ 09:30 미만 KST: 프리마켓 → 대체 화면, API 미호출 */
export function isBeforeFirstAggregation(): boolean {
  const total = getKSTMinutes()
  const start = 8 * 60 + 0   // 08:00
  const end = 9 * 60 + 30   // 09:30 직전까지
  return total >= start && total < end
}

/** 09:30 ~ 10:00 KST: 기관 데이터 미집계 → 배너 표시 */
export function isInstitutionDataUnavailableWindow(): boolean {
  const totalMinutes = getKSTMinutes()
  const start = 9 * 60 + 30  // 09:30
  const end = 10 * 60 + 0    // 10:00
  return totalMinutes >= start && totalMinutes <= end
}

/** 토요일 08:00 ~ 월요일 00:00 KST: 주말 휴장 안내 화면 */
export function isWeekendClosedWindow(): boolean {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const kstDate = new Date(kstMs)
  const day = kstDate.getUTCDay() // 0: Sun, 1: Mon, ... 6: Sat
  const totalMinutes = kstDate.getUTCHours() * 60 + kstDate.getUTCMinutes()

  // Sat 08:00 이후
  if (day === 6 && totalMinutes >= 8 * 60) return true
  // Sun 종일
  if (day === 0) return true
  // Mon 00:00 직전까지(00:00 포함 안 함)
  if (day === 1 && totalMinutes < 1) return true

  return false
}
