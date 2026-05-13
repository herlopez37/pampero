"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { type CompareResult } from "@/lib/game-logic";

interface ShareButtonProps {
  dailyNumber: number;
  guessCount: number;
  maxGuesses: number;
  results: CompareResult[];
  won: boolean;
}

function emojiRow(result: CompareResult): string {
  const keys: (keyof CompareResult)[] = [
    "debutDecade",
    "position",
    "nationality",
    "mainArgClub",
    "intTitles",
    "playedForNationalTeam",
  ];
  return keys
    .map((k) => {
      if (result[k] === "match") return "🟩";
      if (result[k] === "close") return "🟨";
      return "⬜";
    })
    .join("");
}

export default function ShareButton({
  dailyNumber,
  guessCount,
  maxGuesses,
  results,
  won,
}: ShareButtonProps) {
  function handleShare() {
    const scoreStr = won ? `${guessCount}/${maxGuesses}` : `X/${maxGuesses}`;
    const rows = results.map(emojiRow).join("\n");
    const text = `Pampero #${dailyNumber} — ${scoreStr}\n${rows}\npampero.vercel.app`;

    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("¡Copiado! Mandáselo a tus amigos 🤙"))
      .catch(() => toast.error("No se pudo copiar, intentá de nuevo"));
  }

  return (
    <Button
      onClick={handleShare}
      className="bg-green-600 hover:bg-green-500 text-white gap-2"
    >
      <Share2 className="w-4 h-4" />
      Compartir resultado
    </Button>
  );
}
