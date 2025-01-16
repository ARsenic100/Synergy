import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopPerformersProps {
  performers: Array<{
    name: string;
    score: number;
    change: number;
  }>;
  type: 'district' | 'school';
}

export function TopPerformers({ performers, type }: TopPerformersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h3 className="text-lg font-semibold">
          Top Performing {type === 'district' ? 'Districts' : 'Schools'}
        </h3>
      </div>

      <div className="space-y-4">
        {performers.map((performer, index) => (
          <motion.div
            key={performer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold">
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{performer.name}</div>
                <div className="text-sm text-gray-500">
                  Score: {performer.score.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${
              performer.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {performer.change >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {performer.change >= 0 ? '+' : ''}{performer.change.toFixed(1)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}