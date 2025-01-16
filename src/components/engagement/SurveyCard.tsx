import React from 'react';
import { Survey } from '../../types/engagement';
import { ClipboardList, Users, Calendar } from 'lucide-react';

interface SurveyCardProps {
  survey: Survey;
  onParticipate: (surveyId: string) => void;
}

export function SurveyCard({ survey, onParticipate }: SurveyCardProps) {
  const daysRemaining = Math.ceil(
    (new Date(survey.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{survey.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{survey.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          survey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {survey.status}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{survey.totalResponses} responses</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{daysRemaining} days remaining</span>
        </div>
      </div>

      <button
        onClick={() => onParticipate(survey.id)}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <ClipboardList className="h-4 w-4" />
        Participate Now
      </button>
    </div>
  );
}