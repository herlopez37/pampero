export type CompareStatus = "match" | "close" | "miss";

export interface CompareResult {
  debutDecade: CompareStatus;
  position: CompareStatus;
  nationality: CompareStatus;
  mainArgClub: CompareStatus;
  intTitles: CompareStatus;
  playedForNationalTeam: CompareStatus;
}

export interface Player {
  id: number;
  name: string;
  debutDecade: string;
  position: string;
  nationality: string;
  mainArgClub: string;
  intTitles: string;
  playedForNationalTeam: boolean;
  verified: boolean;
}

const DECADE_ORDER = [
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
];

const TITLES_ORDER = ["0", "1-2", "3+"];

export function compareDecade(
  guess: string,
  target: string
): CompareStatus {
  if (guess === target) return "match";
  const gi = DECADE_ORDER.indexOf(guess);
  const ti = DECADE_ORDER.indexOf(target);
  if (gi === -1 || ti === -1) return "miss";
  return Math.abs(gi - ti) <= 1 ? "close" : "miss";
}

export function compareTitles(
  guess: string,
  target: string
): CompareStatus {
  if (guess === target) return "match";
  const gi = TITLES_ORDER.indexOf(guess);
  const ti = TITLES_ORDER.indexOf(target);
  if (gi === -1 || ti === -1) return "miss";
  return Math.abs(gi - ti) === 1 ? "close" : "miss";
}

export function compareNationality(
  guess: string,
  target: string
): CompareStatus {
  if (guess === target) return "match";
  const both = [guess, target];
  if (both.includes("Argentina") && both.includes("Otro país sudamericano"))
    return "close";
  if (
    both.includes("Otro país sudamericano") &&
    both.includes("Resto")
  )
    return "close";
  return "miss";
}

export function compare(guess: Player, target: Player): CompareResult {
  return {
    debutDecade: compareDecade(guess.debutDecade, target.debutDecade),
    position:
      guess.position === target.position ? "match" : "miss",
    nationality: compareNationality(guess.nationality, target.nationality),
    mainArgClub:
      guess.mainArgClub === target.mainArgClub ? "match" : "miss",
    intTitles: compareTitles(guess.intTitles, target.intTitles),
    playedForNationalTeam:
      guess.playedForNationalTeam === target.playedForNationalTeam
        ? "match"
        : "miss",
  };
}

export function isWin(result: CompareResult): boolean {
  return Object.values(result).every((v) => v === "match");
}
