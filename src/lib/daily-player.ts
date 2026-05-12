import players from "@/data/players.json";

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getDailyPlayerIndex(dateStr: string): number {
  const hash = hashDate(dateStr);
  return hash % players.length;
}

export function getDailyPlayer(dateStr: string) {
  const index = getDailyPlayerIndex(dateStr);
  return players[index];
}

export function getTodayDateStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getDailyNumber(dateStr: string): number {
  const epoch = new Date("2026-01-01");
  const current = new Date(dateStr);
  const diffMs = current.getTime() - epoch.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}
