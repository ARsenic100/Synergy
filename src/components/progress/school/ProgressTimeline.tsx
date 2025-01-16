import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { School } from '../../../types/school';

interface ProgressTimelineProps {
  school: School;
}

export function ProgressTimeline({ school }: ProgressTimelineProps) {
    console.log(school);
  // Transform history data for the chart
  const data = school.history.map((entry) => ({
    month: new Date(entry.updatedAt).toLocaleString('default', { month: 'short' }),
    infrastructure: calculateInfrastructureScore(entry),
    staffTraining: calculateStaffTrainingScore(entry),
    compliance: calculateComplianceScore(entry)
  })).reverse();

  // Add current data point
  data.push({
    month: 'Current',
    infrastructure: calculateInfrastructureScore(school),
    staffTraining: calculateStaffTrainingScore(school),
    compliance: calculateComplianceScore(school)
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Progress Timeline</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="infrastructure"
              name="Infrastructure"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="staffTraining"
              name="Staff Training"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="compliance"
              name="Compliance"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Helper functions (same as backend)
function calculateInfrastructureScore(data: any) {
  const facilityWeights = {
    'Library': 15,
    'Computer Lab': 15,
    'Science Lab': 15,
    'Playground': 10,
    'Sports Complex': 15,
    'Auditorium': 10,
    'Smart Classroom': 20
  };

  let score = 0;
  let totalWeight = 0;

  data.facilities.forEach((facility: string) => {
    if (facilityWeights[facility as keyof typeof facilityWeights]) {
      score += facilityWeights[facility as keyof typeof facilityWeights];
      totalWeight += facilityWeights[facility as keyof typeof facilityWeights];
    }
  });

  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
}

function calculateStaffTrainingScore(data: any) {
  const studentTeacherRatio = data.studentCount / data.teacherCount;
  const idealRatio = 30;
  return Math.round(Math.min(100, (idealRatio / studentTeacherRatio) * 100));
}

function calculateComplianceScore(data: any) {
  const baseScore = data.performanceBand === 'Excellent' ? 90 :
                   data.performanceBand === 'Good' ? 75 :
                   data.performanceBand === 'Average' ? 60 : 40;
  return baseScore;
}