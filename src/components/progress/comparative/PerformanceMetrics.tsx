import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
}

interface PerformanceMetricsProps {
  metrics: Metric[];
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const calculateTrend = (current: number, previous: number) => {
    const difference = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(difference).toFixed(1),
      direction: difference > 0 ? 'up' : difference < 0 ? 'down' : 'neutral',
      color: difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const trend = calculateTrend(metric.value, metric.previousValue);
        return (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-sm text-gray-600">{metric.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold">
                {metric.value}
                <span className="text-sm font-normal">{metric.unit}</span>
              </p>
              <div className={`flex items-center gap-1 ${trend.color}`}>
                {trend.direction === 'up' && <TrendingUp className="h-4 w-4" />}
                {trend.direction === 'down' && <TrendingDown className="h-4 w-4" />}
                {trend.direction === 'neutral' && <Minus className="h-4 w-4" />}
                <span className="text-sm">{trend.value}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}