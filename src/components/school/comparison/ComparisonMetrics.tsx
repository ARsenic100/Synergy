import React from 'react';
import { School } from '../../../types/school';
import { Users, GraduationCap, Building2 } from 'lucide-react';

interface ComparisonMetricsProps {
  schools: School[];
  activeMetric: 'students' | 'teachers' | 'facilities';
  onMetricChange: (metric: 'students' | 'teachers' | 'facilities') => void;
}

export function ComparisonMetrics({
  schools,
  activeMetric,
  onMetricChange,
}: ComparisonMetricsProps) {
  const metrics = [
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      getValue: (school: School) => school.studentCount,
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: GraduationCap,
      getValue: (school: School) => school.teacherCount,
    },
    {
      id: 'facilities',
      label: 'Facilities',
      icon: Building2,
      getValue: (school: School) => school.facilities.length,
    },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isActive = activeMetric === metric.id;

        return (
          <button
            key={metric.id}
            onClick={() => onMetricChange(metric.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              isActive
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon
                className={`h-5 w-5 ${
                  isActive ? 'text-indigo-600' : 'text-gray-500'
                }`}
              />
              <span
                className={`font-medium ${
                  isActive ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                {metric.label}
              </span>
            </div>

            <div className="space-y-2">
              {schools.map((school) => (
                <div key={school.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{school.name}</span>
                  <span className="font-medium">{metric.getValue(school)}</span>
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
