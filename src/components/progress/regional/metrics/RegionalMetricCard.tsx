import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RegionalMetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  color: string;
}

export function RegionalMetricCard({ title, value, change, icon: Icon, color }: RegionalMetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}%</p>
      <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    </div>
  );
}