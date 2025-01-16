import React from 'react';
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
import { TransitionTrend } from '../../../types/progress';

interface TrendsAnalysisProps {
  trends: TransitionTrend[];
}

export function TrendsAnalysis({ trends }: TrendsAnalysisProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Transition Trends</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [
                value.toLocaleString(),
                'Schools'
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="inProgress"
              name="In Progress"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-600 font-medium">Total Completed</p>
          <p className="text-2xl font-bold text-indigo-700">
            {trends.reduce((sum, t) => sum + t.completed, 0).toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-600 font-medium">Total In Progress</p>
          <p className="text-2xl font-bold text-amber-700">
            {trends.reduce((sum, t) => sum + t.inProgress, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}