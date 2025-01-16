import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Challenge } from '../../../types/challenges';

interface ChallengesListProps {
  challenges: Challenge[];
  loading: boolean;
  onEdit: (challenge: Challenge) => void;
  onDelete: (id: string) => void;
}

export function ChallengesList({ challenges, loading, onEdit, onDelete }: ChallengesListProps) {
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (challenges.length === 0) {
    return <div className="p-6 text-center text-gray-500">No challenges found</div>;
  }

  return (
    <div className="divide-y">
      {challenges.map((challenge) => (
        <div key={challenge._id} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    challenge.severity === 'high'
                      ? 'bg-red-100 text-red-800'
                      : challenge.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {challenge.severity} severity
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    challenge.status === 'open'
                      ? 'bg-red-100 text-red-800'
                      : challenge.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {challenge.status}
                </span>
              </div>
              <h4 className="font-medium">{challenge.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{challenge.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{challenge.affectedSchools} schools affected</span>
                <span>Region: {challenge.region}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(challenge)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              {!challenge.aiGenerated && (
                <button
                  onClick={() => onDelete(challenge._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}