export default function ProgressBar({ current, total, label }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-celeren-700 mb-1.5">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-celeren-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-celeren-900 to-celeren-600 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
