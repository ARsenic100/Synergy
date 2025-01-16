import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export async function generatePDF(reportContent) {
  const doc = new jsPDF();
  let yPos = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const maxWidth = pageWidth - 2 * margin;


  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(reportContent.title, maxWidth);
  doc.text(titleLines, margin, yPos);
  yPos += 10 * titleLines.length + 10;



  // Description
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(reportContent.description, maxWidth);
  doc.text(descLines, margin, yPos);
  yPos += 6 * descLines.length + 10;

  // Content Sections
  reportContent.content.forEach(section => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = 20;
    }

    // Section Heading
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(section.heading, margin, yPos);
    yPos += 10;

    // Section Content
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(section.content, maxWidth);
    doc.text(contentLines, margin, yPos);
    yPos += 6 * contentLines.length + 5;

    // Subsections
    if (section.subsections && section.subsections.length > 0) {
      section.subsections.forEach(subsection => {
        // Check for new page
        if (yPos > doc.internal.pageSize.height - 20) {
          doc.addPage();
          yPos = 20;
        }

        // Subsection Heading
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(subsection.heading, margin + 5, yPos);
        yPos += 8;

        // Subsection Content
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const subContentLines = doc.splitTextToSize(subsection.content, maxWidth - 10);
        doc.text(subContentLines, margin + 5, yPos);
        yPos += 6 * subContentLines.length + 5;
      });
    }

    yPos += 10; // Space between sections
  });

  return doc.output('arraybuffer');
}