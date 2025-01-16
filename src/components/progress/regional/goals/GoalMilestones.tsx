import React from 'react';
import { CheckCircle } from 'lucide-react';

interface GoalMilestonesProps {
  milestones: {
    title: string;
    completed: boolean;
  }[];
  onToggle?: (index: number) => void;
}

export function GoalMilestones({ milestones, onToggle }: GoalMilestonesProps) {
  return (
    <div className="space-y-3">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm"
          onClick={() => onToggle?.(index)}
        >
          <CheckCircle
            className={`h-4 w-4 ${
              milestone.completed ? 'text-green-500' : 'text-gray-300'
            } ${onToggle ? 'cursor-pointer' : ''}`}
          />
          <span
            className={
              milestone.completed ? 'text-gray-600' : 'text-gray-500'
            }
          >
            {milestone.title}
          </span>
        </div>
      ))}
    </div>
  );
}