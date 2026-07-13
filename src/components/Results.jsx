import { useEffect, useRef, useState } from 'react'
import CelerenLogo from './CelerenLogo.jsx'
import BrandSwoosh from './brand/BrandSwoosh.jsx'
import SectionHeading from './brand/SectionHeading.jsx'
import DimensionRadarChart from './results/DimensionRadarChart.jsx'
import DimensionBarChart from './results/DimensionBarChart.jsx'
import DimensionDetails from './results/DimensionDetails.jsx'
import Roadmap from './results/Roadmap.jsx'
import PriorityRecommendations from './results/PriorityRecommendations.jsx'
import DataAiCallout from './results/DataAiCallout.jsx'
import { generateAiNarrative } from '../logic/aiNarrative.js'
import { MICROSOFT_FUNDS } from '../data/portfolio.js'
import { exportSubmissionAsJson, exportSubmissionAsCsv, buildMailtoSummary, exportElementAsPdf } from '../logic/exportUtils.js'

export default function Results({ lead, result, submission }) {
  const reportRef = useRef(null)
  const [narrative, setNarrative] = useState(null)
  const [downloadingPdf, setDownloadingPdf] = useState(false)

  useEffect(() => {
    let cancelled = false
    generateAiNarrative(result, lead).then((data) => {
      if (!cancelled) setNarrative(data)
    })
    return () => {
      cancelled = true
    }
  }, [result, lead])

  async function handleDownloadPdf() {
    if (!reportRef.current) return
    setDownloadingPdf(true)
    try {
      await exportElementAsPdf(reportRef.current, `celeren-madurez-cloud-${lead.company || 'reporte'}.pdf`)
    } finally {
      setDownloadingPdf(false)
    }
  }

  function handleScheduleMeeting() {
    const celerenEmail = import.meta.env.VITE_CELEREN_CONTACT_EMAIL || 'contacto@celeren.com'
    const subject = `Quiero agendar una reunión — assessment de madurez cloud (${lead.company})`
    const body = [
      `Hola equipo de Celeren,`,
      '',
      `Soy ${lead.name} (${lead.role}) de ${lead.company}. Completé el assessment de madurez cloud`,
      `(Etapa ${result.stage}, puntaje global ${result.globalScore.toFixed(2)}) y me gustaría agendar una reunión`,
      `para revisar los resultados y próximos pasos.`,
      '',
      `Mi correo: ${lead.email}${lead.phone ? ` · Teléfono: ${lead.phone}` : ''}`,
    ].join('\n')
    window.location.href = `mailto:${celerenEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-10">
      <div ref={reportRef} className="mx-auto max-w-4xl space-y-8 bg-celeren-50">
        <div data-pdf-section className="flex items-center justify-between">
          <CelerenLogo className="h-7" />
          <span className="text-sm text-celeren-700/70">Reporte para {lead.company}</span>
        </div>

        {/* Etapa actual */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-celeren-600 text-2xl font-bold text-white shadow-lg shadow-celeren-600/25">
            {result.stage}
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-celeren-950">
            Estás en la Etapa {result.stage}
          </h1>
          <p className="mt-2 text-base text-celeren-800/90">
            {result.nextStage
              ? `Tu siguiente paso es avanzar hacia la Etapa ${result.nextStage}: ${result.nextStepHeadline}`
              : result.nextStepHeadline}
          </p>
        </section>

        {/* Puntaje global */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-celeren-700/80">Puntaje global ponderado</p>
              <p className="text-4xl font-bold text-celeren-950">{result.globalScore.toFixed(2)} / 5</p>
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-block rounded-full bg-celeren-600/10 px-4 py-1.5 text-sm font-semibold text-celeren-600">
                Nivel: {result.maturity.name}
              </span>
              <p className="mt-2 max-w-xs text-sm text-celeren-700/80">{result.maturity.description}</p>
            </div>
          </div>
        </section>

        {/* Scorecard por dimensión */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <SectionHeading>Scorecard por dimensión</SectionHeading>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DimensionRadarChart dimensionScores={result.dimensionScores} />
            <DimensionBarChart dimensionScores={result.dimensionScores} />
          </div>
        </section>

        {/* Detalle por dimensión (categoría CAF + nivel de la rúbrica) */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <SectionHeading>Detalle por dimensión</SectionHeading>
          <p className="mt-2 mb-4 text-sm text-celeren-700/80">
            Cada dimensión se mapea al Cloud Adoption Framework de Microsoft y se ubica en un nivel de
            madurez (1-5) según la rúbrica de Celeren.
          </p>
          <DimensionDetails details={result.dimensionDetails} />
        </section>

        {/* Debilidades priorizadas -> próximos pasos */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <SectionHeading>Debilidades priorizadas → próximos pasos</SectionHeading>
          <div className="mt-4">
            <PriorityRecommendations
              recommendations={narrative?.recommendations?.length ? narrative.recommendations.map((text, i) => ({
                ...(result.recommendations[i] ?? {}),
                dimension: result.recommendations[i]?.dimension ?? `#${i + 1}`,
                name: result.recommendations[i]?.name ?? '',
                score: result.recommendations[i]?.score ?? 0,
                // La IA solo reescribe el texto; el servicio y el nivel se conservan del cálculo por reglas.
                recommendation: text,
              })) : result.recommendations}
            />
          </div>
        </section>

        {/* Roadmap */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <SectionHeading>Roadmap sugerido</SectionHeading>
          <div className="mt-4">
            <Roadmap roadmap={result.roadmap} nextStage={result.nextStage} />
          </div>
        </section>

        {/* Datos & IA (9ª dimensión / horizonte de valor) */}
        <section data-pdf-section className="rounded-2xl border border-celeren-100 bg-white p-6 sm:p-8">
          <SectionHeading>El siguiente horizonte: Datos & IA</SectionHeading>
          <div className="mt-4">
            <DataAiCallout stage={result.stage} />
          </div>
        </section>
      </div>

      {/* CTA final */}
      <div className="no-print relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl bg-celeren-900 text-center text-white">
        <BrandSwoosh className="absolute inset-0 h-full w-full" />
        <div className="relative p-6 sm:p-8">
        <h3 className="text-xl font-semibold">¿Listo para dar el siguiente paso?</h3>
        <p className="mt-2 text-celeren-100/90">
          Agenda una reunión con Celeren para revisar tus resultados y diseñar juntos tu hoja de ruta hacia la Etapa{' '}
          {result.nextStage ?? result.stage}.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleScheduleMeeting}
            className="w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-sm font-semibold text-celeren-700 shadow-md transition hover:bg-celeren-50"
          >
            Agenda una reunión con Celeren
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="w-full sm:w-auto rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
          >
            {downloadingPdf ? 'Generando PDF…' : 'Descargar resultado en PDF'}
          </button>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-xs text-celeren-100/80">
          El assessment y la migración pueden financiarse con fondos de Microsoft
          ({MICROSOFT_FUNDS.map((f) => f.code).join(' · ')}). Consultá elegibilidad con Celeren.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-celeren-100/70">
          <button onClick={() => exportSubmissionAsJson(submission)} className="underline underline-offset-2">
            Exportar JSON
          </button>
          <button onClick={() => exportSubmissionAsCsv(submission)} className="underline underline-offset-2">
            Exportar CSV
          </button>
          <button onClick={() => buildMailtoSummary(submission)} className="underline underline-offset-2">
            Enviar resumen por correo
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
