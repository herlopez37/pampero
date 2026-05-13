# ⚽ Pampero

**Wordle diario de futbolistas argentinos.**

Adiviná el jugador del día en 6 intentos. Cada intento revela 6 pistas sobre el jugador propuesto comparadas con el objetivo (🟩 exacto, 🟨 cerca, ⬜ lejos). Mismo jugador para todos los usuarios cada día.

**Repo:** https://github.com/herlopez37/pampero

## Cómo jugar

1. Escribí el nombre de un futbolista en el input (autocomplete incluido)
2. Elegí uno y se revelan 6 pistas:
   - **Década de debut** — cuándo debutó profesionalmente (🟨 si ±1 década)
   - **Posición** — Arquero / Defensor / Volante / Delantero
   - **Nacionalidad** — Argentina / Otro país sudamericano / Resto
   - **Club en Argentina** — su club principal en el fútbol argentino
   - **Títulos internacionales** — 0 / 1-2 / 3+ (🟨 si categoría adyacente)
   - **Selección** — ¿jugó en la Selección Argentina mayor?
3. Tenés 6 intentos. El resultado se guarda en tu dispositivo.

## Correr en local

```bash
git clone https://github.com/herlopez37/pampero
cd pampero
npm install
npm run dev
# Abre http://localhost:3000
```

## Tests

```bash
npm test
# 24 tests unitarios pasando
```

## 🚀 Deploy en Vercel

### Opción A: desde vercel.com (más fácil)

1. Entrá a [vercel.com](https://vercel.com) y logueate
2. Click **"Add New Project"** → Importá `herlopez37/pampero`
3. Dejá todo por default → click **"Deploy"**
4. En ~2 min tenés URL pública. Renombrá el proyecto a `pampero` para que quede `pampero.vercel.app`

### Opción B: CLI

```bash
# Si no tenés vercel CLI:
npm install -g vercel

# Login y deploy
vercel login
cd ~/Desktop/pampero
vercel --prod
```

### Opción C: npm script

```bash
cd ~/Desktop/pampero
npm run deploy  # alias para npx vercel --prod
```

## Stack

| Tecnología | Uso |
|-----------|-----|
| Next.js 16 (App Router) | Framework |
| TypeScript | Tipado estricto |
| Tailwind CSS v4 | Estilos |
| shadcn/ui | Componentes UI |
| Framer Motion | Animaciones |
| Vitest | Tests unitarios |
| localStorage | Persistencia (racha, stats) |

## Dataset

110 jugadores del fútbol argentino verificados (1960s–2020s):
- Distribución por eras: 14 × 1960s, 15 × 1970s, 12 × 1980s, 23 × 1990s, 21 × 2000s, 21 × 2010s, 4 × 2020s
- Jugadores marcados `"verified": false` tienen datos para revisar
- River Plate ligeramente sobre 25% (28%) — es la realidad del fútbol argentino

## Ideas para v0.2

- Backend para estadísticas globales y ranking mundial
- Modo difícil (4 intentos)
- Ligas internacionales
- Historial de jugadores pasados
- Login social
- Multiplayer / torneos entre amigos

---

Hecho con ❤️ por Hernán · Powered by Claude Code
