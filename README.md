# Assessment de Madurez Cloud · Celeren

SPA en React + Vite + Tailwind CSS que ejecuta un diagnóstico de madurez cloud (basado en el
Cloud Adoption Framework de Microsoft) como herramienta comercial de captura de leads.

## Flujo

Bienvenida → captura de lead → triage (5 preguntas, define la etapa 1-4) → formulario de la
etapa (15 preguntas / 8 dimensiones) → resultados (etapa, puntaje global, radar/barras por
dimensión, FODA cruzada, debilidades → próximos pasos, roadmap, CTA + descarga PDF).

## Estructura

- `src/data/` — preguntas, dimensiones, pesos y reglas de contexto por etapa (contenido puro,
  cargado desde `Cuestionarios_Assessment_Madurez_Cloud.md`).
- `src/logic/` — cálculo de etapa/puntajes/FODA (`scoring.js`), persistencia (`storage.js`),
  exportación JSON/CSV/PDF (`exportUtils.js`) y el punto de extensión opcional para IA
  (`aiNarrative.js`).
- `src/components/` — pantallas del flujo y `src/components/results/` — piezas de la página de
  resultados (radar, barras, matriz FODA, roadmap, recomendaciones).

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
```

## Variables de entorno opcionales

Ver `.env.example`:

- `VITE_CELEREN_CONTACT_EMAIL` — correo usado en los CTA de contacto.
- `VITE_AI_ENDPOINT` — endpoint backend propio (opcional) que redacte el FODA/recomendaciones
  con IA a partir de los puntajes ya calculados. Si no se configura, la app usa automáticamente
  el fallback basado en reglas — la app funciona igual de bien sin él.

## Notas técnicas

- Los envíos (lead + respuestas + puntajes) se guardan en `localStorage` y pueden exportarse en
  JSON/CSV o enviarse por correo (mailto) desde la página de resultados.
- La descarga en PDF usa `html2canvas-pro` (no el `html2canvas` original) porque Tailwind v4
  genera colores con `color-mix()/oklab()` para los modificadores de opacidad, que el
  `html2canvas` clásico no sabe interpretar.
