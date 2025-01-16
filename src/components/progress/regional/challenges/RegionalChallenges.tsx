import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { RegionalChallenge } from '../../../../types/progress';
import { motion } from 'framer-motion';

interface RegionalChallengesProps {
  challenges: RegionalChallenge[];
}

export function RegionalChallenges({ challenges }: RegionalChallengesProps) {
  const getSeverityColor = (severity: RegionalChallenge['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold">Regional Challenges</h3>
        </div>
        <span className="text-sm text-gray-500">
          {challenges.length} active challenges
        </span>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-l-4 ${getSeverityColor(
              challenge.severity
            )}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {challenge.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Affecting {challenge.affectedSchools} schools
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}