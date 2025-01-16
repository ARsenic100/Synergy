import React, { useState } from 'react';
import { School, Search } from 'lucide-react';
import { SchoolProgressMetrics } from './SchoolProgressMetrics';
import { SchoolMilestones } from './SchoolMilestones';
import { SchoolRecommendations } from './SchoolRecommendations';
import { SchoolTimeline } from './SchoolTimeline';

export function SchoolProgress() {
  const [selectedSchool, setSelectedSchool] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <School className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">School Progress Dashboard</h2>
        </div>
        
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search school by name or UDISE code..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          />
        </div>
      </div>

      <SchoolProgressMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SchoolMilestones />
        <SchoolRecommendations />
      </div>

      <SchoolTimeline />
    </div>
  );
}