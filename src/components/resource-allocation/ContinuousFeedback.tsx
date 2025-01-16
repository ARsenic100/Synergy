import React, { useState } from 'react';
import { MessageSquare, TrendingUp, Users, Star } from 'lucide-react';

interface FeedbackEntry {
  id: string;
  type: 'utilization' | 'impact' | 'suggestion';
  schoolName: string;
  message: string;
  rating?: number;
  date: string;
  status: 'pending' | 'reviewed' | 'implemented';
}

const mockFeedback: FeedbackEntry[] = [
  {
    id: '1',
    type: 'utilization',
    schoolName: 'Delhi Public School',
    message:
      'New computer lab has significantly improved digital literacy programs',
    rating: 4,
    date: '2024-03-15',
    status: 'reviewed',
  },
  {
    id: '2',
    type: 'impact',
    schoolName: "St. Mary's School",
    message:
      'Student attendance has increased by 15% after infrastructure improvements',
    rating: 5,
    date: '2024-03-14',
    status: 'implemented',
  },
];

export function ContinuousFeedback() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'utilization' | 'impact' | 'suggestions'
  >('all');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Continuous Feedback Loop</h2>
          <p className="text-gray-600 mt-1">
            Track and analyze resource effectiveness
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Submit New Feedback
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {(['all', 'utilization', 'impact', 'suggestions'] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium">Resource Utilization</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-600 mt-1">
            Average effectiveness score
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Impact Score</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">92%</p>
          <p className="text-sm text-gray-600 mt-1">
            Student performance improvement
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium">Active Feedback</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">156</p>
          <p className="text-sm text-gray-600 mt-1">Submissions this month</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockFeedback.map((feedback) => (
          <div key={feedback.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{feedback.schoolName}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      feedback.type === 'utilization'
                        ? 'bg-green-100 text-green-800'
                        : feedback.type === 'impact'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {feedback.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{feedback.message}</p>
                {feedback.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < feedback.rating!
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    feedback.status === 'implemented'
                      ? 'bg-green-100 text-green-800'
                      : feedback.status === 'reviewed'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {feedback.status}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(feedback.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
