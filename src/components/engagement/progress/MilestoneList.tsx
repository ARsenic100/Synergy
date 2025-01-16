import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

export function MilestoneList() {
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Infrastructure Assessment',
      description: 'Complete evaluation of current facilities and requirements',
      dueDate: '2024-04-15',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      title: 'Teacher Training Program',
      description: 'Conduct standardization workshops for teaching staff',
      dueDate: '2024-04-30',
      status: 'in-progress',
      progress: 65
    },
    {
      id: '3',
      title: 'Resource Allocation Plan',
      description: 'Finalize distribution of resources across departments',
      dueDate: '2024-05-15',
      status: 'pending',
      progress: 0
    }
  ];

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Key Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getStatusIcon(milestone.status)}
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                milestone.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {milestone.status.replace('-', ' ')}
              </span>
            </div>
            {milestone.status !== 'pending' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span>{milestone.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}