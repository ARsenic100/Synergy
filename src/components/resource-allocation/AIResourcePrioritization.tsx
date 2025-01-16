import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface AnalyzedRequest {
  requestId: string;
  schoolId: string;
  schoolName: string;
  requestDetails: {
    type: string;
    quantity: number;
    cost: number;
    priority: string;
  };
  analysis: {
    urgencyScore: number;
    predictedNeed: number;
    contextScore: number;
    averageScore: number;
    recommendations: string[];
  };
}

export function AIResourcePrioritization() {
  const [analyzedRequests, setAnalyzedRequests] = useState<AnalyzedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get('https://synergy-backend-six.vercel.app/api/resource-plans/analyze');
        setAnalyzedRequests(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">AI Resource Prioritization</h2>
        </div>

        <div className="space-y-6">
          {analyzedRequests.map((request) => (
            <div 
              key={request.requestId} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{request.schoolName}</h3>
                  <p className="text-sm text-gray-600">ID: {request.schoolId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    request.requestDetails.priority === 'critical' 
                      ? 'bg-red-100 text-red-800'
                      : request.requestDetails.priority === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {request.requestDetails.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-medium">Urgency Score</h4>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">
                    {(request.analysis.urgencyScore * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Predicted Need</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {(request.analysis.predictedNeed * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium">Context Score</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {(request.analysis.contextScore * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">Resource Type:</span>{' '}
                  {request.requestDetails.type}
                </div>
                <div>
                  <span className="font-medium">Quantity:</span>{' '}
                  {request.requestDetails.quantity}
                </div>
                <div>
                  <span className="font-medium">Estimated Cost:</span>{' '}
                  ₹{request.requestDetails.cost.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Average Score:</span>{' '}
                  {(request.analysis.averageScore * 100).toFixed(1)}%
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  AI Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {request.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">
                        {index + 1}
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}