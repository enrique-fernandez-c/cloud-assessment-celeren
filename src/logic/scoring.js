import { DIMENSIONS, DIMENSION_BY_ID, getMaturityLevel, getDimensionLevel } from '../data/dimensions.js'
import { STAGE_FORMS } from '../data/stageForms.js'
import { STAGE_CONTEXT, DIMENSION_OFFERINGS } from '../data/context.js'
import { servicesForDimension } from '../data/portfolio.js'

/**
 * Puntaje de dimensión = promedio de las preguntas de esa dimensión.
 * @param {number} stage - 1 a 4
 * @param {Record<string, number>} answers - { 'D1-1': 3, 'D1-2': 5, ... }
 * @returns {Record<string, number>} puntaje por dimensión (D1..D8)
 */
export function computeDimensionScores(stage, answers) {
  const questions = STAGE_FORMS[stage]
  const scores = {}
  for (const dim of DIMENSIONS) {
    const dimQuestions = questions.filter((q) => q.dimension === dim.id)
    const values = dimQuestions.map((q) => answers[q.id]).filter((v) => typeof v === 'number')
    scores[dim.id] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
  }
  return scores
}

/** Puntaje global ponderado = Σ (puntaje_dimensión × peso_dimensión). */
export function computeGlobalScore(dimensionScores) {
  return DIMENSIONS.reduce((total, dim) => total + (dimensionScores[dim.id] ?? 0) * dim.weight, 0)
}

export function dimensionName(id) {
  return DIMENSION_BY_ID[id]?.name ?? id
}

/**
 * FODA cruzada basada en reglas: fortalezas/debilidades vienen de los puntajes,
 * oportunidades/amenazas del contexto de la etapa actual.
 */
export function computeSwot(stage, dimensionScores) {
  const strengths = DIMENSIONS.filter((d) => dimensionScores[d.id] >= 4).map((d) => d.id)
  const weaknesses = DIMENSIONS.filter((d) => dimensionScores[d.id] <= 2).map((d) => d.id)
  const context = STAGE_CONTEXT[stage]
  const { opportunities, threats } = context

  const pick = (arr, i) => arr[i % arr.length]

  const fo = strengths.map((d, i) => ({
    dimension: d,
    text: `Tu fortaleza en "${dimensionName(d)}" te permite capitalizar: ${pick(opportunities, i)}`,
  }))

  const doCross = weaknesses.map((d, i) => ({
    dimension: d,
    text: `Cerrar la brecha en "${dimensionName(d)}" habilita aprovechar: ${pick(opportunities, i)} — oportunidad de venta (${DIMENSION_OFFERINGS[d]?.signal ?? ''})`,
  }))

  const fa = strengths.map((d, i) => ({
    dimension: d,
    text: `Tu fortaleza en "${dimensionName(d)}" ayuda a defenderte de: ${pick(threats, i)}`,
  }))

  const da = weaknesses.map((d, i) => ({
    dimension: d,
    text: `Riesgo urgente: la debilidad en "${dimensionName(d)}" se combina con la amenaza de ${pick(threats, i)}`,
  }))

  return {
    strengths,
    weaknesses,
    opportunities,
    threats,
    crosses: { fo, do: doCross, fa, da },
  }
}

/** Detalle enriquecido por dimensión: puntaje, categoría CAF, nivel actual y servicios de Celeren. */
export function buildDimensionDetails(dimensionScores) {
  return DIMENSIONS.map((d) => {
    const score = dimensionScores[d.id] ?? 0
    const offering = DIMENSION_OFFERINGS[d.id]
    return {
      dimension: d.id,
      name: d.name,
      caf: d.caf,
      score,
      level: getDimensionLevel(d.id, score),
      signal: offering?.signal ?? '',
      services: servicesForDimension(d.id),
    }
  })
}

/**
 * Genera 3-5 recomendaciones priorizadas basadas en reglas: ordena las dimensiones
 * de menor a mayor puntaje y recomienda el offering asociado (señal de oportunidad
 * de la rúbrica + servicios reales de Celeren que la resuelven).
 */
export function generateRecommendations(stage, dimensionScores) {
  const ranked = [...DIMENSIONS]
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => a.score - b.score)

  const top = ranked.slice(0, 5).map((d) => {
    const offering = DIMENSION_OFFERINGS[d.id]
    return {
      dimension: d.id,
      name: d.name,
      caf: d.caf,
      score: d.score,
      level: getDimensionLevel(d.id, d.score),
      // `recommendation` = texto (señal de oportunidad) para compatibilidad con la IA/UI
      recommendation: offering?.signal ?? '',
      services: servicesForDimension(d.id),
    }
  })

  return top
}

/**
 * Resultado completo: etapa, puntajes, nivel de madurez, FODA y recomendaciones.
 * `narrative` queda null por defecto: se completa por el generador de IA si está
 * disponible (ver logic/aiNarrative.js); la UI usa el fallback basado en reglas
 * cuando narrative es null. La IA nunca inventa números: solo redacta a partir
 * de este objeto de puntajes ya calculados.
 */
export function buildAssessmentResult(stage, answers) {
  const dimensionScores = computeDimensionScores(stage, answers)
  const globalScore = computeGlobalScore(dimensionScores)
  const maturity = getMaturityLevel(globalScore)
  const swot = computeSwot(stage, dimensionScores)
  const recommendations = generateRecommendations(stage, dimensionScores)
  const dimensionDetails = buildDimensionDetails(dimensionScores)
  const context = STAGE_CONTEXT[stage]

  return {
    stage,
    dimensionScores,
    dimensionDetails,
    globalScore,
    maturity,
    swot,
    recommendations,
    nextStage: context.nextStage,
    nextStepHeadline: context.nextStepHeadline,
    roadmap: context.roadmap,
    narrative: null,
  }
}
