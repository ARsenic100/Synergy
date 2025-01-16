import React from 'react';
import { Target, Calendar, CheckCircle } from 'lucide-react';

interface UpcomingGoalsProps {
  state: string;
}

export function UpcomingGoals({ state }: UpcomingGoalsProps) {
  const goals = [
    {
      title: 'Complete Phase 1 Transitions',
      deadline: '2024-06-30',
      progress: 75,
      milestones: [
        { title: 'Infrastructure Assessment', completed: true },
        { title: 'Resource Allocation', completed: true },
        { title: 'Staff Training', completed: false },
        { title: 'Final Evaluation', completed: false }
      ]
    },
    {
      title: 'Teacher Training Program',
      deadline: '2024-07-15',
      progress: 40,
      milestones: [
        { title: 'Curriculum Development', completed: true },
        { title: 'Training Schedule', completed: true },
        { title: 'Workshop Execution', completed: false },
        { title: 'Assessment', completed: false }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">Upcoming Goals</h3>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.title} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium">{goal.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-indigo-600">
                {goal.progress}%
              </span>
            </div>

            <div className="space-y-3">
              {goal.milestones.map((milestone) => (
                <div
                  key={milestone.title}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle
                    className={`h-4 w-4 ${
                      milestone.completed ? 'text-green-500' : 'text-gray-300'
                    }`}
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
          </div>
        ))}
      </div>
    </div>
  );
}