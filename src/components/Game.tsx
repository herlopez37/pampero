"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart2, Info, Trophy } from "lucide-react";
import GuessRow from "@/components/GuessRow";
import PlayerInput from "@/components/PlayerInput";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  compare,
  isWin,
  type CompareResult,
  type Player,
} from "@/lib/game-logic";
import {
  getDailyPlayer,
  getDailyNumber,
  getTodayDateStr,
} from "@/lib/daily-player";
import {
  loadDayState,
  saveDayState,
  recordResult,
  type DayState,
} from "@/lib/stats";

const MAX_GUESSES = 6;

const DIMENSION_LABELS = [
  "Década",
  "Posición",
  "Nación",
  "Club",
  "Títulos",
  "Selección",
];

function winMessage(attempts: number): string {
  if (attempts <= 2) return "¡Sos un crack! 🏆";
  if (attempts <= 4) return "Bien ahí, la rompiste 💪";
  if (attempts === 5) return "Por poquito, pero entraste 😅";
  return "Lo tenías, pero al final llegaste 🤌";
}

function isSanLorenzoPlayer(player: Player): boolean {
  return player.mainArgClub === "San Lorenzo";
}

export default function Game() {
  const [dateStr] = useState(() => getTodayDateStr());
  const [target] = useState<Player>(() => getDailyPlayer(dateStr) as Player);
  const [dailyNumber] = useState(() => getDailyNumber(dateStr));

  const [guesses, setGuesses] = useState<Player[]>([]);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultRecorded, setResultRecorded] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadDayState(dateStr);
    if (saved) {
      setGuesses([]);
      setResults([]);
      setFinished(saved.finished);
      setWon(saved.won);
      if (saved.finished) {
        setShowResult(true);
      }
    }
    setHydrated(true);
  }, [dateStr]);

  useEffect(() => {
    if (hydrated) return;
  }, [hydrated]);

  function handleGuess(player: Player) {
    if (finished) return;
    const result = compare(player, target);
    const newGuesses = [...guesses, player];
    const newResults = [...results, result];
    const win = isWin(result);
    const lost = !win && newGuesses.length >= MAX_GUESSES;
    const done = win || lost;

    setGuesses(newGuesses);
    setResults(newResults);

    if (done) {
      setFinished(true);
      setWon(win);
      setTimeout(() => setShowResult(true), 600);

      if (!resultRecorded) {
        recordResult(dateStr, win, newGuesses.length);
        setResultRecorded(true);
      }

      const state: DayState = {
        date: dateStr,
        guesses: newGuesses.map((g) => g.name),
        won: win,
        lost,
        finished: true,
      };
      saveDayState(state);
    } else {
      const state: DayState = {
        date: dateStr,
        guesses: newGuesses.map((g) => g.name),
        won: false,
        lost: false,
        finished: false,
      };
      saveDayState(state);
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse space-y-4 w-full max-w-2xl px-4">
          <div className="h-10 bg-zinc-800 rounded w-48 mx-auto" />
          <div className="h-6 bg-zinc-800 rounded w-32 mx-auto" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-zinc-800 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const usedNames = guesses.map((g) => g.name);
  const attemptsLeft = MAX_GUESSES - guesses.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-white">
            ⚽ Pampero
          </h1>
          <div className="flex gap-2">
            <Link href="/stats">
              <Button variant="ghost" size="icon" title="Estadísticas">
                <BarChart2 className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="icon" title="Cómo jugar">
                <Info className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-3 sm:px-4 py-4 flex flex-col gap-4">
        {/* Day info */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm">
            Pampero #{dailyNumber} · {attemptsLeft > 0 && !finished
              ? `${attemptsLeft} intento${attemptsLeft !== 1 ? "s" : ""} restante${attemptsLeft !== 1 ? "s" : ""}`
              : finished
              ? won
                ? "¡Lo adivinaste!"
                : "Se acabó el tiempo"
              : ""}
          </p>
        </div>

        {/* Column headers */}
        <div className="flex gap-1 sm:gap-2 w-full text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wide">
          <div className="min-w-[120px] sm:min-w-[160px] pr-2">Jugador</div>
          <div className="flex gap-1 sm:gap-2 flex-1">
            {DIMENSION_LABELS.map((label) => (
              <div key={label} className="flex-1 text-center">
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Guess grid */}
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {guesses.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GuessRow player={player} result={results[i]} rowIndex={i} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty rows */}
          {!finished &&
            [...Array(MAX_GUESSES - guesses.length)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex gap-1 sm:gap-2 w-full opacity-30"
              >
                <div className="min-w-[120px] sm:min-w-[160px] h-[50px] sm:h-[60px] border border-dashed border-zinc-700 rounded" />
                <div className="flex gap-1 sm:gap-2 flex-1">
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="flex-1 h-[50px] sm:h-[60px] border border-dashed border-zinc-700 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        {!finished && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PlayerInput
              onGuess={handleGuess}
              usedNames={usedNames}
              disabled={finished}
            />
          </motion.div>
        )}

        {/* Hint */}
        {!finished && guesses.length === 0 && (
          <p className="text-center text-zinc-500 text-xs">
            Escribí el nombre de un futbolista argentino para empezar
          </p>
        )}
      </main>

      {/* Result dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {won ? (
                <span className="flex flex-col items-center gap-2">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  {winMessage(guesses.length)}
                  {isSanLorenzoPlayer(target) && (
                    <span className="text-blue-400 text-sm">¡Cuervo de alma! 💙❤️</span>
                  )}
                </span>
              ) : (
                <span className="flex flex-col items-center gap-2">
                  <span className="text-2xl">😔</span>
                  Mañana te toma revancha
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="bg-zinc-800 rounded-lg p-4 w-full text-center">
              <p className="text-zinc-400 text-sm mb-1">El jugador era</p>
              <p className="text-2xl font-bold text-white">{target.name}</p>
              <p className="text-zinc-400 text-sm mt-1">
                {target.position} · {target.mainArgClub} · {target.debutDecade}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <ShareButton
                dailyNumber={dailyNumber}
                guessCount={guesses.length}
                maxGuesses={MAX_GUESSES}
                results={results}
                won={won}
              />
              <Link href="/stats" className="w-full">
                <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:text-white">
                  Ver mis estadísticas
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
