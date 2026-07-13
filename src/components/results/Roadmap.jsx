export default function Roadmap({ roadmap, nextStage }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-celeren-300 bg-celeren-50 p-5">
        <h4 className="text-sm font-bold uppercase tracking-wide text-celeren-600">Quick wins (0-3 meses)</h4>
        <ul className="mt-3 space-y-2.5 text-sm text-celeren-950">
          {roadmap.quickWins.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-celeren-600/15 px-1.5 text-xs font-semibold text-celeren-600">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-celeren-800/25 bg-celeren-800/5 p-5">
        <h4 className="text-sm font-bold uppercase tracking-wide text-celeren-800">
          Iniciativas estratégicas {nextStage ? `→ Etapa ${nextStage}` : ''}
        </h4>
        <ul className="mt-3 space-y-2.5 text-sm text-celeren-950">
          {roadmap.initiatives.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-celeren-800/15 px-1.5 text-xs font-semibold text-celeren-800">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
