const STORAGE_KEY = 'celeren_cloud_assessment_submissions'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
  } catch {
    // almacenamiento no disponible (modo privado, cuota llena, etc.) — no bloquea el flujo
  }
}

/**
 * Guarda un envío completo: lead + respuestas + puntajes + etapa.
 * @param {object} lead
 * @param {object} triageAnswers
 * @param {object} stageAnswers
 * @param {object} result - salida de buildAssessmentResult
 */
export function saveSubmission({ lead, triageAnswers, stageAnswers, result }) {
  const submissions = readAll()
  const submission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    lead,
    triageAnswers,
    stageAnswers,
    stage: result.stage,
    dimensionScores: result.dimensionScores,
    globalScore: result.globalScore,
    maturity: result.maturity.name,
  }
  submissions.push(submission)
  writeAll(submissions)
  return submission
}

export function getAllSubmissions() {
  return readAll()
}
