import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Insight } from '../../../types/progress';
import { motion } from 'framer-motion';

interface AIInsightsProps {
  insights: Insight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return TrendingUp;
      case 'warning':
        return AlertTriangle;
      case 'recommendation':
        return CheckCircle;
      default:
        return Brain;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'recommendation':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-indigo-600 bg-indigo-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">AI-Generated Insights</h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type);
          const color = getInsightColor(insight.type);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50"
            >
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-gray-700">{insight.message}</p>
                {insight.importance === 'high' && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                    High Priority
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}