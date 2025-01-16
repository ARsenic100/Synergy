import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ResourceUtilization {
  resourceType: string;
  utilizationRate: number;
  targetRate: number;
  status: 'optimal' | 'underutilized' | 'overutilized';
}

const mockUtilizationData: ResourceUtilization[] = [
  {
    resourceType: 'Classrooms',
    utilizationRate: 85,
    targetRate: 90,
    status: 'optimal',
  },
  {
    resourceType: 'Computer Labs',
    utilizationRate: 45,
    targetRate: 80,
    status: 'underutilized',
  },
  {
    resourceType: 'Science Equipment',
    utilizationRate: 95,
    targetRate: 85,
    status: 'overutilized',
  },
];

export function ResourceUtilizationTracker() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        Resource Utilization Tracking
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Current Utilization</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resourceType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="utilizationRate"
                  name="Current Rate"
                  fill="#4f46e5"
                />
                <Bar dataKey="targetRate" name="Target Rate" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Status Overview</h3>
          <div className="space-y-4">
            {mockUtilizationData.map((item) => (
              <div
                key={item.resourceType}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.resourceType}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'optimal'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'underutilized'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Current: {item.utilizationRate}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Target: {item.targetRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
