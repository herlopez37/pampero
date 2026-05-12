export interface DayState {
  date: string;
  guesses: string[];
  won: boolean;
  lost: boolean;
  finished: boolean;
}

export interface Stats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: Record<string, number>;
  lastPlayed: string | null;
}

const KEY_DAY = "pampero_day";
const KEY_STATS = "pampero_stats";

function defaultStats(): Stats {
  return {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 },
    lastPlayed: null,
  };
}

export function loadStats(): Stats {
  if (typeof window === "undefined") return defaultStats();
  try {
    const raw = localStorage.getItem(KEY_STATS);
    if (!raw) return defaultStats();
    return { ...defaultStats(), ...JSON.parse(raw) };
  } catch {
    return defaultStats();
  }
}

export function saveStats(stats: Stats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_STATS, JSON.stringify(stats));
}

export function loadDayState(date: string): DayState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY_DAY);
    if (!raw) return null;
    const state: DayState = JSON.parse(raw);
    if (state.date !== date) return null;
    return state;
  } catch {
    return null;
  }
}

export function saveDayState(state: DayState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_DAY, JSON.stringify(state));
}

export function recordResult(
  date: string,
  won: boolean,
  attempts: number
): void {
  const stats = loadStats();
  const yesterday = getPreviousDate(date);

  stats.played += 1;
  if (won) {
    stats.wins += 1;
    const key = String(Math.min(attempts, 6));
    stats.distribution[key] = (stats.distribution[key] ?? 0) + 1;
    if (stats.lastPlayed === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    if (stats.currentStreak > stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    }
  } else {
    stats.currentStreak = 0;
  }
  stats.lastPlayed = date;
  saveStats(stats);
}

function getPreviousDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function winRate(stats: Stats): number {
  if (stats.played === 0) return 0;
  return Math.round((stats.wins / stats.played) * 100);
}
