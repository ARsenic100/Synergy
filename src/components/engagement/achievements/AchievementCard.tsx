import React, { useState } from 'react';
import { Award, Calendar, Share2, Trophy } from 'lucide-react';
import { Achievement } from '../../../types/achievement';
import { format } from 'date-fns';
import { ShareAchievementDialog } from './ShareAchievementDialog';

interface AchievementCardProps {
  achievement: Achievement;
  onShare: (id: string) => void;
}

export function AchievementCard({ achievement, onShare }: AchievementCardProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'infrastructure':
        return 'bg-blue-50 text-blue-600';
      case 'engagement':
        return 'bg-green-50 text-green-600';
      case 'academic':
        return 'bg-purple-50 text-purple-600';
      case 'compliance':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const handleShare = async () => {
    await onShare(achievement._id);
    setShowShareDialog(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${getCategoryColor(achievement.category)}`}>
            <Trophy className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                {achievement.points} points
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Earned on {format(new Date(achievement.earnedDate), 'MMM d, yyyy')}</span>
              </div>
              {!achievement.shared && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              )}
            </div>

            {achievement.criteria && Object.keys(achievement.criteria).length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Achievement Criteria</h4>
                <ul className="space-y-1">
                  {Object.entries(achievement.criteria).map(([key, value]) => (
                    <li key={key} className="text-sm text-gray-600">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {showShareDialog && (
        <ShareAchievementDialog
          achievement={achievement}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </>
  );
}