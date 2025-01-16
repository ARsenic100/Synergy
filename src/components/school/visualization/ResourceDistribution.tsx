import React from 'react';
import { School } from '../../../types/school';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface ResourceDistributionProps {
  school: School;
}

export function ResourceDistribution({ school }: ResourceDistributionProps) {
  const resourceData = [
    {
      name: 'Teaching Staff',
      value: school.teacherCount,
    },
    {
      name: 'Infrastructure',
      value: school.facilities.length,
    },
    {
      name: 'Learning Resources',
      value: Math.floor(school.studentCount / 50), // Mock calculation
    },
  ];

  const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Resource Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resourceData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {resourceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
