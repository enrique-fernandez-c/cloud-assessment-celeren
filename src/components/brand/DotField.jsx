// Patrón de puntos usado como textura decorativa en el borde de las páginas del
// Manual de marca. `fade` controla desde qué lado se desvanece.
export default function DotField({ className = '', color = '#006ba6', fade = 'left' }) {
  const maskDirection = {
    left: 'to left',
    right: 'to right',
    top: 'to top',
    bottom: 'to bottom',
  }[fade]

  return (
    <div
      className={className}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1.6px, transparent 1.6px)`,
        backgroundSize: '16px 16px',
        maskImage: `linear-gradient(${maskDirection}, black, transparent)`,
        WebkitMaskImage: `linear-gradient(${maskDirection}, black, transparent)`,
      }}
      aria-hidden="true"
    />
  )
}
