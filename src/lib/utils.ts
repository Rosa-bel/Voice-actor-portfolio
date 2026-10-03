export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/** "1:15" -> 75 */
export function parseDuration(d: string): number {
  const [m, s] = d.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const CATEGORY_EVENT = "select-category";
