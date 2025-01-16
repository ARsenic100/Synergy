import React from 'react';
import { X, PieChart, BarChart, Users } from 'lucide-react';

interface SurveyAnalyticsProps {
  analytics: {
    totalResponses: number;
    questionAnalytics: Array<{
      question: string;
      responses: number;
      optionCounts?: Record<string, number>;
    }>;
  };
  survey: {
    title: string;
    questions: Array<{
      question: string;
      type: string;
      options?: string[];
    }>;
  };
  onClose: () => void;
}

export function SurveyAnalytics({ analytics, survey, onClose }: SurveyAnalyticsProps) {
  const getResponsePercentage = (responses: number) => {
    return ((responses / analytics.totalResponses) * 100).toFixed(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{survey.title}</h2>
              <p className="text-gray-600 mt-1">Survey Results</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">
                Total Responses: {analytics.totalResponses}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {analytics.questionAnalytics.map((questionData, index) => {
              const question = survey.questions[index];
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">{question.question}</h3>

                  {question.type === 'multiple-choice' && questionData.optionCounts ? (
                    <div className="space-y-4">
                      {Object.entries(questionData.optionCounts).map(([option, count]) => (
                        <div key={option}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{option}</span>
                            <span className="font-medium">
                              {getResponsePercentage(count)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${(count / analytics.totalResponses) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {count} responses
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : question.type === 'rating' ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((rating) => {
                        const count = questionData.optionCounts?.[rating.toString()] || 0;
                        return (
                          <div key={rating}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{rating} Star{rating !== 1 ? 's' : ''}</span>
                              <span className="font-medium">
                                {getResponsePercentage(count)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all"
                                style={{
                                  width: `${(count / analytics.totalResponses) * 100}%`,
                                }}
                              />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {count} responses
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <p>{questionData.responses} text responses received</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}