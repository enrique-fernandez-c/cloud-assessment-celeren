// Marcador decorativo usado en el Manual de marca antes de cada título de sección:
// una pequeña grilla de puntos que se desvanece. Se usa junto a los encabezados.
const ROWS = [
  [1, 1, 1, 1, 0.9, 0.6, 0.3],
  [1, 1, 1, 0.9, 0.7, 0.4, 0.15],
  [1, 1, 0.9, 0.6, 0.3, 0.15, 0],
]

export default function SectionDots({ className = 'h-4 w-auto', dark = false }) {
  const color = dark ? '#ffffff' : '#1c3a56'
  return (
    <svg viewBox="0 0 70 30" width="70" height="30" className={className} aria-hidden="true">
      {ROWS.map((row, r) =>
        row.map((opacity, c) =>
          opacity > 0 ? (
            <circle key={`${r}-${c}`} cx={5 + c * 10} cy={5 + r * 10} r={3} fill={color} opacity={opacity} />
          ) : null,
        ),
      )}
    </svg>
  )
}
