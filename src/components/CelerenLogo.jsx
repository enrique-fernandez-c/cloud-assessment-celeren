// Importamos los logos directamente para que Vite los procese en el build
import logoWhite from '../brand/celeren-logo-white.png'; 
import logoColor from '../brand/celeren-logo-color.png';
// Nota: Revisa si necesitas usar '../brand/' o './brand/' o '../../brand/' 
// dependiendo de en qué carpeta esté guardado este archivo de componente.

// Logotipo oficial (Manual de marca, sección 1): no redibujar, no recolorear.
// variant="color" para fondos claros, variant="white" para fondos oscuros/degradados.
export default function CelerenLogo({ className = 'h-8', variant = 'color' }) {
  // Ahora usamos las variables que importamos arriba
  const src = variant === 'white' ? logoWhite : logoColor;
  
  return <img src={src} alt="Celeren" className={`w-auto ${className}`} />
}