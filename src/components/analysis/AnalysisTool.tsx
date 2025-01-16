import React, { useState } from 'react';
import { DataUploader } from './DataUploader';
import { AnalysisResults } from './AnalysisResults';
import { analyzeSchoolStructure } from '../../services/analysisService';
import { SchoolAnalysis } from '../../types/analysis';

export function AnalysisTool() {
  const [analysis, setAnalysis] = useState<SchoolAnalysis | null>(null);

  // In a real implementation, this would be triggered by the file upload
  React.useEffect(() => {
    const demoAnalysis = async () => {
      const result = await analyzeSchoolStructure({
        schoolId: 'DEMO-001',
        data: {
          grades: ['1', '2', '3', '4', '5', '6', '7'],
          students: 350,
          teachers: 15,
          facilities: ['library', 'computer-lab', 'playground'],
          performance: {
            academicResults: 0.75,
            attendance: 0.88
          }
        }
      });
      setAnalysis(result);
    };

    const timer = setTimeout(demoAnalysis, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">AI-Driven Structure Analysis</h2>
        <p className="text-gray-600">
          Upload your school data to receive AI-powered recommendations for optimal school structure
          alignment. Our system analyzes multiple factors including student population, infrastructure,
          and academic performance to suggest the most suitable standard structure.
        </p>
      </div>

      <DataUploader />
      <AnalysisResults analysis={analysis} />
    </div>
  );
}