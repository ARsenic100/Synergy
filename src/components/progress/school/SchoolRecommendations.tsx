import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function SchoolRecommendations() {
  const recommendations = [
    {
      title: 'Accelerate Staff Training',
      description: 'Current completion rate is below target. Consider conducting additional training sessions.',
      priority: 'high',
      impact: 'Improved teaching quality and standardization compliance'
    },
    {
      title: 'Update Infrastructure',
      description: 'Laboratory facilities need upgrades to meet standard requirements.',
      priority: 'medium',
      impact: 'Enhanced learning environment and resource optimization'
    },
    {
      title: 'Documentation Review',
      description: 'Schedule a comprehensive review of transition documentation.',
      priority: 'low',
      impact: 'Better tracking and reporting of progress'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.title}
            className={`p-4 rounded-lg ${
              recommendation.priority === 'high'
                ? 'bg-red-50'
                : recommendation.priority === 'medium'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{recommendation.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {recommendation.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Impact: {recommendation.impact}
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