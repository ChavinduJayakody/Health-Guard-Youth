import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface ReportData {
  stats: any[]
  assessments: any[]
}

export async function generateAdminReport(data: ReportData) {
  const doc = new jsPDF("p", "pt", "a4")

  doc.setFontSize(18)
  doc.text("HealthGuard Administrative Report", 40, 40)

  doc.setFontSize(11)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 60)

  let y = 100
  doc.setFontSize(14)
  doc.text("Usage Statistics", 40, y)
  y += 20

  data.stats.forEach((s) => {
    doc.setFontSize(11)
    doc.text(`${s.name}: ${s.value} (${s.change})`, 50, y)
    y += 16
  })

  doc.addPage()
  doc.setFontSize(14)
  doc.text("Recent Assessments", 40, 40)

  const tableData = data.assessments.map((a) => [
    a.name,
    a.age,
    a.gender,
    a.risk,
    `${a.diabetesRisk}%`,
    `${a.cvdRisk}%`,
  ])

  autoTable(doc, {
    startY: 70,
    head: [["Name", "Age", "Gender", "Overall Risk", "Diabetes Risk", "CVD Risk"]],
    body: tableData,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [37, 99, 235] },
  })

  return doc
}
