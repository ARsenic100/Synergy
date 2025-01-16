import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { School, Users, Building2, TrendingUp } from 'lucide-react';

interface RegionalMetricsProps {
  state: string;
}

export function RegionalMetrics({ state }: RegionalMetricsProps) {
  const metrics = [
    {
      label: 'Schools Transitioned',
      value: '72%',
      trend: '+3.5%',
      icon: School,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Resource Utilization',
      value: '85%',
      trend: '+2.1%',
      icon: Building2,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Teacher Allocation',
      value: '92%',
      trend: '+1.8%',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Completion Rate',
      value: '78%',
      trend: '+4.2%',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const districtData = [
    { name: 'District 1', completed: 85, inProgress: 15 },
    { name: 'District 2', completed: 65, inProgress: 35 },
    { name: 'District 3', completed: 75, inProgress: 25 },
    { name: 'District 4', completed: 90, inProgress: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, trend, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-gray-700">{label}</h3>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-sm mt-1 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">District-wise Progress</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#4f46e5" />
              <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}