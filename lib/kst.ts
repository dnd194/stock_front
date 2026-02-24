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

/** 08:00 ~ 09:20 KST: 첫 집계 전 → 데이터 없음 */
export function isBeforeFirstAggregation(): boolean {
  const total = getKSTMinutes()
  const start = 8 * 60 + 0   // 08:00
  const end = 9 * 60 + 20   // 09:20 (첫 외국인 집계 09:30 - 10분 전까지)
  return total >= start && total < end
}

/** 10시 ±10분(09:50~10:10 KST)이면 기관 데이터 없음 → true */
export function isInstitutionDataUnavailableWindow(): boolean {
  const totalMinutes = getKSTMinutes()
  const start = 9 * 60 + 50  // 09:50
  const end = 10 * 60 + 10   // 10:10
  return totalMinutes >= start && totalMinutes <= end
}
