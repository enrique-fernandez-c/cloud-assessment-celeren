// Reglas de contexto por etapa: oportunidades/amenazas y el "próximo paso" hacia la etapa N+1.
// Fuente: Cuestionarios_Assessment_Madurez_Cloud.md (sección "Reglas de contexto por etapa" del prompt de producto).
export const STAGE_CONTEXT = {
  1: {
    nextStage: 2,
    nextStepHeadline: 'Modernizar a Microsoft 365 y sentar las bases de identidad en la nube.',
    opportunities: [
      'Modernizar a Microsoft 365 con identidad centralizada (Entra ID).',
      'Establecer los primeros respaldos en la nube para reducir el riesgo de pérdida de datos.',
      'Ganar productividad y colaboración con herramientas cloud (Teams, SharePoint).',
    ],
    threats: [
      'Seguridad e identidad frágiles (cuentas sueltas, sin MFA).',
      'Dependencia total de hardware local, sin plan de contingencia.',
      'Continuidad del negocio en riesgo ante falla o pérdida de equipos.',
    ],
    roadmap: {
      quickWins: [
        'Activar MFA y cuentas individuales gestionadas para todos los usuarios.',
        'Configurar respaldos automáticos en la nube para la información crítica.',
        'Definir un inventario básico de equipos y aplicaciones.',
      ],
      initiatives: [
        'Migración a Microsoft 365 con identidad centralizada (Entra ID).',
        'Estandarización de equipos y políticas de TI documentadas.',
        'Plan de modernización con objetivos de negocio y presupuesto.',
      ],
    },
  },
  2: {
    nextStage: 3,
    nextStepHeadline: 'Completar Microsoft 365, retirar el último servidor y habilitar Azure para DR.',
    opportunities: [
      'Completar la adopción de Microsoft 365 en toda la organización.',
      'Migrar o retirar el último servidor on-premise.',
      'Establecer disaster recovery (DR) en Azure.',
      'Diseñar una landing zone inicial en Azure para futuros proyectos.',
    ],
    threats: [
      'Dependencia on-premise: el último servidor es un punto único de falla.',
      'Adopción incompleta de M365 limita productividad y gobierno.',
      'Sin plan de continuidad formal ante incidentes.',
    ],
    roadmap: {
      quickWins: [
        'Activar respaldo en la nube del servidor que aún tienen local.',
        'Probar cargas en la nube con un entorno Dev/Test (DTaaS), sin tocar el servidor productivo.',
        'Revisar y ajustar licencias de M365 según uso real.',
        'Definir roles y aprobaciones (RBAC) para cambios administrativos.',
      ],
      initiatives: [
        'Plan formal de migración/retiro del último servidor (SAP Managed Services on Cloud si el core es SAP).',
        'Disaster recovery gestionado en Azure con DRaaS.',
        'Landing zone inicial en Azure para nuevos proyectos.',
      ],
    },
  },
  3: {
    nextStage: 4,
    nextStepHeadline: 'Migrar la producción a Azure (IaaS→PaaS) con gobierno, FinOps y seguridad Zero Trust.',
    opportunities: [
      'Migrar cargas productivas de Azure DR a producción real (IaaS → PaaS).',
      'Implementar gobierno formal (landing zone empresarial, guardrails) y FinOps.',
      'Elevar la postura de seguridad con Microsoft Defender y Zero Trust.',
    ],
    threats: [
      'Costos de nube sin control ni optimización (FinOps inmaduro).',
      'Postura de seguridad aún por reforzar frente a amenazas modernas.',
      'Riesgo de quedarse "a medio camino" entre on-prem y cloud.',
    ],
    roadmap: {
      quickWins: [
        'Validar cargas productivas en un entorno Dev/Test (DTaaS) en Azure antes de migrarlas.',
        'Activar tags y Cost Management para visibilidad de gasto en Azure.',
        'Habilitar Microsoft Defender for Cloud en los recursos existentes.',
        'Documentar la landing zone y las políticas actuales (Azure Policy).',
      ],
      initiatives: [
        "Migración productiva por olas (Azure Migrate, estrategia 6 R's) de IaaS a PaaS; SAP Managed Services on Cloud para el core.",
        'Landing zone empresarial con management groups y guardrails.',
        'Programa FinOps con presupuestos, reservas y chargeback.',
      ],
    },
  },
  4: {
    nextStage: null,
    nextStepHeadline: 'Mantener y expandir: optimización FinOps, modernización PaaS/cloud-native y datos e IA.',
    opportunities: [
      'Optimización FinOps continua (chargeback, costo unitario).',
      'Modernización hacia PaaS y arquitecturas cloud-native.',
      'Explotar datos e IA (Microsoft Fabric, Azure AI, Copilot) como ventaja competitiva.',
      'Adoptar managed services para liberar al equipo de tareas operativas.',
    ],
    threats: [
      'Costos de nube no optimizados a medida que crece el consumo.',
      'Deuda técnica acumulada en cargas no modernizadas.',
      'Seguridad a escala: superficie de ataque crece con la adopción cloud-native.',
    ],
    roadmap: {
      quickWins: [
        'Revisión Well-Architected de las cargas más críticas.',
        'Piloto de Copilot / Azure AI en un caso de uso de negocio.',
        'Ajustar reservas y right-sizing para reducir costo inmediato.',
      ],
      initiatives: [
        'Portafolio de modernización a PaaS/contenedores/serverless.',
        'Estrategia de datos e IA con Power BI & Analytics, Copilot y Azure AI Foundry.',
        'Operación gestionada del core (SAP Managed Services) para liberar al equipo.',
      ],
    },
  },
}

// Recomendación de Celeren por dimensión cuando aparece como debilidad.
// `signal` = "señal de oportunidad / próximo paso" tomada de la Rúbrica
// (Rubrica_Assessment_Cloud.xlsx). `serviceIds` = servicios reales del portfolio
// de Celeren (ver portfolio.js) que atienden esa debilidad.
export const DIMENSION_OFFERINGS = {
  D1: {
    signal: 'Workshop de estrategia y business case (CAF Envisioning): es la base que ordena todo el roadmap. Cuando el valor va por datos, se suma la conversación de Datos & IA.',
    serviceIds: ['powerbi', 'foundry'],
  },
  D2: {
    signal: 'Diseño/implementación de landing zone y gobierno (Azure Policy, management groups) para escalar con control.',
    serviceIds: ['azure-aws'],
  },
  D3: {
    signal: 'Assessment de seguridad / Zero Trust y despliegue de Defender for Cloud + Entra ID. Alto peso en sectores regulados.',
    serviceIds: ['m365'],
  },
  D4: {
    signal: 'Celeren diseña, implementa y mantiene por ti la base de tu nube (landing zone) con plantillas automatizadas — sin que tengas que armar un equipo interno.',
    serviceIds: ['azure-aws', 'dtaas'],
  },
  D5: {
    signal: 'Programa de migración (Azure Migrate) y modernización a PaaS/AKS. Financiable con AMMP; suele ser el motor del deal. Se puede empezar validando cargas en un entorno Dev/Test antes de migrar.',
    serviceIds: ['sap-ms', 'azure-aws', 'dtaas'],
  },
  D6: {
    signal: 'Celeren opera tu nube por ti (servicio gestionado): monitoreo, resolución de incidentes y recuperación ante desastres (DRaaS) — sin construir un equipo interno de operaciones.',
    serviceIds: ['sap-ms', 'draas'],
  },
  D7: {
    signal: 'Control y optimización del gasto en la nube gestionado por Celeren (visibilidad, presupuestos y reservas). Quick win de alto impacto y bajo esfuerzo.',
    serviceIds: ['azure-aws'],
  },
  D8: {
    signal: 'Plan de enablement / CCoE y rutas de certificación (AZ-900, AZ-104, etc.), con adopción de Copilot.',
    serviceIds: ['m365', 'copilot'],
  },
}
