import { DIMENSIONS } from '../data/dimensions.js'

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function exportSubmissionAsJson(submission) {
  const content = JSON.stringify(submission, null, 2)
  downloadBlob(content, `assessment-${submission.lead.company || 'cliente'}-${submission.id}.json`, 'application/json')
}

export function exportSubmissionAsCsv(submission) {
  const rows = [
    ['Campo', 'Valor'],
    ['Nombre', submission.lead.name],
    ['Empresa', submission.lead.company],
    ['Cargo', submission.lead.role],
    ['Correo', submission.lead.email],
    ['Teléfono', submission.lead.phone || ''],
    ['Etapa', submission.stage],
    ['Puntaje global', submission.globalScore.toFixed(2)],
    ['Nivel de madurez', submission.maturity],
    ...DIMENSIONS.map((d) => [d.name, (submission.dimensionScores[d.id] ?? 0).toFixed(2)]),
  ]
  const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
  downloadBlob(csv, `assessment-${submission.lead.company || 'cliente'}-${submission.id}.csv`, 'text/csv')
}

/** Abre el cliente de correo con un resumen del resultado, listo para enviar al equipo de Celeren. */
export function buildMailtoSummary(submission, celerenEmail = 'contacto@celeren.com') {
  const subject = `Nuevo assessment de madurez cloud: ${submission.lead.company || submission.lead.name}`
  const bodyLines = [
    `Nombre: ${submission.lead.name}`,
    `Empresa: ${submission.lead.company}`,
    `Cargo: ${submission.lead.role}`,
    `Correo: ${submission.lead.email}`,
    `Teléfono: ${submission.lead.phone || '-'}`,
    '',
    `Etapa detectada: ${submission.stage}`,
    `Puntaje global: ${submission.globalScore.toFixed(2)} (${submission.maturity})`,
    '',
    'Puntaje por dimensión:',
    ...DIMENSIONS.map((d) => `- ${d.name}: ${(submission.dimensionScores[d.id] ?? 0).toFixed(2)}`),
  ]
  const url = `mailto:${celerenEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
  window.location.href = url
}

/**
 * Recorta un canvas en fragmentos verticales de a lo sumo `maxHeightPx` de alto.
 * Se usa solo para la sección rara que por sí sola no entra en una página A4.
 */
function sliceCanvas(canvas, maxHeightPx) {
  const pieces = []
  let offset = 0
  while (offset < canvas.height) {
    const pieceHeight = Math.min(maxHeightPx, canvas.height - offset)
    const pieceCanvas = document.createElement('canvas')
    pieceCanvas.width = canvas.width
    pieceCanvas.height = pieceHeight
    pieceCanvas
      .getContext('2d')
      .drawImage(canvas, 0, offset, canvas.width, pieceHeight, 0, 0, canvas.width, pieceHeight)
    pieces.push(pieceCanvas)
    offset += pieceHeight
  }
  return pieces
}

/**
 * Genera el PDF del reporte capturando cada sección (`[data-pdf-section]`) por
 * separado y fluyéndolas en páginas A4, en vez de rasterizar todo el documento
 * de una sola vez. Esto evita que una tarjeta quede cortada a la mitad entre
 * dos páginas y, al usar JPEG en vez de PNG a una escala moderada, reduce
 * drásticamente el peso del archivo frente a una sola captura gigante.
 */
export async function exportElementAsPdf(containerEl, filename = 'assessment-celeren.pdf') {
  // Usamos html2canvas-pro (no el html2canvas original) porque Tailwind v4 genera
  // colores con color-mix()/oklab() para los modificadores de opacidad (p. ej. bg-x/10),
  // y el html2canvas clásico no sabe parsear esas funciones de color modernas.
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas-pro'),
  ])

  const sectionEls = Array.from(containerEl.querySelectorAll('[data-pdf-section]'))
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 36
  const gap = 14
  const footerSpace = 20
  const contentWidth = pageWidth - margin * 2
  const availableHeight = pageHeight - margin * 2 - footerSpace

  // 1) Capturar cada sección una sola vez. Si una sección por sí sola es más alta
  // que una página completa, se recorta en fragmentos que sí entran, cada uno
  // marcado para ocupar su propia página (nunca se mezcla con otra sección).
  const pieces = []
  for (const el of sectionEls) {
    const canvas = await html2canvas(el, { scale: 1.5, backgroundColor: '#ffffff', useCORS: true })
    const pxPerPt = canvas.width / contentWidth
    const maxHeightPx = Math.floor(availableHeight * pxPerPt)

    if (canvas.height <= maxHeightPx) {
      pieces.push({ data: canvas.toDataURL('image/jpeg', 0.92), heightPt: canvas.height / pxPerPt, forcePage: false })
    } else {
      for (const pieceCanvas of sliceCanvas(canvas, maxHeightPx)) {
        pieces.push({
          data: pieceCanvas.toDataURL('image/jpeg', 0.92),
          heightPt: pieceCanvas.height / pxPerPt,
          forcePage: true,
        })
      }
    }
  }

  // 2) Distribuir las piezas en páginas: las secciones normales se empaquetan
  // una tras otra mientras quepan; una pieza `forcePage` siempre ocupa una
  // página propia.
  const pages = [[]]
  let cursorY = 0
  for (const piece of pieces) {
    const currentPage = pages[pages.length - 1]
    const needsNewPage = piece.forcePage
      ? currentPage.length > 0
      : currentPage.length > 0 && cursorY + piece.heightPt > availableHeight
    if (needsNewPage) {
      pages.push([])
      cursorY = 0
    }
    pages[pages.length - 1].push(piece)
    cursorY += piece.heightPt + gap
    if (piece.forcePage) {
      pages.push([])
      cursorY = 0
    }
  }
  const finalPages = pages.filter((p) => p.length > 0)

  // 3) Dibujar cada página con su pie de página (numeración).
  finalPages.forEach((pageItems, pageIndex) => {
    if (pageIndex > 0) pdf.addPage()
    let y = margin
    for (const item of pageItems) {
      pdf.addImage(item.data, 'JPEG', margin, y, contentWidth, item.heightPt)
      y += item.heightPt + gap
    }
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(130, 150, 170)
    pdf.text('Celeren · Assessment de Madurez Cloud', margin, pageHeight - footerSpace + 6)
    pdf.text(`Página ${pageIndex + 1} de ${finalPages.length}`, pageWidth - margin, pageHeight - footerSpace + 6, {
      align: 'right',
    })
  })

  pdf.save(filename)
}
