// Motivo gráfico recurrente del Manual de marca: una curva diagonal con degradado
// navy -> azul, usada en la carátula y en cada diapositiva de la presentación
// corporativa. Se reutiliza aquí como fondo decorativo en la bienvenida y el CTA.
let uid = 0

export default function BrandSwoosh({ className = '' }) {
  const id = `brand-swoosh-grad-${++uid}`
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1c3a56" />
          <stop offset="1" stopColor="#006ba6" />
        </linearGradient>
      </defs>
      <path
        d="M400,0 L400,300 L150,300 C 210,255 230,190 195,145 C 165,107 105,90 55,78 C 25,71 8,35 12,0 Z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}
