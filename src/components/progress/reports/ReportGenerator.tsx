import React, { useState } from 'react';
import { FileText, Download, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { reportsService } from '../../../services/reportsService';

interface ReportGeneratorProps {
  onReportGenerated: () => void;
}

export function ReportGenerator({ onReportGenerated }: ReportGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async (type: string) => {
    try {
      setGenerating(true);
      setError(null);
      
      const { pdfBuffer } = await reportsService.generateReport(type);
      
      // Create blob from base64 string
      const binaryString = window.atob(pdfBuffer);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_report_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      onReportGenerated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const reportTypes = [
    {
      type: 'progress',
      title: 'Progress Report',
      description: 'Generate comprehensive progress reports with customizable metrics',
      icon: FileText,
      color: 'indigo'
    },
    {
      type: 'resource',
      title: 'Resource Report',
      description: 'Track resource allocation and utilization across schools',
      icon: FileText,
      color: 'green'
    },
    {
      type: 'analysis',
      title: 'Analysis Report',
      description: 'In-depth analysis of challenges and interventions',
      icon: FileText,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.type}
              whileHover={{ scale: 1.02 }}
              className={`p-6 bg-${report.color}-50 rounded-lg`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`h-6 w-6 text-${report.color}-600`} />
                <h3 className="font-medium">{report.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <button
                onClick={() => handleGenerateReport(report.type)}
                disabled={generating}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-${report.color}-600 text-white rounded-lg hover:bg-${report.color}-700 disabled:opacity-50`}
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}