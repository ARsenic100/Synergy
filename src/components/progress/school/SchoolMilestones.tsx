import React from 'react';
import { Flag, CheckCircle, Clock } from 'lucide-react';

export function SchoolMilestones() {
  const milestones = [
    {
      title: 'Infrastructure Assessment',
      status: 'completed',
      completedAt: '2024-02-15',
      description: 'Evaluation of current facilities and requirements'
    },
    {
      title: 'Resource Planning',
      status: 'in-progress',
      dueDate: '2024-04-01',
      description: 'Allocation and distribution of resources'
    },
    {
      title: 'Staff Training',
      status: 'upcoming',
      dueDate: '2024-05-15',
      description: 'Training programs for teachers and staff'
    },
    {
      title: 'Final Evaluation',
      status: 'upcoming',
      dueDate: '2024-06-30',
      description: 'Complete assessment of transition progress'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flag className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">Key Milestones</h3>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.title}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
          >
            {milestone.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : milestone.status === 'in-progress' ? (
              <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            )}

            <div>
              <h4 className="font-medium">{milestone.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {milestone.status === 'completed'
                  ? `Completed on ${new Date(milestone.completedAt).toLocaleDateString()}`
                  : `Due by ${new Date(milestone.dueDate).toLocaleDateString()}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}