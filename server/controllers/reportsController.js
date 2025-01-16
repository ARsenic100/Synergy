import { GoogleGenerativeAI } from '@google/generative-ai';
import Report from '../models/Report.js';
import School from '../models/School.js';
import { generatePDF } from '../utils/pdfGenerator.js';

export const generateReport = async (req, res) => {
  try {
    const client = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const { type, customMetrics } = req.body;
    
    const schools = await School.find();
    
    const prompt = `Generate a detailed report in the following JSON format:
    {
      "title": "Report title based on type",
      "description": "Brief overview of the report",
      "content": [
        {
          "heading": "Executive Summary",
          "content": "Overview of key findings",
          "subsections": []
        },
        {
          "heading": "Key Findings",
          "content": "Summary of main findings",
          "subsections": [
            {
              "heading": "Finding 1",
              "content": "Detailed explanation"
            }
          ]
        },
        {
          "heading": "Detailed Analysis",
          "content": "In-depth analysis",
          "subsections": []
        },
        {
          "heading": "Recommendations",
          "content": "Suggested actions",
          "subsections": []
        }
      ]
    }

    Type: ${type}
    School Data: ${JSON.stringify(schools)}
    ${customMetrics ? `Custom Metrics: ${JSON.stringify(customMetrics)}` : ''}
    
    Ensure the report is detailed, data-driven, and provides actionable insights.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[^[{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();

    if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
      throw new Error('Invalid JSON structure');
    }

    const reportContent = JSON.parse(cleanedResponse);

    // Generate PDF
    const pdfBuffer = await generatePDF(reportContent);

    // Save report to database
    const report = new Report({
      ...reportContent,
      type,
      generatedBy: req.user.id,
      size: `${Math.round(pdfBuffer.byteLength / 1024)} KB` // Fix size calculation
    });

    await report.save();

    // Convert ArrayBuffer to Base64 properly
    const base64String = Buffer.from(pdfBuffer).toString('base64');

    res.json({
      report,
      pdfBuffer: base64String
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Optional: Check if user has permission to delete
    if (report.generatedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    await Report.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const pdfBuffer = await generatePDF(report);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${report.title.replace(/\s+/g, '_')}.pdf`);
    res.send(Buffer.from(pdfBuffer)); // Convert ArrayBuffer to Buffer
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomReport = async (req, res) => {
  try {
    const { title, description, type, metrics } = req.body;
    
    const client = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const schools = await School.find();
    
    const prompt = `Generate a custom report titled "${title}" with the following description: "${description}". 
    Analyze the school data focusing on these metrics: ${JSON.stringify(metrics)}.
    
    Format the response as a structured report with sections and subsections following this JSON format:
    {
      "title": "${title}",
      "description": "${description}",
      "content": [
        {
          "heading": "Section Name",
          "content": "Section content",
          "subsections": [
            {
              "heading": "Subsection Name",
              "content": "Subsection content"
            }
          ]
        }
      ]
    }
    
    School Data: ${JSON.stringify(schools)}`;

     const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[^[{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();

    if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
      throw new Error('Invalid JSON structure');
    }

    const reportContent = JSON.parse(cleanedResponse);

    // Generate PDF
    const pdfBuffer = await generatePDF(reportContent);

    // Save report
    const report = new Report({
      ...reportContent,
      type,
      generatedBy: req.user.id,
      size: `${Math.round(pdfBuffer.byteLength / 1024)} KB` // Fix size calculation
    });

    await report.save();

    // Convert ArrayBuffer to Base64 properly
    const base64String = Buffer.from(pdfBuffer).toString('base64');

    res.json({
      report,
      pdfBuffer: base64String
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};