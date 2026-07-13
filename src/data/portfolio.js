// Portfolio real de Celeren: lo que la empresa ofrece como solución a los
// problemas del cliente. Cada servicio declara las dimensiones (D1-D8) y/o la
// dimensión transversal "DATA" (Datos & IA) que ayuda a resolver, para poder
// conectar automáticamente cada debilidad detectada con la oferta que la atiende.
//
// Nota: "DATA" es la 9ª dimensión recomendada por la rúbrica (Datos & IA:
// Microsoft Fabric, Azure AI, Copilot). No se puntúa en el cuestionario actual,
// pero se usa para posicionar la oferta de datos e IA como horizonte de valor.
export const PORTFOLIO = [
  {
    id: 'sap-ms',
    name: 'SAP Managed Services on Cloud',
    short: 'SAP Managed Services',
    description:
      'Migración y operación gestionada 24/7 de tus sistemas SAP sobre Azure/AWS: disponibilidad, respaldo y soporte especializado sin cargar a tu equipo.',
    dimensions: ['D5', 'D6', 'D1'],
  },
  {
    id: 'draas',
    name: 'DRaaS — Disaster Recovery as a Service',
    short: 'DRaaS',
    description:
      'Recuperación ante desastres gestionada en la nube: replicación, plan de contingencia y pruebas de failover para garantizar la continuidad del negocio.',
    dimensions: ['D6'],
  },
  {
    id: 'dtaas',
    name: 'DTaaS — Dev/Test as a Service',
    short: 'DTaaS',
    description:
      'Entornos de desarrollo y pruebas bajo demanda en la nube: levantá ambientes de test sin invertir en hardware, validá cargas antes de migrarlas a la nube y pagá solo por lo que usás. Rampa de entrada de bajo riesgo para probar la nube.',
    dimensions: ['D5', 'D4'],
  },
  {
    id: 'azure-aws',
    name: 'Azure / AWS',
    short: 'Azure / AWS',
    description:
      'Diseño de landing zone, gobierno, migración de infraestructura e Infraestructura como Código sobre nube pública, con control de costos (FinOps).',
    dimensions: ['D4', 'D5', 'D2', 'D7'],
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    short: 'Microsoft 365',
    description:
      'Productividad, colaboración e identidad centralizada (Entra ID, MFA, Teams, SharePoint) con seguridad del puesto de trabajo.',
    dimensions: ['D3', 'D8'],
  },
  {
    id: 'powerbi',
    name: 'Power BI & Analytics',
    short: 'Power BI',
    description:
      'Explotación de datos, tableros ejecutivos y analítica para convertir la información del negocio en decisiones.',
    dimensions: ['DATA', 'D1'],
  },
  {
    id: 'copilot',
    name: 'Copilot',
    short: 'Copilot',
    description:
      'Asistentes de IA de Microsoft integrados a la productividad diaria y a los procesos de negocio para acelerar al equipo.',
    dimensions: ['DATA', 'D8'],
  },
  {
    id: 'foundry',
    name: 'Azure AI Foundry',
    short: 'Foundry',
    description:
      'Desarrollo y despliegue de soluciones de IA a medida (agentes, copilotos y modelos) sobre una plataforma gobernada.',
    dimensions: ['DATA', 'D1'],
  },
]

export const PORTFOLIO_BY_ID = Object.fromEntries(PORTFOLIO.map((p) => [p.id, p]))

/** Servicios de Celeren que atienden una dimensión dada (D1-D8 o 'DATA'). */
export function servicesForDimension(dimId) {
  return PORTFOLIO.filter((p) => p.dimensions.includes(dimId))
}

// Servicios que conforman la propuesta de valor de "Datos & IA" (upsell/horizonte).
export const DATA_AI_SERVICES = PORTFOLIO.filter((p) => p.dimensions.includes('DATA'))

// Fondos e incentivos de Microsoft con los que se puede posicionar el assessment
// y la migración (según la rúbrica). Se muestran en el caso de negocio para
// mejorar el cierre. Verificar elegibilidad con el PDM/partner de Microsoft.
export const MICROSOFT_FUNDS = [
  { code: 'ECIF', name: 'ECIF', note: 'fondos de inversión al cliente para financiar el assessment y la fase inicial.' },
  { code: 'Azure Migrate', name: 'Azure Migrate', note: 'herramientas y créditos para descubrimiento y migración.' },
  {
    code: 'AMMP',
    name: 'Azure Migration and Modernization Program',
    note: 'financiamiento para la migración y modernización a gran escala.',
  },
]
