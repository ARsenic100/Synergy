import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface RegionalChallengesProps {
  state: string;
}

export function RegionalChallenges({ state }: RegionalChallengesProps) {
  const challenges = [
    {
      title: 'Infrastructure Gap',
      description: 'Several schools require additional classrooms and facilities',
      severity: 'high',
      affectedSchools: 12
    },
    {
      title: 'Teacher Shortage',
      description: 'Mathematics and Science teachers needed in rural areas',
      severity: 'medium',
      affectedSchools: 8
    },
    {
      title: 'Resource Distribution',
      description: 'Delay in educational material distribution to remote schools',
      severity: 'low',
      affectedSchools: 5
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold">Regional Challenges</h3>
        </div>
        <span className="text-sm text-gray-500">{challenges.length} active challenges</span>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              challenge.severity === 'high'
                ? 'border-red-500 bg-red-50'
                : challenge.severity === 'medium'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Affecting {challenge.affectedSchools} schools
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}