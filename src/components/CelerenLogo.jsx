// Logotipo oficial (Manual de marca, sección 1): no redibujar, no recolorear.
// variant="color" para fondos claros, variant="white" para fondos oscuros/degradados.
export default function CelerenLogo({ className = 'h-8', variant = 'color' }) {
  const src = variant === 'white' ? '/brand/celeren-logo-white.png' : '/brand/celeren-logo-color.png'
  return <img src={src} alt="Celeren" className={`w-auto ${className}`} />
}
