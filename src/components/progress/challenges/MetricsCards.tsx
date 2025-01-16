import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChallengeMetrics } from '../../../types/challenges';

interface MetricsCardsProps {
  metrics: ChallengeMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: 'Critical Issues',
      value: metrics.criticalIssues,
      description: 'Requires immediate attention',
      icon: AlertTriangle,
      color: 'red',
      delay: 0
    },
    {
      title: 'Open Challenges',
      value: metrics.openChallenges,
      description: 'Being monitored',
      icon: AlertTriangle,
      color: 'yellow',
      delay: 0.1
    },
    {
      title: 'Resolved This Month',
      value: metrics.resolvedThisMonth,
      description: 'Successfully addressed',
      icon: TrendingUp,
      color: 'green',
      delay: 0.2
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay }}
            className={`bg-${card.color}-50 p-6 rounded-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`h-6 w-6 text-${card.color}-600`} />
              <h3 className={`font-semibold text-${card.color}-800`}>{card.title}</h3>
            </div>
            <p className={`text-2xl font-bold text-${card.color}-600`}>{card.value}</p>
            <p className={`text-sm text-${card.color}-800 mt-1`}>{card.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}