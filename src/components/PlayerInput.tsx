"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import players from "@/data/players.json";
import { type Player } from "@/lib/game-logic";

interface PlayerInputProps {
  onGuess: (player: Player) => void;
  usedNames: string[];
  disabled?: boolean;
}

export default function PlayerInput({
  onGuess,
  usedNames,
  disabled,
}: PlayerInputProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const suggestions = query.length >= 1
    ? players.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) &&
          !usedNames.includes(p.name)
      ).slice(0, 8)
    : [];

  function handleSelect(player: Player) {
    onGuess(player as Player);
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  useEffect(() => {
    setOpen(suggestions.length > 0 && query.length >= 1);
  }, [suggestions.length, query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribí un jugador..."
        disabled={disabled}
        className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-400"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {open && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-zinc-800 border border-zinc-600 rounded-md shadow-xl max-h-60 overflow-y-auto"
        >
          {suggestions.map((player) => (
            <button
              key={player.id}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors flex items-center gap-2"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(player as Player);
              }}
            >
              <span className="font-medium">{player.name}</span>
              <span className="text-zinc-500 text-xs ml-auto">
                {player.position} · {player.debutDecade}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
