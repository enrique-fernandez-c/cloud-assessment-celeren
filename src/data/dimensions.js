// Las 8 dimensiones del modelo de madurez cloud (basado en CAF de Microsoft).
// El peso y la cantidad de preguntas provienen de Cuestionarios_Assessment_Madurez_Cloud.md
// La categoría CAF (`caf`) y los descriptores de nivel 1-5 (`levels`) provienen de la
// Rúbrica de Madurez Cloud — Microsoft Azure (Rubrica_Assessment_Cloud.xlsx).
export const DIMENSIONS = [
  {
    id: 'D1',
    name: 'Estrategia y alineación al negocio',
    weight: 0.12,
    questionCount: 2,
    caf: 'Estrategia y plan',
    levels: [
      'No hay estrategia cloud; adopción reactiva y por proyectos aislados, sin business case.',
      'Motivaciones identificadas de forma informal; cloud visto como proyecto de TI, sin métricas de negocio.',
      'Estrategia documentada y alineada a objetivos de negocio, con business case y KPIs definidos.',
      'Estrategia gestionada con métricas de valor (TCO, time-to-market) revisadas y patrocinio ejecutivo activo.',
      'Cloud como motor de innovación del negocio; decisiones guiadas por datos de valor y revisión continua del portafolio.',
    ],
  },
  {
    id: 'D2',
    name: 'Gobierno y cumplimiento',
    weight: 0.12,
    questionCount: 2,
    caf: 'Gobierno',
    levels: [
      'Sin políticas ni controles; configuración manual y shadow IT.',
      'Algunas políticas básicas y reactivas; gobierno inconsistente entre equipos.',
      'Marco de gobierno definido con Azure Policy y landing zone, gestión de costos y cumplimiento documentado.',
      'Gobierno automatizado y auditado (políticas como código, management groups, blueprints) con cumplimiento monitoreado.',
      'Gobierno de autoservicio con guardrails que habilitan velocidad sin perder control; mejora continua basada en datos.',
    ],
  },
  {
    id: 'D3',
    name: 'Seguridad e identidad',
    weight: 0.14,
    questionCount: 2,
    caf: 'Seguridad',
    levels: [
      'Seguridad reactiva; identidades fragmentadas, sin MFA, perímetro tradicional.',
      'Controles básicos (MFA parcial, Entra ID en uso) pero sin estrategia integral ni postura medida.',
      'Postura definida: Entra ID centralizado, Defender for Cloud, segmentación de red y gestión de secretos.',
      'Zero Trust en marcha, DevSecOps, detección y respuesta automatizadas; postura medida (Secure Score).',
      'Seguridad como código integrada de extremo a extremo; threat hunting proactivo y mejora continua.',
    ],
  },
  {
    id: 'D4',
    name: 'Plataforma, arquitectura y landing zone',
    weight: 0.12,
    questionCount: 2,
    caf: 'Preparación (Ready)',
    levels: [
      'Recursos creados a mano, sin diseño de red ni estándares; entornos inconsistentes.',
      'Algunos estándares y plantillas, pero sin landing zone formal ni IaC consistente.',
      'Landing zone implementada, red e híbrido diseñados, IaC (Bicep/Terraform) para nuevos despliegues.',
      'Plataforma gestionada y versionada; IaC en toda la organización, entornos reproducibles y escalables.',
      'Plataforma de autoservicio para equipos de producto; arquitectura optimizada y evolucionada de forma continua.',
    ],
  },
  {
    id: 'D5',
    name: 'Migración y modernización de aplicaciones',
    weight: 0.16,
    questionCount: 2,
    caf: 'Adopción (Migrar / Innovar)',
    levels: [
      'Cargas on-premise; sin inventario de aplicaciones ni plan de migración.',
      'Inventario inicial y algunos lift-and-shift (rehost) puntuales, sin estrategia de las 6 R\'s.',
      'Estrategia de migración por aplicación (6 R\'s), olas planificadas y uso creciente de PaaS.',
      'Modernización activa (contenedores/AKS, PaaS, serverless) gestionada por portafolio y métricas.',
      'Cultura cloud-native: microservicios, entrega continua y modernización como práctica permanente.',
    ],
  },
  {
    id: 'D6',
    name: 'Operaciones y fiabilidad',
    weight: 0.12,
    questionCount: 2,
    caf: 'Gestión (Manage)',
    levels: [
      'Operación reactiva, sin monitoreo centralizado; incidentes resueltos a mano.',
      'Monitoreo básico (Azure Monitor parcial), alertas dispersas y automatización mínima.',
      'Observabilidad definida, runbooks, gestión de incidentes y respaldos/DR documentados.',
      'Operación gestionada con SRE, automatización (auto-remediación), SLAs y resiliencia probada.',
      'Operaciones autooptimizadas; fiabilidad guiada por SLOs y mejora continua basada en datos.',
    ],
  },
  {
    id: 'D7',
    name: 'Gestión financiera (FinOps)',
    weight: 0.12,
    questionCount: 2,
    caf: 'Costo / FinOps',
    levels: [
      'Sin visibilidad de costos cloud; facturas sorpresa y sin responsables.',
      'Visibilidad básica del gasto, pero sin asignación (tags) ni optimización sistemática (Crawl).',
      'Costos asignados por área (tags/showback), presupuestos y optimización recurrente con Cost Management (Walk).',
      'FinOps gestionado: chargeback, reservas/savings plans, forecasting y costo unitario por negocio (Run).',
      'Cultura FinOps madura; decisiones de ingeniería guiadas por costo-valor y optimización continua.',
    ],
  },
  {
    id: 'D8',
    name: 'Personas, skills y organización (CCoE)',
    weight: 0.1,
    questionCount: 1,
    caf: 'Alineación organizacional',
    levels: [
      'Sin roles cloud definidos; conocimiento en pocas personas y resistencia al cambio.',
      'Equipos aprendiendo de forma informal; sin CCoE ni plan de capacitación.',
      'CCoE en formación, roles y responsabilidades definidos, plan de capacitación/certificación en marcha.',
      'CCoE consolidado que habilita a los equipos; cultura de mejora y certificaciones gestionadas.',
      'Organización cloud-first; capacidades distribuidas, comunidades de práctica y aprendizaje continuo.',
    ],
  },
]

export const DIMENSION_BY_ID = Object.fromEntries(DIMENSIONS.map((d) => [d.id, d]))

/** Devuelve el nombre y descriptor del nivel (1-5) al que corresponde un puntaje de dimensión. */
export function getDimensionLevel(dimId, score) {
  const dim = DIMENSION_BY_ID[dimId]
  const idx = Math.min(5, Math.max(1, Math.round(score))) - 1
  return {
    number: idx + 1,
    name: MATURITY_LEVELS[idx].name,
    descriptor: dim?.levels?.[idx] ?? '',
  }
}

export const STAGES = [
  { id: 1, name: 'Etapa 1', profile: 'Gmail / Workspace + servidores locales' },
  { id: 2, name: 'Etapa 2', profile: 'Microsoft 365 parcial + al menos 1 servidor local' },
  { id: 3, name: 'Etapa 3', profile: 'Microsoft 365 completo + Azure solo para DR/respaldo' },
  { id: 4, name: 'Etapa 4', profile: 'Microsoft 365 completo + toda la infraestructura en Azure' },
]

// Límites: <1.5 Inicial · 1.5-2.5 Emergente · 2.5-3.5 Definido · 3.5-4.5 Gestionado · >4.5 Optimizado
// (los puntos límite exactos se asignan a la banda inferior, salvo el último corte que es estrictamente ">").
export const MATURITY_LEVELS = [
  { max: 1.5, strict: true, name: 'Inicial', description: 'Procesos ad hoc, sin estandarizar.' },
  { max: 2.5, strict: false, name: 'Emergente', description: 'Primeras prácticas definidas, aún inconsistentes.' },
  { max: 3.5, strict: false, name: 'Definido', description: 'Procesos documentados y aplicados con regularidad.' },
  { max: 4.5, strict: false, name: 'Gestionado', description: 'Procesos medidos, gobernados y mejorados activamente.' },
  { max: Infinity, strict: false, name: 'Optimizado', description: 'Mejora continua guiada por datos, referente de la industria.' },
]

export function getMaturityLevel(score) {
  return (
    MATURITY_LEVELS.find((l) => (l.strict ? score < l.max : score <= l.max)) ??
    MATURITY_LEVELS[MATURITY_LEVELS.length - 1]
  )
}
