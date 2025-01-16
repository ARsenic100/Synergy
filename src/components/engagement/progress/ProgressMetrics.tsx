import React from 'react';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';

interface ProgressMetric {
  label: string;
  value: number;
  trend: number;
  icon: React.ElementType;
  color: string;
}

export function ProgressMetrics() {
  const metrics: ProgressMetric[] = [
    {
      label: 'Overall Progress',
      value: 78,
      trend: 5.2,
      icon: TrendingUp,
      color: 'blue'
    },
    {
      label: 'Stakeholder Engagement',
      value: 92,
      trend: 3.8,
      icon: Users,
      color: 'green'
    },
    {
      label: 'Resource Utilization',
      value: 85,
      trend: -2.1,
      icon: Building2,
      color: 'purple'
    },
    {
      label: 'Achievement Score',
      value: 88,
      trend: 4.5,
      icon: Award,
      color: 'yellow'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 bg-${metric.color}-50 rounded-lg`}>
                <Icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <h3 className="font-medium">{metric.label}</h3>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">{metric.value}%</p>
              <span className={`flex items-center text-sm ${
                metric.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}