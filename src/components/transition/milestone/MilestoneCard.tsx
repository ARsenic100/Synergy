import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { Milestone } from '../../../types/milestone';

interface MilestoneCardProps {
  milestone: Milestone;
  onEdit: (milestone: Milestone) => void;
  onDelete: (id: string) => void;
  onSubtaskToggle: (milestoneId: string, subtaskId: string) => void;
}

export function MilestoneCard({
  milestone,
  onEdit,
  onDelete,
  onSubtaskToggle,
}: MilestoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedSubtasks = milestone.subtasks.filter((subtask) => subtask.completed).length;
  const progress = (completedSubtasks / milestone.subtasks.length) * 100;
  const isCompleted = progress === 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'low':
        return 'bg-green-50 text-green-600 border-green-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <motion.div
      layout
      className={`border rounded-xl shadow-sm overflow-hidden transition-colors ${
        isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{milestone.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                milestone.priority
              )}`}
            >
              {milestone.priority}
            </span>
            <button
              onClick={() => onEdit(milestone)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(milestone.id)}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Start Date:</span>
            <span className="ml-2 font-medium">
              {format(new Date(milestone.startDate), 'MMM d, yyyy')}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Deadline:</span>
            <span className="ml-2 font-medium">
              {format(new Date(milestone.deadline), 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
          <span>{isExpanded ? 'Hide' : 'Show'} Subtasks</span>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t"
          >
            <div className="p-6 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Subtasks</h4>
              <div className="space-y-3">
                {milestone.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg"
                  >
                    <button
                      onClick={() => onSubtaskToggle(milestone.id, subtask.id)}
                      className="mt-0.5"
                    >
                      {subtask.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <div>
                      <p
                        className={`font-medium ${
                          subtask.completed ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        {subtask.name}
                      </p>
                      {subtask.description && (
                        <p className="text-sm text-gray-600 mt-1">{subtask.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}