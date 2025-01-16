import React from 'react';
import { AnalysisForm } from '../components/analysis/AnalysisForm';
import { AnalysisPDFUpload } from '../components/analysis/AnalysisPDFUpload';
import { SubmissionMode } from '../types/analysis';

export function AnalysisPage() {
  const [submissionMode, setSubmissionMode] = React.useState<SubmissionMode>('form');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-4">AI-Driven School Structure Analysis</h1>
        <p className="text-lg opacity-90">
          Submit your school's data for comprehensive analysis and standardization recommendations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-center space-x-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={submissionMode === 'form'}
              onChange={() => setSubmissionMode('form')}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">Fill Out the Form</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={submissionMode === 'pdf'}
              onChange={() => setSubmissionMode('pdf')}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">Upload a PDF</span>
          </label>
        </div>
      </div>

      {submissionMode === 'form' ? <AnalysisForm /> : <AnalysisPDFUpload />}
    </div>
  );
}