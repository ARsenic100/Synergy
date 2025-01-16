import { AnalysisFormData } from '../types/analysis';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface AnalysisReport extends AnalysisFormData {
  analysis: any; // Add proper typing if needed
}

export async function generatePDF(data: AnalysisReport): Promise<void> {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text('School Analysis Report', 20, 20);

  // School Information
  doc.setFontSize(12);
  doc.text(`UDISE Code: ${data.udiseCode}`, 20, 40);
  doc.text(`School Name: ${data.schoolName}`, 20, 50);
  doc.text(`Location: ${data.district}, ${data.state}`, 20, 60);

  // Key Metrics
  doc.setFontSize(16);
  doc.text('Key Metrics', 20, 80);
  
  doc.setFontSize(12);
  doc.text(`Compliance Score: ${data.analysis.complianceScore}%`, 20, 90);
  doc.text(`Infrastructure Score: ${data.analysis.infrastructureScore}%`, 20, 100);
  doc.text(`Student-Teacher Ratio: 1:${data.analysis.studentTeacherRatio}`, 20, 110);

  // Recommendations
  doc.setFontSize(16);
  doc.text('Recommendations', 20, 130);

  const recommendations = data.analysis.recommendations;
  let yPos = 140;
  
  recommendations.forEach((rec: any) => {
    doc.setFontSize(12);
    doc.setTextColor(rec.priority === 'critical' ? '#ef4444' : '#f59e0b');
    doc.text(`${rec.priority.toUpperCase()}: ${rec.title}`, 20, yPos);
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.text(rec.description, 20, yPos + 5);
    yPos += 15;
  });

  // Save the PDF
  doc.save(`${data.schoolName.replace(/\s+/g, '_')}_analysis.pdf`);
}