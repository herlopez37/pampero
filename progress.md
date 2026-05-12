# Pampero — Bitácora de Progreso

## Estado actual
🚧 En desarrollo overnight

---

## Decisiones técnicas

- Next.js 16.2.6 (latest) con App Router
- shadcn/ui con Base UI (versión actual, cambió de Radix a Base UI)
- Sonner en vez de toast (toast deprecado en shadcn)
- Vercel CLI no disponible localmente → instrucciones de deploy manual en README
- Vitest con jsdom para tests unitarios
- 26 dependencias totales (límite: 30)

---

## Fases

### Fase 0 — Setup ✅ [2026-05-12 23:00]
- Scaffold Next.js 15 con TypeScript, Tailwind, App Router
- shadcn/ui inicializado (button, input, dialog, sonner, badge)
- framer-motion, lucide-react, vitest instalados
- Estructura de directorios creada
- Commit: `chore: scaffold next.js + tailwind + shadcn`

### Fase 1 — Data de jugadores 🚧 [2026-05-12 23:10]
- Generando players.json con 100+ jugadores argentinos verificados
- En proceso...

### Fase 2 — Game logic
### Fase 3 — UI del juego
### Fase 4 — Persistencia + estadísticas
### Fase 5 — Share
### Fase 6 — Polish argento
### Fase 7 — Deploy
### Fase 8 — README + cierre

---

## Checklist v0.1
- [ ] Funciona end-to-end en mobile y desktop sin errores en consola
- [ ] Tiene mínimo 100 jugadores verificados
- [ ] El daily reset funciona (mismo jugador para todos en una fecha dada)
- [ ] No se puede jugar 2 veces el mismo día
- [ ] Share copia un texto correcto al clipboard
- [ ] Stats personales persisten y se ven bien
- [ ] Hay tests unitarios mínimos pasando
- [ ] Está deployado y la URL pública funciona (o instrucciones claras si Vercel CLI no estaba)
- [ ] README y progress.md prolijos

---

## v0.2 Ideas (fuera de scope para v0.1)
- Backend/base de datos para estadísticas globales
- Multiplayer / torneos
- Login social
- Ligas internacionales (no solo Argentina)
- Modo difícil (solo 4 intentos)
- Historial de jugadores pasados

---

## Bugs conocidos
(ninguno aún)
