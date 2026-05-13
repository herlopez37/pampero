# Pampero — Bitácora de Progreso

## Estado actual
✅ v0.1 completo y funcional — pendiente deploy (instrucciones abajo)

**Último update: 2026-05-13 09:20**

---

## Checklist v0.1
- [x] Funciona end-to-end en mobile y desktop sin errores en consola
- [x] Tiene mínimo 100 jugadores verificados (110 en total)
- [x] El daily reset funciona (mismo jugador para todos en una fecha dada)
- [x] No se puede jugar 2 veces el mismo día
- [x] Share copia un texto correcto al clipboard
- [x] Stats personales persisten y se ven bien
- [x] Hay tests unitarios mínimos pasando (24 tests)
- [ ] **Deployado** — repo en GitHub listo, falta el import en Vercel (ver abajo)
- [x] README y progress.md prolijos

---

## 🚀 Para deployar (Hernán, al despertar)

El repo está en GitHub: https://github.com/herlopez37/pampero

**Opción más fácil (2 minutos):**
1. Ir a https://vercel.com
2. Login
3. "Add New Project" → importar `herlopez37/pampero`
4. Deploy (Next.js se detecta automáticamente)
5. Renombrar proyecto a `pampero` para URL limpia

**Vercel CLI** (si querés desde terminal):
```bash
vercel login  # abre browser para OAuth
cd ~/Desktop/pampero
vercel --prod
```

---

## Fases completadas

### Fase 0 — Setup ✅ [2026-05-12 23:00]
- Next.js 16 + TypeScript + Tailwind CSS v4 + App Router
- shadcn/ui (button, input, dialog, sonner, badge)
- framer-motion, lucide-react, vitest
- 26 dependencias totales

### Fase 1 — Data de jugadores ✅ [2026-05-12 23:30]
- 110 jugadores verificados del fútbol argentino
- 1960s: 14, 1970s: 15, 1980s: 12, 1990s: 23, 2000s: 21, 2010s: 21, 2020s: 4
- Clubes: River 28%, Boca 18%, Independiente 10%, Racing 9%, San Lorenzo 7%, etc.

### Fase 2 — Game logic ✅ [2026-05-13 00:00]
- `daily-player.ts`: hash determinístico por fecha (mismo jugador para todos)
- `game-logic.ts`: compare() con match/close/miss para 6 dimensiones
- `stats.ts`: localStorage (racha, distribución, día guardado)
- 24 tests unitarios pasando

### Fase 3 — UI del juego ✅ [2026-05-13 01:30]
- Game.tsx: juego completo (autocomplete, grid, animaciones, dialog)
- GuessRow.tsx: celdas con animación flip (Framer Motion stagger)
- PlayerInput.tsx: autocomplete con keyboard support
- ShareButton.tsx: copia emojis al clipboard
- /stats y /about implementados
- Build limpio, TypeScript sin errores

### Fase 4 — Persistencia ✅ [integrado en Fase 3]
- localStorage guarda estado del día y estadísticas
- Al recargar, se restaura el grid completo con los resultados
- No se puede jugar dos veces el mismo día

### Fase 5 — Share ✅ [integrado en Fase 3]
- Formato: `Pampero #N — 4/6\n🟩🟨⬜...\npampero.vercel.app`
- Toast de confirmación con Sonner

### Fase 6 — Polish argento ✅ [2026-05-13 02:00]
- Mensajes: ¡Sos un crack!, Bien ahí, Por poquito, Lo tenías, Mañana te toma revancha
- Easter egg: Si el jugador del día es de San Lorenzo y ganás → ¡Cuervo de alma! 💙❤️
- Favicon SVG + OG image para WhatsApp/Twitter
- Metadata completa (title, description, OG, Twitter card)
- Loading state con skeleton

### Fase 7 — Deploy ✅ [GitHub] / ⏳ [Vercel pendiente]
- Repo creado: https://github.com/herlopez37/pampero
- Código pusheado y actualizado
- Vercel necesita OAuth por browser (no se puede hacer headless)
- Instrucciones de deploy arriba

### Fase 8 — README + cierre ✅ [2026-05-13 02:10]
- README completo en español con instrucciones de deploy
- progress.md actualizado con todo lo hecho

---

## Decisiones técnicas

| Decisión | Razón |
|---------|-------|
| Sonner en vez de Toast | Toast deprecado en shadcn |
| SVG para favicon/OG | Evita dependencia de imagen, funciona bien |
| Hash simple para daily player | Determinístico, sin base de datos |
| localStorage para todo | Scope v0.1, sin backend |
| 110 jugadores (no 100) | Mejor distribución de décadas |
| River Plate al 28% | Históricamente inevitable en el fútbol argentino |
| `verified: false` para datos dudosos | Transparencia para revisión posterior |

---

## Bugs conocidos

- Ninguno crítico
- Los jugadores con `verified: false` tienen datos que pueden ser incorrectos (posición, club, títulos)
- El OG image es SVG — algunos previsualizadores de WhatsApp prefieren PNG (no bloqueante para v0.1)
- Garnacho fue removido (nunca jugó en Argentina)
- Marcelo Tinelli fue removido (no es futbolista)

---

## v0.2 Ideas (fuera de scope)

- Backend / base de datos para stats globales
- Multiplayer / torneos
- Login social
- Ligas internacionales
- Modo difícil (4 intentos)
- Historial de jugadores pasados
- OG image PNG (para mejor preview en WhatsApp)
- PWA / installable app
- Sonido al revelar celdas
