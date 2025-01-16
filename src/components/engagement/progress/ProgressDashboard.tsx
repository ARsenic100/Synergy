import React from 'react';
import { ProgressMetrics } from './ProgressMetrics';
import { MilestoneList } from './MilestoneList';
import { TrendingUp } from 'lucide-react';

export function ProgressDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Progress Dashboard</h2>
          <p className="text-gray-600 mt-1">Track your standardization journey</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <TrendingUp className="h-5 w-5" />
          Export Report
        </button>
      </div>

      <ProgressMetrics />
      <MilestoneList />
    </div>
  );
}