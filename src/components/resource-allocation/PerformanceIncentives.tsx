import React from 'react';
import { Trophy, Star, TrendingUp, Award } from 'lucide-react';

interface SchoolAchievement {
  id: string;
  schoolName: string;
  achievement: string;
  date: string;
  impact: string;
  rewardType: 'badge' | 'grant' | 'recognition';
  rewardValue?: string;
}

const mockAchievements: SchoolAchievement[] = [
  {
    id: '1',
    schoolName: 'Delhi Public School',
    achievement: 'Outstanding Resource Utilization',
    date: '2024-03-15',
    impact: '25% improvement in learning outcomes',
    rewardType: 'grant',
    rewardValue: '₹500,000',
  },
  {
    id: '2',
    schoolName: "St. Mary's School",
    achievement: 'Innovation in Resource Sharing',
    date: '2024-03-10',
    impact: 'Benefited 5 neighboring schools',
    rewardType: 'badge',
  },
  {
    id: '3',
    schoolName: 'Government High School',
    achievement: 'Sustainable Resource Management',
    date: '2024-03-05',
    impact: '30% reduction in resource wastage',
    rewardType: 'recognition',
  },
];

export function PerformanceIncentives() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Performance Incentives</h2>
          <p className="text-gray-600 mt-1">
            Recognizing excellence in resource utilization
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          View All Achievements
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-medium">Top Performers</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600">24</p>
          <p className="text-sm text-gray-600 mt-1">
            Schools achieved excellence
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium">Total Grants</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">₹2.5M</p>
          <p className="text-sm text-gray-600 mt-1">Awarded this quarter</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Recognition</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">156</p>
          <p className="text-sm text-gray-600 mt-1">Badges awarded</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockAchievements.map((achievement) => (
          <div key={achievement.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{achievement.schoolName}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      achievement.rewardType === 'grant'
                        ? 'bg-green-100 text-green-800'
                        : achievement.rewardType === 'badge'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {achievement.rewardType}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">{achievement.achievement}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Impact: {achievement.impact}</span>
                  <span>
                    Date: {new Date(achievement.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {achievement.rewardType === 'grant' && (
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">
                    {achievement.rewardValue}
                  </span>
                  <p className="text-sm text-gray-600">Grant Amount</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
