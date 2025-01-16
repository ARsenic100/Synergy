import React from 'react';
import { ComparisonChart } from './ComparisonChart';
import { PerformanceMetrics } from './PerformanceMetrics';

interface RegionalComparisonProps {
  region: string;
  comparisonData: any; // Replace with proper type
  metrics: any[]; // Replace with proper type
}

export function RegionalComparison({ region, comparisonData, metrics }: RegionalComparisonProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{region} Comparison</h3>
          <p className="text-sm text-gray-600">Performance metrics and trends</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500">
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </select>
        </div>
      </div>

      <PerformanceMetrics metrics={metrics} />
      <ComparisonChart data={comparisonData} title="Progress Distribution" />
    </div>
  );
}