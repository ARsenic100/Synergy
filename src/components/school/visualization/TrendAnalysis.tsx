import React from 'react';
import { School } from '../../../types/school';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TrendAnalysisProps {
  school: School;
}

export function TrendAnalysis({ school }: TrendAnalysisProps) {
  // Mock data - replace with actual historical data
  const trendData = [
    { month: 'Jan', enrollment: 950, performance: 82, resources: 75 },
    { month: 'Feb', enrollment: 960, performance: 84, resources: 78 },
    { month: 'Mar', enrollment: 975, performance: 83, resources: 80 },
    { month: 'Apr', enrollment: 990, performance: 86, resources: 82 },
    { month: 'May', enrollment: 1000, performance: 88, resources: 85 },
    { month: 'Jun', enrollment: 1020, performance: 87, resources: 88 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrollment"
              stroke="#4f46e5"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="performance" stroke="#06b6d4" />
            <Line type="monotone" dataKey="resources" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
