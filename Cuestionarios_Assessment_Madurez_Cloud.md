# Cuestionarios — Assessment de Madurez Cloud (Celeren)

Basado en el **Cloud Adoption Framework (CAF) de Microsoft**. Herramienta de entrada comercial para gerentes de tecnología.

## Cómo funciona

1. **Triage (5 preguntas)** → ubica al cliente en una de **4 etapas**.
2. Según la etapa, se muestra **un formulario de 15 preguntas** escrito para su realidad (no se pregunta por cosas que no tienen).
3. Cada respuesta tiene un **puntaje 1–5** (el número de la opción elegida ES el puntaje).
4. Las preguntas se agrupan en **8 dimensiones**. El puntaje de cada dimensión = **promedio** de sus preguntas.
5. Se aplica el **peso** de cada dimensión → **puntaje global ponderado** + nivel de madurez.
6. Los puntajes alimentan el **FODA cruzado** y los resultados (debilidades → próximo paso).

### Las 4 etapas
| Etapa | Perfil del cliente |
|---|---|
| **1** | Gmail / Workspace + servidores locales (fuera del ecosistema Microsoft cloud) |
| **2** | Microsoft 365 parcial + al menos 1 servidor local |
| **3** | Microsoft 365 completo + Azure solo para DR/respaldo (producción aún fuera de Azure) |
| **4** | Microsoft 365 completo + toda la infraestructura en Azure (cloud-first) |

### Las 8 dimensiones y sus pesos
| # | Dimensión | Peso | Nº preguntas |
|---|---|---|---|
| D1 | Estrategia y alineación al negocio | 12% | 2 |
| D2 | Gobierno y cumplimiento | 12% | 2 |
| D3 | Seguridad e identidad | 14% | 2 |
| D4 | Plataforma, arquitectura y landing zone | 12% | 2 |
| D5 | Migración y modernización de aplicaciones | 16% | 2 |
| D6 | Operaciones y fiabilidad | 12% | 2 |
| D7 | Gestión financiera (FinOps) | 12% | 2 |
| D8 | Personas, skills y organización (CCoE) | 10% | 1 |

### Escala de madurez (universal)
**1** Inicial/Ad hoc · **2** Emergente · **3** Definido · **4** Gestionado · **5** Optimizado

Nivel global según el puntaje ponderado: `<1.5` Inicial · `1.5–2.5` Emergente · `2.5–3.5` Definido · `3.5–4.5` Gestionado · `>4.5` Optimizado

> **Nota importante:** los formularios de etapas bajas usan lenguaje sencillo y su rango realista de puntaje es menor en las dimensiones cloud (¡eso es correcto!: revela la brecha). El puntaje se interpreta **respecto al objetivo de su etapa** (el paso a la etapa N+1), no como comparación absoluta entre etapas.

---

# 0) Cuestionario de Triage (5 preguntas)

*Objetivo: ubicar la etapa. Lenguaje simple, sin tecnicismos.*

**T1. ¿Qué usan para correo y productividad (documentos, calendario)?**
(A) Gmail / Google Workspace · (B) Microsoft 365 en parte de la empresa · (C) Microsoft 365 en toda la empresa

**T2. ¿Tienen servidores propios en sus oficinas (on-premise)?**
(A) Sí, varios o los principales · (B) Sí, queda uno · (C) No, ya nada local

**T3. ¿Usan alguna nube pública (Azure, AWS, Google)?**
(A) No usamos nube · (B) Solo para respaldo o recuperación (DR) · (C) Corremos aplicaciones productivas en la nube

**T4. ¿Dónde corren sus aplicaciones de negocio (ERP, sistemas core)?**
(A) En servidores locales · (B) Mixto: algunas ya en la nube · (C) Prácticamente todo en la nube

**T5. ¿Cómo manejan la continuidad / recuperación ante desastres?**
(A) Respaldo local o no tenemos · (B) Respaldo en la nube · (C) Plan de recuperación (DR) en la nube

### Lógica para asignar la etapa
```
SI T1 = A (Gmail)            → Etapa 1
SI NO, SI T1 = B (M365 parcial) → Etapa 2
SI NO (T1 = C, M365 completo):
    SI T3 = C Y T2 = C Y T4 = C → Etapa 4
    EN OTRO CASO                → Etapa 3
```
*(T4 y T5 dan contexto extra: el motor puede usarlas para pre-cargar dimensiones como Operaciones/DR.)*

---

# 1) Formulario — ETAPA 1 (Gmail + servidores locales)

*Cliente fuera del ecosistema Microsoft cloud. Preguntas sobre su realidad actual y su preparación para el primer paso.*

### D1. Estrategia y alineación al negocio (12%)
1. ¿Han considerado modernizar su TI o mover servicios a la nube?
   (1) No lo hemos pensado · (2) Lo comentamos informalmente · (3) Hay interés y algunas ideas · (4) Tenemos un plan inicial · (5) Plan con objetivos de negocio y presupuesto
2. ¿Qué los motivaría a cambiar (costos, seguridad, crecimiento)?
   (1) Nada, estamos bien así · (2) Curiosidad, sin urgencia · (3) Un dolor concreto (p. ej. costos) · (4) Varios drivers identificados · (5) Objetivos de negocio claros y priorizados

### D2. Gobierno y cumplimiento (12%)
1. ¿Tienen políticas y controles definidos para su TI?
   (1) No · (2) Algunas informales · (3) Políticas básicas documentadas · (4) Aplicadas y revisadas · (5) Documentadas y auditadas
2. ¿Cómo controlan quién instala o cambia sistemas?
   (1) Sin control · (2) Depende de la persona · (3) Permisos básicos definidos · (4) Roles y aprobaciones · (5) Roles formales + registro/auditoría

### D3. Seguridad e identidad (14%)
1. ¿Cómo gestionan las cuentas y accesos de los usuarios?
   (1) Cuentas sueltas, sin control · (2) Contraseñas compartidas/simples · (3) Cuentas individuales gestionadas · (4) Directorio central + contraseñas robustas · (5) Directorio + MFA + políticas de acceso
2. ¿Qué protecciones de seguridad tienen hoy?
   (1) Mínimas o ninguna · (2) Antivirus básico · (3) Antivirus + respaldos + firewall · (4) Postura definida y actualizada · (5) Seguridad monitoreada y probada

### D4. Plataforma e infraestructura (12%)
1. ¿En qué estado está su infraestructura de servidores?
   (1) Equipos antiguos, sin estándar · (2) Mixto, poco documentado · (3) Estandarizada en parte · (4) Estandarizada y documentada · (5) Estandarizada + automatizada
2. ¿Cómo configuran/instalan servidores y equipos?
   (1) Todo manual, caso por caso · (2) Manual con algunas guías · (3) Plantillas o imágenes base · (4) Parcialmente automatizado · (5) Automatizado con plantillas

### D5. Migración y modernización de aplicaciones (16%)
1. ¿Tienen un inventario de sus aplicaciones y servidores?
   (1) No · (2) Parcial/desactualizado · (3) Inventario básico · (4) Inventario completo · (5) Completo y actualizado, con criticidad
2. ¿Saben si sus aplicaciones podrían funcionar en la nube?
   (1) No lo sabemos · (2) Lo intuimos, sin evaluar · (3) Evaluamos algunas · (4) Sabemos cuáles sí/no · (5) Sabemos y tenemos un plan de migración

### D6. Operaciones y fiabilidad (12%)
1. ¿Cómo monitorean y dan soporte a sus sistemas?
   (1) Solo cuando algo falla · (2) Revisiones manuales esporádicas · (3) Monitoreo básico + soporte definido · (4) Monitoreo proactivo · (5) Proactivo + procesos formales
2. ¿Tienen respaldos y un plan si un servidor falla?
   (1) Sin respaldos · (2) Respaldos ocasionales sin probar · (3) Respaldos regulares · (4) Respaldos + plan de recuperación · (5) Respaldos probados + recuperación documentada

### D7. Gestión financiera / costos (12%)
1. ¿Conocen y controlan sus costos de TI (hardware, licencias)?
   (1) No los medimos · (2) Idea general · (3) Los registramos · (4) Presupuesto anual claro · (5) Presupuesto + seguimiento y control
2. ¿Cómo planifican inversiones y renovación de equipos?
   (1) Solo cuando algo se rompe · (2) Reactivo, sin plan · (3) Renovación informal · (4) Plan de inversión básico · (5) Plan de inversión definido y priorizado

### D8. Personas, skills y organización (10%)
1. ¿Quién administra su TI y qué tan preparado está el equipo?
   (1) Una persona o externo, sin plan · (2) Conocimiento limitado en pocas personas · (3) Equipo con roles básicos · (4) Roles claros + capacitación ocasional · (5) Equipo con roles y plan de capacitación

---

# 2) Formulario — ETAPA 2 (M365 parcial + 1 servidor)

*Cliente ya usa Microsoft 365 en parte y aún depende de al menos un servidor local.*

### D1. Estrategia y alineación al negocio (12%)
1. ¿Tienen un plan para completar su adopción de Microsoft 365 y la nube?
   (1) No · (2) Idea informal · (3) Plan básico · (4) Plan con objetivos · (5) Plan alineado al negocio con KPIs
2. ¿La dirección impulsa y mide la iniciativa cloud?
   (1) No participa · (2) Interés aislado · (3) Apoya, sin métricas · (4) Sponsor + KPIs iniciales · (5) Sponsor activo revisa el valor

### D2. Gobierno y cumplimiento (12%)
1. ¿Cómo gobiernan M365 y lo que queda on-premise (políticas, cumplimiento)?
   (1) Sin políticas · (2) Básicas e inconsistentes · (3) Políticas definidas en M365 · (4) Aplicadas y revisadas · (5) Automatizadas y auditadas
2. ¿Controlan configuraciones y accesos administrativos?
   (1) Sin control · (2) Manual · (3) Roles definidos (RBAC) · (4) Roles + revisiones · (5) Roles + registro/auditoría

### D3. Seguridad e identidad (14%)
1. ¿Cómo gestionan la identidad de usuarios entre M365 y lo local?
   (1) Cuentas separadas, sin MFA · (2) MFA parcial · (3) Entra ID + MFA generalizado · (4) Identidad híbrida consolidada · (5) Acceso condicional + privilegios mínimos
2. ¿Qué nivel de seguridad tienen en M365 y dispositivos?
   (1) Configuración por defecto · (2) Algunas medidas básicas · (3) Políticas de seguridad activas · (4) Defender + postura medida · (5) Zero Trust en marcha

### D4. Plataforma e infraestructura (12%)
1. ¿En qué estado está el servidor/infra que aún tienen local?
   (1) Crítico y sin plan · (2) Estable, sin plan de salida · (3) Con plan de migración/retiro · (4) En proceso de migrar · (5) Casi retirado / estandarizado
2. ¿Usan plantillas o automatización para desplegar recursos?
   (1) No, manual · (2) Guías sueltas · (3) Plantillas base · (4) Automatización parcial (IaC) · (5) IaC para lo nuevo

### D5. Migración y modernización de aplicaciones (16%)
1. ¿Tienen plan para migrar o retirar el último servidor y sus cargas?
   (1) No · (2) Idea, sin plan · (3) Plan definido · (4) Migración en curso · (5) Plan ejecutándose por olas
2. ¿Qué tanto aprovechan los servicios de M365 (Teams, SharePoint, etc.)?
   (1) Solo correo · (2) Correo + poco más · (3) Uso medio · (4) Uso amplio · (5) Adopción completa y gestionada

### D6. Operaciones y fiabilidad (12%)
1. ¿Cómo monitorean M365 y el servidor local?
   (1) Reactivo · (2) Básico y disperso · (3) Monitoreo definido · (4) Proactivo + alertas · (5) Observabilidad + procesos
2. ¿Tienen respaldo y recuperación para M365 y el servidor?
   (1) No · (2) Solo local · (3) Respaldos definidos · (4) Respaldo en nube + plan · (5) DR probado

### D7. Gestión financiera (FinOps) (12%)
1. ¿Optimizan las licencias de M365 (uso vs. lo que pagan)?
   (1) No sabemos · (2) Pagamos sin revisar · (3) Revisamos licencias · (4) Ajustamos según uso · (5) Optimización continua
2. ¿Tienen visibilidad de sus costos de nube/TI?
   (1) No · (2) Solo la factura total · (3) Desglose básico · (4) Presupuesto + seguimiento · (5) Control por área

### D8. Personas, skills y organización (10%)
1. ¿El equipo tiene habilidades para administrar M365 y avanzar a la nube?
   (1) No, dependen de terceros · (2) Conocimiento limitado · (3) Roles definidos + algo de capacitación · (4) Equipo capacitado · (5) Roles + plan de certificación (CCoE inicial)

---

# 3) Formulario — ETAPA 3 (M365 completo + Azure para DR)

*Cliente ya en Azure, principalmente para DR/respaldo. La producción aún no está toda en Azure.*

### D1. Estrategia y alineación al negocio (12%)
1. ¿Tienen una estrategia para llevar la producción a Azure (no solo DR)?
   (1) No · (2) Idea informal · (3) Estrategia documentada · (4) Con business case y KPIs · (5) Cloud como motor de innovación
2. ¿Miden el valor de la nube (TCO, agilidad) con patrocinio ejecutivo?
   (1) No · (2) Sponsor sin métricas · (3) KPIs iniciales · (4) Sponsor revisa métricas · (5) Decisiones por datos de valor

### D2. Gobierno y cumplimiento (12%)
1. ¿Tienen gobierno en Azure (landing zone, Azure Policy, cumplimiento)?
   (1) No, recursos sueltos · (2) Controles básicos · (3) Landing zone + Azure Policy · (4) Management groups + guardrails · (5) Autoservicio con guardrails
2. ¿Cómo controlan despliegues y accesos en Azure?
   (1) Sin control · (2) Manual · (3) RBAC definido · (4) Automatizado + revisiones · (5) Políticas como código + auditoría

### D3. Seguridad e identidad (14%)
1. ¿Qué postura de seguridad tienen en Azure?
   (1) Por defecto · (2) Medidas básicas · (3) Defender for Cloud + segmentación · (4) Zero Trust + DevSecOps · (5) Seguridad como código + threat hunting
2. ¿Cómo gestionan identidad y accesos privilegiados?
   (1) Básico · (2) MFA general · (3) Entra ID + acceso condicional · (4) Privilegios mínimos (PIM) · (5) Identidad continua / Zero Trust

### D4. Plataforma, arquitectura y landing zone (12%)
1. ¿Tienen una landing zone y estándares en Azure?
   (1) No · (2) Recursos sin estándar · (3) Landing zone inicial · (4) Landing zone empresarial · (5) Plataforma de autoservicio
2. ¿Usan Infraestructura como Código (Bicep/Terraform)?
   (1) No, portal manual · (2) Scripts sueltos · (3) IaC para lo nuevo · (4) IaC versionado en la organización · (5) IaC con módulos reutilizables

### D5. Migración y modernización de aplicaciones (16%)
1. ¿Tienen plan para migrar cargas productivas a Azure (estrategia 6 R's)?
   (1) No, solo DR · (2) Idea sin plan · (3) Estrategia 6 R's + olas · (4) Migración productiva en curso · (5) Mayoría migrada
2. ¿Usan servicios PaaS o siguen todo en máquinas virtuales?
   (1) Todo en VMs · (2) Alguna prueba PaaS · (3) Algunas cargas en PaaS · (4) PaaS como preferencia · (5) Cloud-native donde aplica

### D6. Operaciones y fiabilidad (12%)
1. ¿Cómo monitorean y operan su entorno Azure + el resto?
   (1) Reactivo · (2) Monitoreo básico · (3) Observabilidad + runbooks · (4) SRE + automatización · (5) SLOs + auto-remediación
2. ¿Qué madurez tiene su DR/resiliencia en Azure?
   (1) Solo respaldo · (2) DR sin probar · (3) DR documentado · (4) DR probado periódicamente · (5) Resiliencia por diseño

### D7. Gestión financiera (FinOps) (12%)
1. ¿Cómo controlan y optimizan el gasto en Azure?
   (1) Sin visibilidad · (2) Solo la factura · (3) Tags + Cost Management · (4) Presupuestos + reservas · (5) FinOps con optimización continua
2. ¿Asignan costos por área o proyecto?
   (1) No · (2) Total sin desglose · (3) Tags + showback · (4) Chargeback + reservas · (5) Costo unitario por negocio

### D8. Personas, skills y organización (10%)
1. ¿Tienen un CCoE y skills de Azure en el equipo?
   (1) No, dependen de terceros · (2) Conocimiento limitado · (3) CCoE en formación + capacitación · (4) CCoE consolidado + certificaciones · (5) Organización cloud-first

---

# 4) Formulario — ETAPA 4 (M365 completo + toda la infra en Azure)

*Cliente cloud-first. El reto ya no es la presencia en la nube, sino la calidad: optimización, modernización, seguridad a escala y datos/IA.*

### D1. Estrategia y alineación al negocio (12%)
1. ¿La nube es un motor de innovación y ventaja competitiva para el negocio?
   (1) Solo infraestructura · (2) Eficiencia operativa · (3) Habilita nuevos servicios · (4) Central en la estrategia · (5) Motor de innovación medido por valor
2. ¿Exploran Datos e IA (Microsoft Fabric, Azure AI, Copilot) para el negocio?
   (1) No · (2) Curiosidad · (3) Pilotos aislados · (4) Casos en producción · (5) Estrategia de datos e IA

### D2. Gobierno y cumplimiento (12%)
1. ¿Su gobierno en Azure es automatizado y a escala?
   (1) Manual · (2) Parcial · (3) Políticas como código · (4) Guardrails automáticos en toda la organización · (5) Autoservicio gobernado
2. ¿Balancean control y velocidad para los equipos?
   (1) Todo controlado, lento · (2) Inconsistente · (3) Roles + guardrails · (4) Autoservicio con barreras · (5) Plataforma que habilita velocidad segura

### D3. Seguridad e identidad (14%)
1. ¿Qué madurez tienen en Zero Trust y DevSecOps?
   (1) Incipiente · (2) Parcial · (3) Zero Trust en marcha · (4) Integrado en el ciclo (DevSecOps) · (5) Seguridad como código + proactiva
2. ¿Cómo gestionan detección y respuesta ante amenazas?
   (1) Reactiva · (2) Alertas básicas · (3) Defender + SIEM · (4) Respuesta automatizada · (5) Threat hunting continuo

### D4. Plataforma, arquitectura y landing zone (12%)
1. ¿Tienen plataforma de autoservicio para equipos de producto (platform engineering)?
   (1) No · (2) Landing zone estándar · (3) IaC reutilizable · (4) Portal/plantillas de autoservicio · (5) Plataforma interna madura
2. ¿Optimizan la arquitectura de forma continua (Well-Architected)?
   (1) No se revisa · (2) Revisión puntual · (3) Revisiones periódicas · (4) Mejora continua · (5) Optimización guiada por datos

### D5. Migración y modernización de aplicaciones (16%)
1. ¿Qué tan modernizadas están sus cargas (vs. solo lift-and-shift)?
   (1) Mayoría en VMs · (2) Algo de PaaS · (3) PaaS como norma · (4) Contenedores/serverless amplio · (5) Microservicios + entrega continua
2. ¿Modernizar es una práctica permanente?
   (1) No · (2) Proyectos aislados · (3) Backlog de modernización · (4) Gestionado por portafolio · (5) Cultura cloud-native

### D6. Operaciones y fiabilidad (12%)
1. ¿Operan con SRE y objetivos de nivel de servicio (SLOs)?
   (1) Reactivo · (2) Monitoreo · (3) SLIs/SLOs definidos · (4) SRE + automatización · (5) Autooptimización por SLOs
2. ¿Qué nivel de automatización tienen (auto-remediación)?
   (1) Manual · (2) Scripts · (3) Automatización parcial · (4) Auto-remediación · (5) Operación autónoma

### D7. Gestión financiera (FinOps) (12%)
1. ¿Qué madurez FinOps tienen (chargeback, costo unitario)?
   (1) Solo visibilidad · (2) Showback · (3) Chargeback + reservas · (4) Forecast + costo unitario · (5) Cultura FinOps madura
2. ¿La ingeniería decide considerando costo-valor?
   (1) No · (2) A veces · (3) Con datos de costo · (4) Costo en el diseño · (5) Optimización continua por valor

### D8. Personas, skills y organización (10%)
1. ¿Su organización es cloud-first (skills distribuidos, comunidades de práctica)?
   (1) No · (2) CCoE central · (3) CCoE + certificaciones · (4) Capacidades distribuidas · (5) Cloud-first + aprendizaje continuo

---

## Anexo: mapeo respuesta → resultado (para el motor)
- **Puntaje de pregunta** = número de la opción elegida (1–5).
- **Puntaje de dimensión** = promedio de sus preguntas.
- **Puntaje global** = Σ (puntaje_dimensión × peso_dimensión). Pesos: D1 12, D2 12, D3 14, D4 12, D5 16, D6 12, D7 12, D8 10 (suman 100%).
- **FODA cruzada:**
  - *Fortalezas* = dimensiones con puntaje ≥ 4.
  - *Debilidades* = dimensiones con puntaje ≤ 2.
  - *Oportunidades / Amenazas* = derivadas de la etapa y del contexto (mercado, competencia, riesgo/cumplimiento).
  - *Cruces (estrategias):* FO (aprovechar), DO (mejorar para aprovechar → oportunidad de venta), FA (defender), DA (urgente → riesgo).
- **Mensaje de resultado:** "Estás en la Etapa N → estas son tus debilidades → este es el paso a la Etapa N+1" (con el offering asociado).
