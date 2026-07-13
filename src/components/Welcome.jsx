import CelerenLogo from './CelerenLogo.jsx'
import BrandSwoosh from './brand/BrandSwoosh.jsx'

export default function Welcome({ onStart }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative overflow-hidden bg-celeren-950">
        <BrandSwoosh className="absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col items-center px-6 py-10 text-center">
          <CelerenLogo variant="white" className="h-8" />
          <span className="mt-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white">
            Diagnóstico · ~10 minutos
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="max-w-2xl text-3xl sm:text-4xl font-semibold tracking-tight text-celeren-950">
          Assessment de Madurez Cloud
        </h1>

        <p className="mt-5 max-w-xl text-base sm:text-lg text-celeren-800/80">
          Responde un cuestionario breve y descubre en qué etapa de adopción de la nube está tu
          empresa hoy, cuáles son tus fortalezas y brechas, y cuál es el siguiente paso recomendado
          para avanzar de forma segura y rentable.
        </p>

        <button
          onClick={onStart}
          className="mt-10 rounded-xl bg-celeren-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-celeren-600/25 transition hover:bg-celeren-700 active:scale-[0.98]"
        >
          Comenzar diagnóstico
        </button>

        <p className="mt-6 text-sm text-celeren-700/70">
          Sin costo · Resultados inmediatos · Basado en el Cloud Adoption Framework de Microsoft
        </p>
      </div>
    </div>
  )
}
