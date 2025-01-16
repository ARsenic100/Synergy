import React from 'react';
import { ResourceMetrics } from '../../types/resourceAllocation';
import { TrendingUp, BarChart2, Truck, ThumbsUp } from 'lucide-react';

interface ResourceMetricsCardProps {
  metrics: ResourceMetrics;
}

export function ResourceMetricsCard({ metrics }: ResourceMetricsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-medium">Utilization Rate</h3>
        </div>
        <p className="text-2xl font-bold">
          {(metrics.utilizationRate * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <BarChart2 className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-medium">Implementation</h3>
        </div>
        <p className="text-2xl font-bold">
          {(metrics.implementationProgress * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Truck className="h-5 w-5 text-yellow-600" />
          </div>
          <h3 className="font-medium">Delivery Efficiency</h3>
        </div>
        <p className="text-2xl font-bold">
          {(metrics.deliveryEfficiency * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <ThumbsUp className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="font-medium">Satisfaction Score</h3>
        </div>
        <p className="text-2xl font-bold">
          {(metrics.satisfactionScore * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
