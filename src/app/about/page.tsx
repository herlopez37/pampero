"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DIMENSIONS = [
  {
    name: "Década de debut",
    desc: 'Cuándo debutó profesionalmente. 🟩 exacto · 🟨 ±1 década · ⬜ más lejos',
  },
  {
    name: "Posición",
    desc: "Arquero / Defensor / Volante / Delantero. 🟩 exacto · ⬜ no",
  },
  {
    name: "Nacionalidad",
    desc: "Argentina / Otro país sudamericano / Resto. 🟩 exacto · 🟨 categoría adyacente",
  },
  {
    name: "Club en Argentina",
    desc: "Su club principal en el fútbol argentino. 🟩 exacto · ⬜ no",
  },
  {
    name: "Títulos internacionales",
    desc: "0 / 1-2 / 3+. 🟩 exacto · 🟨 categoría adyacente · ⬜ lejos",
  },
  {
    name: "Selección Argentina",
    desc: "¿Jugó en la Selección Mayor? 🟩 sí/no correcto · ⬜ incorrecto",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-zinc-800 sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-white text-lg">Cómo jugar</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-white font-bold text-xl mb-3">¿Qué es Pampero?</h2>
          <p className="text-zinc-400 leading-relaxed">
            Pampero es un juego diario para hinchas del fútbol argentino. Cada
            día aparece un jugador diferente (mismo para todos). Tenés{" "}
            <span className="text-white font-semibold">6 intentos</span> para
            adivinarlo.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">Las pistas</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Cada intento revela 6 dimensiones del jugador propuesto, comparadas
            con el objetivo:
          </p>
          <div className="space-y-3">
            {DIMENSIONS.map((d) => (
              <div key={d.name} className="bg-zinc-800 rounded-lg p-3">
                <p className="text-white font-semibold text-sm">{d.name}</p>
                <p className="text-zinc-400 text-xs mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">Colores</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-green-600" />
              <span className="text-zinc-300 text-sm">Exacto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-500" />
              <span className="text-zinc-300 text-sm">Cerca</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-zinc-700" />
              <span className="text-zinc-300 text-sm">Lejos</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-zinc-300 text-sm">
            Un nuevo jugador aparece cada día a medianoche.
            Tus estadísticas se guardan en este dispositivo.
          </p>
        </div>

        <Link href="/" className="block">
          <Button className="w-full bg-green-600 hover:bg-green-500 text-white">
            ¡A jugar!
          </Button>
        </Link>
      </main>
    </div>
  );
}
