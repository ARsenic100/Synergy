import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  completedAt?: string;
  dueDate?: string;
  description: string;
}

interface ProgressMilestonesProps {
  milestones: Milestone[] | null;
  schoolId: string;
}

export function ProgressMilestones({ milestones, schoolId }: ProgressMilestonesProps) {
  if (!milestones) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Progress Milestones</h3>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(milestone.status)}`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {milestone.description}
                  </p>
                  <div className="mt-2 text-sm">
                    {milestone.status === 'completed' ? (
                      <span className="text-green-600">
                        Completed on {new Date(milestone.completedAt!).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Due by {new Date(milestone.dueDate!).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
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