import React from 'react';
import { School } from '../../../types/school';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceChartProps {
  school: School;
}

export function PerformanceChart({ school }: PerformanceChartProps) {
  const performanceData = [
    {
      metric: 'Academic',
      value:
        school.performanceBand === 'Excellent'
          ? 100
          : school.performanceBand === 'Satisfactory'
          ? 75
          : 50,
    },
    {
      metric: 'Infrastructure',
      value: (school.facilities.length / 10) * 100,
    },
    {
      metric: 'Teacher Ratio',
      value: Math.min(
        100,
        (school.teacherCount / (school.studentCount / 30)) * 100
      ),
    },
    {
      metric: 'Resources',
      value: 80, // Mock value - replace with actual data
    },
    {
      metric: 'Engagement',
      value: 85, // Mock value - replace with actual data
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
