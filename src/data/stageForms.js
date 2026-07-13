// Formularios por etapa (15 preguntas c/u, agrupadas en 8 dimensiones).
// Cada opción tiene un valor 1-5: el número de la opción elegida ES el puntaje.
// Fuente: Cuestionarios_Assessment_Madurez_Cloud.md, secciones 1-4.
//
// Estilo de redacción (decisión de producto):
//   - Lenguaje simple y comercial, pensado para un gerente/dueño NO técnico.
//   - Se pregunta por el RESULTADO / la capacidad ("¿está resuelto?"), no por
//     "¿lo hacés vos?", porque en muchos casos esto lo opera un partner (Celeren).
//     Por eso se agrega "tu equipo o un partner" donde aplica: quien terceriza
//     una capacidad madura no debe salir penalizado.

function opts(labels) {
  return labels.map((label, i) => ({ score: i + 1, label }))
}

export const STAGE_FORMS = {
  // ---------------------------------------------------------------------
  // ETAPA 1 — Gmail + servidores locales
  // ---------------------------------------------------------------------
  1: [
    {
      dimension: 'D1',
      id: 'D1-1',
      text: '¿Han pensado en modernizar su tecnología o mover parte a la nube?',
      options: opts([
        'No lo hemos pensado',
        'Lo comentamos informalmente',
        'Hay interés y algunas ideas',
        'Tenemos un plan inicial',
        'Plan con objetivos de negocio y presupuesto',
      ]),
    },
    {
      dimension: 'D1',
      id: 'D1-2',
      text: '¿Qué los motivaría a dar el paso (costos, seguridad, crecimiento)?',
      options: opts([
        'Nada, estamos bien así',
        'Curiosidad, sin urgencia',
        'Un dolor concreto (p. ej. costos)',
        'Varios motivos identificados',
        'Objetivos de negocio claros y priorizados',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-1',
      text: '¿Tienen reglas claras sobre cómo se maneja la tecnología en la empresa?',
      options: opts([
        'No',
        'Algunas informales',
        'Reglas básicas escritas',
        'Aplicadas y revisadas',
        'Escritas y auditadas',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-2',
      text: '¿Controlan quién puede instalar o cambiar sistemas?',
      options: opts([
        'Sin control',
        'Depende de la persona',
        'Permisos básicos definidos',
        'Roles y aprobaciones',
        'Roles formales + registro de cambios',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-1',
      text: '¿Cómo manejan los usuarios y contraseñas del equipo?',
      options: opts([
        'Cuentas sueltas, sin control',
        'Contraseñas compartidas o simples',
        'Cada persona con su cuenta',
        'Cuentas centralizadas + contraseñas robustas',
        'Cuentas centralizadas + doble verificación',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-2',
      text: '¿Qué protecciones de seguridad tienen hoy?',
      options: opts([
        'Mínimas o ninguna',
        'Antivirus básico',
        'Antivirus + respaldos + firewall',
        'Seguridad definida y actualizada',
        'Seguridad monitoreada y probada',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-1',
      text: '¿En qué estado están sus equipos y servidores?',
      options: opts([
        'Antiguos, sin estándar',
        'Mixtos, poco documentados',
        'Estandarizados en parte',
        'Estandarizados y documentados',
        'Estandarizados y automatizados',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-2',
      text: '¿Cómo instalan y configuran sus equipos y servidores?',
      options: opts([
        'Todo a mano, caso por caso',
        'A mano con algunas guías',
        'Con plantillas o imágenes base',
        'Parcialmente automatizado',
        'Automatizado con plantillas',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-1',
      text: '¿Tienen una lista al día de sus sistemas y aplicaciones?',
      options: opts([
        'No',
        'Parcial o desactualizada',
        'Lista básica',
        'Lista completa',
        'Completa y al día, con nivel de importancia',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-2',
      text: '¿Saben si sus aplicaciones podrían funcionar en la nube?',
      options: opts([
        'No lo sabemos',
        'Lo intuimos, sin evaluar',
        'Evaluamos algunas',
        'Sabemos cuáles sí y cuáles no',
        'Lo sabemos y tenemos un plan',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-1',
      text: '¿Cómo se enteran y resuelven cuando algo falla?',
      options: opts([
        'Solo cuando algo se cae',
        'Revisiones manuales esporádicas',
        'Monitoreo básico + soporte definido',
        'Monitoreo que avisa antes',
        'Monitoreo proactivo + procesos formales',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-2',
      text: '¿Tienen copias de seguridad y un plan si un servidor falla?',
      options: opts([
        'Sin copias de seguridad',
        'Copias ocasionales, sin probar',
        'Copias regulares',
        'Copias + plan de recuperación',
        'Copias probadas + recuperación documentada',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-1',
      text: '¿Conocen y controlan cuánto gastan en tecnología (equipos, licencias)?',
      options: opts([
        'No lo medimos',
        'Idea general',
        'Lo registramos',
        'Presupuesto anual claro',
        'Presupuesto + seguimiento y control',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-2',
      text: '¿Cómo planifican la compra y renovación de equipos?',
      options: opts([
        'Solo cuando algo se rompe',
        'Reactivo, sin plan',
        'Renovación informal',
        'Plan de inversión básico',
        'Plan de inversión definido y priorizado',
      ]),
    },
    {
      dimension: 'D8',
      id: 'D8-1',
      text: '¿Quién maneja su tecnología y qué tan preparado está el equipo?',
      options: opts([
        'Una persona o externo, sin plan',
        'Conocimiento limitado en pocas personas',
        'Equipo con roles básicos',
        'Roles claros + capacitación ocasional',
        'Equipo con roles y plan de capacitación',
      ]),
    },
  ],

  // ---------------------------------------------------------------------
  // ETAPA 2 — M365 parcial + 1 servidor
  // ---------------------------------------------------------------------
  2: [
    {
      dimension: 'D1',
      id: 'D1-1',
      text: '¿Tienen un plan para terminar de pasar a Microsoft 365 y la nube?',
      options: opts([
        'No',
        'Idea informal',
        'Plan básico',
        'Plan con objetivos',
        'Plan alineado al negocio con metas',
      ]),
    },
    {
      dimension: 'D1',
      id: 'D1-2',
      text: '¿La dirección impulsa y le da seguimiento al avance hacia la nube?',
      options: opts([
        'No participa',
        'Interés aislado',
        'Apoya, sin métricas',
        'Impulsa y sigue metas iniciales',
        'Revisa activamente el valor que aporta',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-1',
      text: '¿Tienen reglas claras para manejar Microsoft 365 y lo que queda en sus oficinas?',
      options: opts([
        'Sin reglas',
        'Básicas e inconsistentes',
        'Reglas definidas en M365',
        'Aplicadas y revisadas',
        'Automatizadas y auditadas',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-2',
      text: '¿Controlan quién tiene permisos de administrador y qué cambios hace?',
      options: opts([
        'Sin control',
        'Manual',
        'Roles definidos',
        'Roles + revisiones',
        'Roles + registro de cambios',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-1',
      text: '¿Cómo controlan el acceso de los usuarios (contraseñas, doble verificación)?',
      options: opts([
        'Cuentas separadas, sin doble verificación',
        'Doble verificación en algunos',
        'Cuentas centralizadas + doble verificación general',
        'Identidad unificada entre nube y oficina',
        'Acceso según riesgo y con permisos mínimos',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-2',
      text: '¿Qué tan protegidos están sus correos, equipos y dispositivos?',
      options: opts([
        'Configuración de fábrica',
        'Algunas medidas básicas',
        'Protecciones activas',
        'Protección avanzada y medida',
        'Seguridad integral en marcha',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-1',
      text: '¿Qué van a hacer con el servidor que todavía tienen en sus oficinas?',
      options: opts([
        'Es crítico y no hay plan',
        'Estable, pero sin plan de salida',
        'Con plan de migrar o retirar',
        'En proceso de migrar',
        'Casi retirado / estandarizado',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-2',
      text: 'Cuando montan algo nuevo en la nube, ¿se hace con plantillas repetibles o a mano cada vez?',
      options: opts([
        'Siempre a mano',
        'Con algunas guías sueltas',
        'Con plantillas base',
        'Con automatización parcial (tu equipo o un partner)',
        'Con plantillas para todo lo nuevo',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-1',
      text: '¿Tienen un plan para migrar o retirar ese último servidor y sus sistemas?',
      options: opts([
        'No',
        'Idea, sin plan',
        'Plan definido',
        'Migración en curso',
        'Ejecutándose por etapas',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-2',
      text: '¿Qué tanto aprovechan las herramientas de Microsoft 365 (Teams, SharePoint, etc.)?',
      options: opts([
        'Solo correo',
        'Correo + poco más',
        'Uso medio',
        'Uso amplio',
        'Uso completo y gestionado',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-1',
      text: '¿Cómo vigilan que Microsoft 365 y su servidor funcionen bien?',
      options: opts([
        'Solo cuando algo se cae',
        'Básico y disperso',
        'Monitoreo definido',
        'Monitoreo que avisa antes',
        'Vigilancia completa + procesos',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-2',
      text: '¿Tienen copias de seguridad y un plan de recuperación si algo falla?',
      options: opts([
        'No',
        'Solo local',
        'Copias definidas',
        'Copias en la nube + plan',
        'Recuperación probada',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-1',
      text: '¿Aprovechan bien las licencias de Microsoft 365 que pagan?',
      options: opts([
        'No sabemos',
        'Pagamos sin revisar',
        'Revisamos licencias',
        'Ajustamos según uso',
        'Optimización continua',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-2',
      text: '¿Tienen claro cuánto gastan en nube y tecnología?',
      options: opts([
        'No',
        'Solo la factura total',
        'Desglose básico',
        'Presupuesto + seguimiento',
        'Control por área',
      ]),
    },
    {
      dimension: 'D8',
      id: 'D8-1',
      text: '¿Cuentan con las capacidades para manejar la nube (con su equipo o un partner)?',
      options: opts([
        'No, dependemos de terceros sin plan',
        'Conocimiento limitado',
        'Roles definidos + algo de capacitación',
        'Equipo capacitado o partner sólido',
        'Equipo con roles y plan de certificación',
      ]),
    },
  ],

  // ---------------------------------------------------------------------
  // ETAPA 3 — M365 completo + Azure para DR
  // ---------------------------------------------------------------------
  3: [
    {
      dimension: 'D1',
      id: 'D1-1',
      text: 'Hoy usan la nube sobre todo para respaldo. ¿Tienen un plan para llevar también sus sistemas del día a día a la nube?',
      options: opts([
        'No',
        'Idea informal',
        'Estrategia escrita',
        'Con caso de negocio y metas',
        'La nube como motor de innovación',
      ]),
    },
    {
      dimension: 'D1',
      id: 'D1-2',
      text: '¿Miden el valor que les da la nube (ahorro, agilidad) y la dirección lo sigue?',
      options: opts([
        'No',
        'Hay un responsable, sin métricas',
        'Metas iniciales',
        'La dirección revisa métricas',
        'Deciden con datos de valor',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-1',
      text: '¿Su nube está ordenada, con reglas claras para crear recursos de forma controlada?',
      options: opts([
        'No, recursos sueltos',
        'Controles básicos',
        'Base ordenada + reglas',
        'Reglas en toda la organización',
        'Autoservicio con barreras seguras',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-2',
      text: '¿Controlan quién crea recursos y quién accede a qué en la nube?',
      options: opts([
        'Sin control',
        'Manual',
        'Roles definidos',
        'Automatizado + revisiones',
        'Reglas automáticas + auditoría',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-1',
      text: '¿Qué tan protegido está su entorno en la nube?',
      options: opts([
        'Configuración de fábrica',
        'Medidas básicas',
        'Protección activa + red segmentada',
        'Seguridad integrada al desarrollo',
        'Seguridad proactiva y automatizada',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-2',
      text: '¿Cómo controlan los accesos, sobre todo las cuentas con más permisos?',
      options: opts([
        'Básico',
        'Doble verificación general',
        'Acceso según contexto',
        'Permisos mínimos y temporales',
        'Verificación continua de cada acceso',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-1',
      text: '¿Su nube está montada sobre una base ordenada y estandarizada?',
      options: opts([
        'No',
        'Recursos sin estándar',
        'Base inicial ordenada',
        'Base empresarial completa',
        'Plataforma de autoservicio',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-2',
      text: '¿Los recursos de su nube se crean con plantillas automatizadas (por su equipo o un partner)?',
      options: opts([
        'A mano cada vez',
        'Con algunos scripts sueltos',
        'Con plantillas para lo nuevo',
        'Con plantillas estandarizadas en toda la organización',
        'Con plantillas reutilizables y versionadas',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-1',
      text: '¿Tienen un plan para llevar sus sistemas principales a la nube, sistema por sistema?',
      options: opts([
        'No, solo respaldo',
        'Idea sin plan',
        'Plan por sistema y por etapas',
        'Migración productiva en curso',
        'Ya migramos la mayoría',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-2',
      text: '¿Usan servicios de nube que se administran solos, o todo sigue en servidores que hay que mantener?',
      options: opts([
        'Todo en servidores que mantenemos',
        'Alguna prueba de servicios gestionados',
        'Algunos sistemas en servicios gestionados',
        'Servicios gestionados como preferencia',
        'Aprovechamos la nube al máximo',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-1',
      text: '¿Cómo vigilan y operan su nube y el resto de sus sistemas?',
      options: opts([
        'Solo cuando algo se cae',
        'Monitoreo básico',
        'Vigilancia + guías de respuesta',
        'Operación con automatización',
        'Detección y corrección automáticas',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-2',
      text: '¿Qué tan preparados están para seguir operando si hay una caída?',
      options: opts([
        'Solo respaldo',
        'Plan sin probar',
        'Plan de recuperación documentado',
        'Plan probado periódicamente',
        'Resiliencia por diseño',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-1',
      text: '¿Controlan y optimizan cuánto gastan en la nube (su equipo o un partner)?',
      options: opts([
        'Sin visibilidad',
        'Solo la factura',
        'Gasto etiquetado y visible',
        'Presupuestos + ahorros por reservas',
        'Optimización continua del costo',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-2',
      text: '¿Saben cuánto gasta en la nube cada área o proyecto?',
      options: opts([
        'No',
        'Total, sin desglose',
        'Desglose por área (informativo)',
        'Se cobra internamente por área',
        'Costo por unidad de negocio',
      ]),
    },
    {
      dimension: 'D8',
      id: 'D8-1',
      text: '¿Cuentan con las capacidades de nube en el equipo (o con un partner que las aporte)?',
      options: opts([
        'No, dependemos de terceros sin plan',
        'Conocimiento limitado',
        'Equipo en formación + capacitación',
        'Equipo consolidado + certificaciones',
        'Organización orientada a la nube',
      ]),
    },
  ],

  // ---------------------------------------------------------------------
  // ETAPA 4 — M365 completo + toda la infra en Azure
  // ---------------------------------------------------------------------
  4: [
    {
      dimension: 'D1',
      id: 'D1-1',
      text: '¿La nube es una ventaja competitiva para su negocio, no solo infraestructura?',
      options: opts([
        'Solo infraestructura',
        'Eficiencia operativa',
        'Habilita nuevos servicios',
        'Central en la estrategia',
        'Motor de innovación medido por valor',
      ]),
    },
    {
      dimension: 'D1',
      id: 'D1-2',
      text: '¿Están usando datos e inteligencia artificial para el negocio (tableros, asistentes, IA a medida)?',
      options: opts([
        'No',
        'Curiosidad',
        'Pruebas aisladas',
        'Casos en producción',
        'Estrategia de datos e IA',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-1',
      text: '¿Las reglas de su nube se aplican solas y a gran escala, sin hacerlo a mano?',
      options: opts([
        'Manual',
        'Parcial',
        'Reglas automáticas',
        'Automáticas en toda la organización',
        'Autoservicio gobernado',
      ]),
    },
    {
      dimension: 'D2',
      id: 'D2-2',
      text: '¿Logran equilibrar control y velocidad para que los equipos avancen rápido y seguros?',
      options: opts([
        'Todo controlado, lento',
        'Inconsistente',
        'Roles + barreras',
        'Autoservicio con barreras',
        'Plataforma que habilita velocidad segura',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-1',
      text: '¿Qué tan madura es su seguridad (verificar siempre, seguridad dentro del desarrollo)?',
      options: opts([
        'Incipiente',
        'Parcial',
        'Verificación de cada acceso en marcha',
        'Seguridad integrada al desarrollo',
        'Seguridad proactiva y como estándar',
      ]),
    },
    {
      dimension: 'D3',
      id: 'D3-2',
      text: '¿Cómo detectan y responden a los ataques?',
      options: opts([
        'Reactiva',
        'Alertas básicas',
        'Detección centralizada',
        'Respuesta automatizada',
        'Búsqueda continua de amenazas',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-1',
      text: '¿Sus equipos pueden crear lo que necesitan en la nube por sí mismos, dentro de reglas seguras?',
      options: opts([
        'No',
        'Base estándar disponible',
        'Plantillas reutilizables',
        'Portal / plantillas de autoservicio',
        'Plataforma interna madura',
      ]),
    },
    {
      dimension: 'D4',
      id: 'D4-2',
      text: '¿Revisan y mejoran su arquitectura de forma continua con buenas prácticas?',
      options: opts([
        'No se revisa',
        'Revisión puntual',
        'Revisiones periódicas',
        'Mejora continua',
        'Optimización guiada por datos',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-1',
      text: '¿Qué tan modernizados están sus sistemas (rediseñados para la nube, no solo movidos tal cual)?',
      options: opts([
        'Mayoría movidos tal cual',
        'Algo modernizado',
        'Servicios gestionados como norma',
        'Uso amplio de contenedores/serverless',
        'Arquitecturas modernas + entrega continua',
      ]),
    },
    {
      dimension: 'D5',
      id: 'D5-2',
      text: '¿Modernizar es algo permanente o proyectos sueltos?',
      options: opts([
        'No se hace',
        'Proyectos aislados',
        'Lista de pendientes de modernización',
        'Gestionado como portafolio',
        'Cultura de mejora permanente',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-1',
      text: '¿Operan con metas medibles de disponibilidad y rendimiento?',
      options: opts([
        'Reactivo',
        'Solo monitoreo',
        'Metas de servicio definidas',
        'Metas + automatización',
        'Se autoajusta según las metas',
      ]),
    },
    {
      dimension: 'D6',
      id: 'D6-2',
      text: '¿Qué tanto se corrige solo su sistema ante problemas comunes?',
      options: opts([
        'Todo manual',
        'Con scripts',
        'Automatización parcial',
        'Se corrige solo en muchos casos',
        'Operación casi autónoma',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-1',
      text: '¿Qué tan maduros son gestionando el costo de la nube (por área, por unidad de negocio)?',
      options: opts([
        'Solo lo vemos',
        'Desglose por área (informativo)',
        'Se cobra por área + ahorros por reservas',
        'Pronóstico + costo por unidad',
        'Cultura de costo-valor madura',
      ]),
    },
    {
      dimension: 'D7',
      id: 'D7-2',
      text: '¿La gente de tecnología decide considerando el costo y el valor?',
      options: opts([
        'No',
        'A veces',
        'Con datos de costo',
        'El costo se considera al diseñar',
        'Optimización continua por valor',
      ]),
    },
    {
      dimension: 'D8',
      id: 'D8-1',
      text: '¿La cultura y las capacidades de nube están repartidas en toda la organización?',
      options: opts([
        'No',
        'Concentradas en un equipo central',
        'Equipo central + certificaciones',
        'Capacidades distribuidas',
        'Cultura de nube + aprendizaje continuo',
      ]),
    },
  ],
}
