import React, { useState } from 'react';
import { FileText, Plus, RotateCw } from 'lucide-react'; // Added RotateCw icon
import { ReportGenerator } from './ReportGenerator';
import { CustomReportForm } from './CustomReportForm';
import { RecentReports } from './RecentReports';
import { reportsService } from '../../../services/reportsService';

export function ReportsDashboard() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCustomReport = async (data: any) => {
    try {
      const response = await reportsService.createCustomReport(data);
      
      // Download the generated PDF
      const blob = new Blob([Buffer.from(response.pdfBuffer, 'base64')], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title.replace(/\s+/g, '_')}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      setShowCustomForm(false);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error generating custom report:', error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey(prev => prev + 1);
    // Reset refreshing state after a short delay
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & Exports</h2>
          <p className="text-gray-600">Generate and download detailed reports</p>
        </div>
        <button
          onClick={() => setShowCustomForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Generate Custom Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Report Generator</h3>
        </div>

        <ReportGenerator onReportGenerated={() => setRefreshKey(prev => prev + 1)} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            disabled={isRefreshing}
          >
            <RotateCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <RecentReports key={refreshKey} />
      </div>

      {showCustomForm && (
        <CustomReportForm
          onSubmit={handleCustomReport}
          onClose={() => setShowCustomForm(false)}
        />
      )}
    </div>
  );
}