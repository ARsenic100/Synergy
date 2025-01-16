import React from 'react';
import { TrendingUp, Users, Building2 } from 'lucide-react';

interface PerformanceSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function PerformanceSection({
  formData,
  onChange,
  errors,
}: PerformanceSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              Academic Achievement
            </div>
          </label>
          <input
            type="number"
            value={formData.performanceOverview.academicAchievement}
            onChange={(e) =>
              onChange('performanceOverview', {
                ...formData.performanceOverview,
                academicAchievement: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Teacher Student Ratio
            </div>
          </label>
          <input
            type="number"
            value={formData.performanceOverview.teacherStudentRatio}
            onChange={(e) =>
              onChange('performanceOverview', {
                ...formData.performanceOverview,
                teacherStudentRatio: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              Infrastructure
            </div>
          </label>
          <input
            type="number"
            value={formData.performanceOverview.infrastructure}
            onChange={(e) =>
              onChange('performanceOverview', {
                ...formData.performanceOverview,
                infrastructure: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              Resource Availability
            </div>
          </label>
          <input
            type="number"
            value={formData.performanceOverview.resourceAvailability}
            onChange={(e) =>
              onChange('performanceOverview', {
                ...formData.performanceOverview,
                resourceAvailability: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}