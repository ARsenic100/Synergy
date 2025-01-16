import React from 'react';
import { School, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { KeyMetrics as KeyMetricsType } from '../../../types/progress';

interface KeyMetricsProps {
  metrics: KeyMetricsType | null;
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  if (!metrics) return null;

  const metricConfigs = [
    {
      label: 'Schools Transitioned',
      value: `${metrics.schoolsTransitioned.value}%`,
      trend: `${metrics.schoolsTransitioned.change > 0 ? '+' : ''}${metrics.schoolsTransitioned.change}%`,
      icon: School,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Transition Rate',
      value: `${metrics.transitionRate.value}/month`,
      trend: `${metrics.transitionRate.change > 0 ? '+' : ''}${metrics.transitionRate.change}%`,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Avg. Time',
      value: `${metrics.averageTime.value} months`,
      trend: `${metrics.averageTime.change > 0 ? '+' : ''}${metrics.averageTime.change} months`,
      icon: Clock,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Critical Cases',
      value: metrics.criticalCases.value.toString(),
      trend: metrics.criticalCases.change.toString(),
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metricConfigs.map(({ label, value, trend, icon: Icon, color }) => (
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
  );
}