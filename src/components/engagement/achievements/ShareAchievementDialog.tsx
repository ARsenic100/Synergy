import React from 'react';
import { Trophy, X, Share2, Calendar } from 'lucide-react';
import { Achievement } from '../../../types/achievement';
import { format } from 'date-fns';

interface ShareAchievementDialogProps {
  achievement: Achievement;
  onClose: () => void;
}

export function ShareAchievementDialog({ achievement, onClose }: ShareAchievementDialogProps) {
  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'infrastructure':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'engagement':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'academic':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'compliance':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share Achievement</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Telegram-style message preview */}
        <div className="border rounded-lg p-4 bg-[#f5f5f5] mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold">School Achievement Bot</div>
              <div className="text-xs text-gray-500">
                {format(new Date(achievement.shareDate || achievement.updatedAt), 'MMM d, yyyy h:mm a')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${getCategoryColor(achievement.category)}`}>
              {achievement.category}
            </div>

            <h3 className="text-lg font-bold mb-2">🏆 {achievement.title}</h3>
            <p className="text-gray-600 mb-3">{achievement.description}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="h-4 w-4" />
              <span>Earned on {format(new Date(achievement.earnedDate), 'MMMM d, yyyy')}</span>
            </div>

            <div className="bg-indigo-50 text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">
              🌟 Points Earned: {achievement.points}
            </div>

            {achievement.criteria && Object.keys(achievement.criteria).length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Achievement Criteria:</h4>
                <ul className="space-y-1">
                  {Object.entries(achievement.criteria).map(([key, value]) => (
                    <li key={key} className="text-sm text-gray-600">
                      • {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {/* Implement social share */}}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5]"
          >
            <Share2 className="h-5 w-5" />
            Share on Telegram
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}