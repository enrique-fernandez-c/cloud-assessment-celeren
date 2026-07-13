// Cuestionario de triage (5 preguntas) — ubica al cliente en una de las 4 etapas.
// Fuente: Cuestionarios_Assessment_Madurez_Cloud.md, sección "0) Cuestionario de Triage"
export const TRIAGE_QUESTIONS = [
  {
    id: 'T1',
    text: '¿Qué usan para correo y productividad (documentos, calendario)?',
    options: [
      { value: 'A', label: 'Gmail / Google Workspace' },
      { value: 'B', label: 'Microsoft 365 en parte de la empresa' },
      { value: 'C', label: 'Microsoft 365 en toda la empresa' },
    ],
  },
  {
    id: 'T2',
    text: '¿Tienen servidores propios en sus oficinas (on-premise)?',
    options: [
      { value: 'A', label: 'Sí, varios o los principales' },
      { value: 'B', label: 'Sí, queda uno' },
      { value: 'C', label: 'No, ya nada local' },
    ],
  },
  {
    id: 'T3',
    text: '¿Usan alguna nube pública (Azure, AWS, Google)?',
    options: [
      { value: 'A', label: 'No usamos nube' },
      { value: 'B', label: 'Solo para respaldo o recuperación (DR)' },
      { value: 'C', label: 'Corremos aplicaciones productivas en la nube' },
    ],
  },
  {
    id: 'T4',
    text: '¿Dónde corren sus aplicaciones de negocio (ERP, sistemas core)?',
    options: [
      { value: 'A', label: 'En servidores locales' },
      { value: 'B', label: 'Mixto: algunas ya en la nube' },
      { value: 'C', label: 'Prácticamente todo en la nube' },
    ],
  },
  {
    id: 'T5',
    text: '¿Cómo manejan la continuidad / recuperación ante desastres?',
    options: [
      { value: 'A', label: 'Respaldo local o no tenemos' },
      { value: 'B', label: 'Respaldo en la nube' },
      { value: 'C', label: 'Plan de recuperación (DR) en la nube' },
    ],
  },
]

/**
 * Lógica de asignación de etapa (ver .md, sección 0):
 *   SI T1 = A (Gmail)               → Etapa 1
 *   SI NO, SI T1 = B (M365 parcial) → Etapa 2
 *   SI NO (T1 = C, M365 completo):
 *       SI T3 = C Y T2 = C Y T4 = C → Etapa 4
 *       EN OTRO CASO                → Etapa 3
 */
export function resolveStage(triageAnswers) {
  const { T1, T2, T3, T4 } = triageAnswers
  if (T1 === 'A') return 1
  if (T1 === 'B') return 2
  if (T3 === 'C' && T2 === 'C' && T4 === 'C') return 4
  return 3
}
