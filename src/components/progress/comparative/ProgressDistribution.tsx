import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ProgressDistributionProps {
  data: Array<{
    name: string;
    standardized: number;
    inProgress: number;
    pending: number;
  }>;
  type: 'district' | 'school';
}

export function ProgressDistribution({ data, type }: ProgressDistributionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">
        Progress Distribution by {type === 'district' ? 'District' : 'School'}
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="standardized"
              name="Standardized"
              stackId="a"
              fill="#4f46e5"
            />
            <Bar
              dataKey="inProgress"
              name="In Progress"
              stackId="a"
              fill="#f59e0b"
            />
            <Bar
              dataKey="pending"
              name="Pending"
              stackId="a"
              fill="#ef4444"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}