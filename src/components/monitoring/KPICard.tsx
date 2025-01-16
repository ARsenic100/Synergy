import React from 'react';
import { KPIMetric } from '../../types/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-gray-500 text-sm">{metric.label}</h3>
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-bold">{metric.value}%</span>
        <div className={`flex items-center text-sm ${
          metric.status === 'positive' ? 'text-green-600' :
          metric.status === 'negative' ? 'text-red-600' :
          'text-gray-600'
        }`}>
          {metric.trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="ml-1">{Math.abs(metric.trend)}%</span>
        </div>
      </div>
    </div>
  );
}