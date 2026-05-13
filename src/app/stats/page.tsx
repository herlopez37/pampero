"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadStats, winRate, type Stats } from "@/lib/stats";

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

export default function StatsPage() {
  const [stats, setStats] = useState<Stats>(defaultStats());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStats(loadStats());
    setHydrated(true);
  }, []);

  const maxDist = Math.max(...Object.values(stats.distribution), 1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-zinc-800 sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-white text-lg">Mis estadísticas</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {!hydrated ? (
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-zinc-800 rounded" />
            <div className="h-48 bg-zinc-800 rounded" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Jugados", value: stats.played },
                { label: "% Victorias", value: winRate(stats) },
                { label: "Racha actual", value: stats.currentStreak },
                { label: "Mejor racha", value: stats.maxStreak },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center bg-zinc-800 rounded-lg p-3 text-center"
                >
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-[10px] text-zinc-400 mt-1 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Distribution */}
            <div>
              <h2 className="text-zinc-300 font-semibold mb-4 text-sm uppercase tracking-wide">
                Distribución de intentos
              </h2>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((n) => {
                  const count = stats.distribution[String(n)] ?? 0;
                  const pct = maxDist > 0 ? (count / maxDist) * 100 : 0;
                  return (
                    <div key={n} className="flex items-center gap-3">
                      <span className="text-zinc-300 text-sm w-3 text-right">
                        {n}
                      </span>
                      <div className="flex-1 bg-zinc-800 rounded-sm h-7 overflow-hidden">
                        <div
                          className="h-full bg-green-600 flex items-center justify-end pr-2 rounded-sm transition-all duration-500"
                          style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                        >
                          {count > 0 && (
                            <span className="text-white text-xs font-bold">
                              {count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {stats.played === 0 && (
              <div className="text-center py-8">
                <p className="text-zinc-500 text-sm">
                  Todavía no jugaste ninguna partida.
                </p>
                <Link href="/" className="mt-4 inline-block">
                  <Button className="bg-green-600 hover:bg-green-500 text-white">
                    Jugar ahora
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
