// Detalle por dimensión: para cada una muestra su categoría CAF, el nivel actual
// (1-5) y el descriptor de ese nivel tomado de la Rúbrica de Madurez Cloud.
// Da contexto cualitativo al puntaje numérico ("por qué estás en este nivel").

function levelColor(number) {
  if (number <= 2) return 'bg-red-100 text-red-700'
  if (number === 3) return 'bg-amber-100 text-amber-700'
  return 'bg-celeren-600/10 text-celeren-700'
}

export default function DimensionDetails({ details }) {
  return (
    <div className="space-y-2">
      {details.map((d) => (
        <div key={d.dimension} className="rounded-xl border border-celeren-100 bg-white p-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold text-celeren-950">
              {d.dimension} · {d.name}
            </span>
            <span className="text-xs text-celeren-500">CAF: {d.caf}</span>
            <span className={`ml-auto rounded-md px-2 py-0.5 text-xs font-bold ${levelColor(d.level.number)}`}>
              Nivel {d.level.number} · {d.level.name} ({d.score.toFixed(1)})
            </span>
          </div>
          <p className="mt-1.5 text-sm text-celeren-800/85">{d.level.descriptor}</p>
        </div>
      ))}
    </div>
  )
}
