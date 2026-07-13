export default function PriorityRecommendations({ recommendations }) {
  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <div key={rec.dimension} className="rounded-xl border border-celeren-100 bg-white p-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex items-center gap-3 sm:w-64 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-celeren-100 text-sm font-bold text-celeren-700">
                {rec.score.toFixed(1)}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-celeren-500">
                  {rec.dimension}
                  {rec.level ? ` · Nivel ${rec.level.number} (${rec.level.name})` : ''}
                </p>
                <p className="text-sm font-medium text-celeren-950">{rec.name}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-celeren-800/90">
                <span className="font-semibold text-celeren-950">Esta debilidad se resuelve con: </span>
                {rec.recommendation}
              </p>
              {rec.services?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {rec.services.map((s) => (
                    <span
                      key={s.id}
                      className="inline-block rounded-md bg-celeren-600/10 px-2 py-0.5 text-xs font-semibold text-celeren-700"
                      title={s.description}
                    >
                      {s.short}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
