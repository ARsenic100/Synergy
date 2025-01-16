import React from 'react';
import { ArrowLeft, Building2, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface BestPracticeDetailsProps {
  practice: {
    id: string;
    title: string;
    school: string;
    challenge: string;
    impact: string;
    duration: string;
    category: string;
    description: string;
    keySteps: string[];
    outcomes: string[];
  };
  onBack: () => void;
}

export function BestPracticeDetails({ practice, onBack }: BestPracticeDetailsProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Best Practices
      </button>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{practice.title}</h2>
          <p className="text-gray-600 text-lg">{practice.school}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Challenge</span>
            </div>
            <p className="text-gray-600">{practice.challenge}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium">Impact</span>
            </div>
            <p className="text-gray-600">{practice.impact}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Duration</span>
            </div>
            <p className="text-gray-600">{practice.duration}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-600">{practice.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Implementation Steps</h3>
            <div className="space-y-3">
              {practice.keySteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Key Outcomes</h3>
            <div className="space-y-3">
              {practice.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="text-gray-600">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}