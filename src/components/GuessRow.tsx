"use client";

import { motion } from "framer-motion";
import { type CompareResult, type Player } from "@/lib/game-logic";

interface GuessRowProps {
  player: Player;
  result: CompareResult;
  rowIndex: number;
}

const CELL_LABELS: (keyof CompareResult)[] = [
  "debutDecade",
  "position",
  "nationality",
  "mainArgClub",
  "intTitles",
  "playedForNationalTeam",
];

const CELL_HEADERS = ["Década", "Posición", "Nación", "Club", "Títulos", "Selección"];

function cellColor(status: "match" | "close" | "miss"): string {
  if (status === "match") return "bg-green-600 border-green-500";
  if (status === "close") return "bg-yellow-500 border-yellow-400";
  return "bg-zinc-700 border-zinc-600";
}

function formatValue(key: keyof CompareResult, player: Player): string {
  if (key === "playedForNationalTeam") {
    return player.playedForNationalTeam ? "Sí" : "No";
  }
  if (key === "debutDecade") return player.debutDecade;
  if (key === "position") return player.position;
  if (key === "nationality") {
    if (player.nationality === "Otro país sudamericano") return "Sudamér.";
    return player.nationality;
  }
  if (key === "mainArgClub") {
    const club = player.mainArgClub;
    if (club.length > 10) return club.split(" ").slice(0, 2).join(" ");
    return club;
  }
  if (key === "intTitles") return player.intTitles;
  return "";
}

export default function GuessRow({ player, result, rowIndex }: GuessRowProps) {
  return (
    <div className="flex gap-1 sm:gap-2 w-full">
      <div className="flex items-center min-w-[120px] sm:min-w-[160px] pr-2 border-r border-zinc-700">
        <span className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
          {player.name}
        </span>
      </div>
      <div className="flex gap-1 sm:gap-2 flex-1">
        {CELL_LABELS.map((key, i) => (
          <motion.div
            key={key}
            className={`flex-1 flex flex-col items-center justify-center rounded border text-center p-1 sm:p-2 min-h-[50px] sm:min-h-[60px] ${cellColor(result[key])}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{
              delay: rowIndex * 0.1 + i * 0.15,
              duration: 0.3,
              type: "spring",
              stiffness: 200,
            }}
          >
            <span className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-wide leading-tight">
              {CELL_HEADERS[i]}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-white leading-tight mt-0.5">
              {formatValue(key, player)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
