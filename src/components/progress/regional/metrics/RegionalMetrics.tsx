import React from 'react';
import { School, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { RegionalMetricCard } from './RegionalMetricCard';
import { RegionalMetrics as RegionalMetricsType } from '../../../../types/progress';

interface RegionalMetricsProps {
  metrics: RegionalMetricsType | null;
}

export function RegionalMetrics({ metrics }: RegionalMetricsProps) {
  if (!metrics) return null;

  const metricConfigs = [
    {
      title: 'Schools Transitioned',
      value: metrics.schoolsTransitioned.value,
      change: metrics.schoolsTransitioned.change,
      icon: School,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Resource Utilization',
      value: metrics.resourceUtilization.value,
      change: metrics.resourceUtilization.change,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Teacher Allocation',
      value: metrics.teacherAllocation.value,
      change: metrics.teacherAllocation.change,
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Completion Rate',
      value: metrics.completionRate.value,
      change: metrics.completionRate.change,
      icon: CheckCircle,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricConfigs.map((metric) => (
        <RegionalMetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}