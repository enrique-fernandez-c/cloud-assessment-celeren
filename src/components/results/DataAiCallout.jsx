import { DATA_AI_SERVICES } from '../../data/portfolio.js'

// Datos & IA es la 9ª dimensión recomendada por la rúbrica (alta en la agenda de
// Microsoft). No se puntúa, pero se posiciona como horizonte de valor —
// especialmente relevante a partir de la Etapa 3.
export default function DataAiCallout({ stage }) {
  const emphasis =
    stage >= 3
      ? 'Estás en el punto donde los datos y la IA se vuelven la próxima ventaja competitiva.'
      : 'Una vez asentada la base cloud, los datos y la IA son el siguiente salto de valor.'

  return (
    <div className="rounded-2xl border border-celeren-300 bg-celeren-50 p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-celeren-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
          Horizonte
        </span>
        <h4 className="text-sm font-semibold text-celeren-950">Datos & IA</h4>
      </div>
      <p className="mt-2 text-sm text-celeren-800/90">{emphasis}</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DATA_AI_SERVICES.map((s) => (
          <div key={s.id} className="rounded-lg border border-celeren-100 bg-white p-3">
            <p className="text-sm font-semibold text-celeren-700">{s.short}</p>
            <p className="mt-1 text-xs text-celeren-800/80">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
