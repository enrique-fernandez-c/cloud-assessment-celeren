// Punto de extensión opcional: si el equipo despliega un endpoint backend propio
// (que a su vez llame a la API de Anthropic/OpenAI con la API key guardada del lado
// servidor — nunca en el frontend), esta función lo usa para redactar el FODA
// cruzado y las recomendaciones en tono ejecutivo. La IA solo recibe puntajes ya
// calculados (nunca inventa datos) y solo redacta texto.
//
// Si VITE_AI_ENDPOINT no está configurado, o la llamada falla, se retorna null y
// la UI usa el fallback 100% basado en reglas (ver logic/scoring.js), que siempre
// está disponible y no depende de ningún servicio externo.

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT

/**
 * @param {object} result - salida de buildAssessmentResult (puntajes, etapa, FODA por reglas)
 * @param {object} lead - datos del formulario de lead (nombre, empresa, cargo)
 * @returns {Promise<{swotNarrative: string, recommendations: string[]} | null>}
 */
export async function generateAiNarrative(result, lead) {
  if (!AI_ENDPOINT) return null

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage: result.stage,
        globalScore: result.globalScore,
        maturity: result.maturity.name,
        dimensionScores: result.dimensionScores,
        strengths: result.swot.strengths,
        weaknesses: result.swot.weaknesses,
        opportunities: result.swot.opportunities,
        threats: result.swot.threats,
        company: lead.company,
        role: lead.role,
      }),
    })
    if (!response.ok) return null
    const data = await response.json()
    if (!data?.swotNarrative || !Array.isArray(data?.recommendations)) return null
    return data
  } catch {
    return null
  }
}
