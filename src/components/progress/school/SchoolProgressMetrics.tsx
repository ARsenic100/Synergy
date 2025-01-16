import React from 'react';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';
import { ProgressChart } from './charts/ProgressChart';

export function SchoolProgressMetrics() {
  const metrics = [
    {
      label: 'Overall Progress',
      value: '75%',
      trend: '+5.2%',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Infrastructure',
      value: '82%',
      trend: '+3.8%',
      icon: Building2,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Staff Training',
      value: '68%',
      trend: '+7.1%',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Compliance',
      value: '90%',
      trend: '+2.5%',
      icon: Award,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <h3 className="text-lg font-semibold mb-4">Progress Timeline</h3>
        <div className="h-[300px]">
          <ProgressChart />
        </div>
      </div>
    </div>
  );
}