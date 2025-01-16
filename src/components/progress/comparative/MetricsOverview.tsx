import React from 'react';
import { TrendingUp, School, Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricsOverviewProps {
  metrics: {
    standardizationRate: { value: number; change: number };
    schoolsTransitioned: { value: number; change: number };
    resourceUtilization: { value: number; change: number };
    completionTime: { value: number; change: number };
  };
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const cards = [
    {
      title: 'Standardization Rate',
      value: `${metrics.standardizationRate.value.toFixed(1)}%`,
      change: metrics.standardizationRate.change,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Schools Transitioned',
      value: metrics.schoolsTransitioned.value,
      change: metrics.schoolsTransitioned.change,
      icon: School,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Resource Utilization',
      value: `${metrics.resourceUtilization.value.toFixed(1)}%`,
      change: metrics.resourceUtilization.change,
      icon: Package,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Completion Time',
      value: `${metrics.completionTime.value.toFixed(1)} months`,
      change: metrics.completionTime.change,
      icon: Clock,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-gray-900">{card.title}</h3>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className={`text-sm mt-1 ${
              card.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}% from last month
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}