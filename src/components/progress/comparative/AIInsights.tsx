import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIInsightsProps {
  insights: {
    strongPerformance: {
      entity: string;
      description: string;
    };
    areasForImprovement: {
      entity: string;
      description: string;
    };
    trendingUpward: {
      entity: string;
      description: string;
    };
  };
}

export function AIInsights({ insights }: AIInsightsProps) {
  const cards = [
    {
      title: 'Strong Performance',
      data: insights.strongPerformance,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Areas for Improvement',
      data: insights.areasForImprovement,
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      title: 'Trending Upward',
      data: insights.trendingUpward,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="font-medium">{card.title}</h4>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-indigo-600">
                  {card.data.entity}
                </div>
                <p className="text-sm text-gray-600">
                  {card.data.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}