import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  PieChart,
} from 'lucide-react';
import { format } from 'date-fns';
import { surveyService } from '../../../services/surveyService';
import { SurveyResponse } from './SurveyResponse';
import { SurveyAnalytics } from './SurveyAnalytics';

interface SurveyCardProps {
  survey: {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    totalResponses: number;
    status: 'active' | 'completed' | 'upcoming';
    questions: Array<{
      _id: string;
      question: string;
      type: 'multiple-choice' | 'text' | 'rating';
      options?: string[];
      required: boolean;
    }>;
  };
  onTakeSurvey: (id: string) => void;
}

export function SurveyCard({ survey, onTakeSurvey }: SurveyCardProps) {
  const [showResponse, setShowResponse] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [userProgress, setUserProgress] = useState(0);

  const endDate = new Date(survey.endDate);
  const daysRemaining = Math.ceil(
    (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    if (survey.status === 'active' || survey.status === 'completed') {
      fetchAnalytics();
    }
  }, [survey._id]);

  const fetchAnalytics = async () => {
    try {
      const data = await surveyService.getSurveyAnalytics(survey._id);
      setAnalytics(data);

      if (data.questionAnalytics) {
        const answeredQuestions = data.questionAnalytics.length;
        const progress = (answeredQuestions / survey.questions.length) * 100;
        setUserProgress(progress);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleSubmitResponse = async (
    answers: Array<{ question: string; answer: any }>
  ) => {
    try {
      await surveyService.submitResponse(survey._id, answers);
      setShowResponse(false);
      fetchAnalytics();
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  const handleViewDetails = () => {
    if (survey.status === 'completed') {
      setShowAnalytics(true);
    } else {
      setShowResponse(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
          <p className="text-gray-600 text-sm">{survey.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            survey.status === 'active'
              ? 'bg-green-100 text-green-800'
              : survey.status === 'completed'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {survey.status}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{analytics?.totalResponses || 0} responses</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>
            {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ended'}
          </span>
        </div>
      </div>

      {userProgress > 0 && survey.status === 'active' && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Your Progress</span>
            <span className="font-medium">{Math.round(userProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${userProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleViewDetails}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {survey.status === 'completed' ? (
            <>
              <PieChart className="h-5 w-5" />
              View Results
            </>
          ) : (
            <>
              <ClipboardList className="h-5 w-5" />
              Take Survey
            </>
          )}
        </button>
      </div>

      {showResponse && (
        <SurveyResponse
          survey={survey}
          onSubmit={handleSubmitResponse}
          onClose={() => setShowResponse(false)}
        />
      )}

      {showAnalytics && analytics && (
        <SurveyAnalytics
          analytics={analytics}
          survey={survey}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}