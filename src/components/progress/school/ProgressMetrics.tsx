import React from 'react';
import { TrendingUp, Building2, GraduationCap, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricsProps {
  metrics: {
    overall: { current: number; previous: number };
    infrastructure: { current: number; previous: number };
    staffTraining: { current: number; previous: number };
    compliance: { current: number; previous: number };
  } | null;
}

export function ProgressMetrics({ metrics }: MetricsProps) {
  if (!metrics) return null;

  const cards = [
    {
      title: 'Overall Progress',
      current: metrics.overall.current,
      change: metrics.overall.current - metrics.overall.previous,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Infrastructure',
      current: metrics.infrastructure.current,
      change: metrics.infrastructure.current - metrics.infrastructure.previous,
      icon: Building2,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Staff Training',
      current: metrics.staffTraining.current,
      change: metrics.staffTraining.current - metrics.staffTraining.previous,
      icon: GraduationCap,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Compliance',
      current: metrics.compliance.current,
      change: metrics.compliance.current - metrics.compliance.previous,
      icon: ClipboardCheck,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="text-2xl font-bold">{card.current}%</div>
            <div className={`text-sm mt-1 ${
              card.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.change >= 0 ? '+' : ''}{card.change}% from last month
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}