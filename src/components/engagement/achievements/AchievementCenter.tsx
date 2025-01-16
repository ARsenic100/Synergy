import React, { useState, useEffect } from 'react';
import { Search, Filter, Trophy } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { achievementService } from '../../../services/achievementService';
import { Achievement, AchievementsResponse } from '../../../types/achievement';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useAuth } from '../../../contexts/AuthContext';

export function AchievementCenter() {
  const {user}=useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedUserId, setSelectedUserId] = useState(user?.id); // Default user ID

  useEffect(() => {
    fetchAchievements();
  }, [selectedUserId]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: AchievementsResponse = await achievementService.getAchievements(selectedUserId);
      setAchievements(response.achievements);
      setTotalPoints(response.totalPoints);
    } catch (err) {
      setError('Failed to fetch achievements');
      console.error('Error fetching achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (achievementId: string) => {
    try {
      await achievementService.shareAchievement(achievementId);
      fetchAchievements(); // Refresh the list after sharing
    } catch (error) {
      console.error('Error sharing achievement:', error);
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = 
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || achievement.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
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
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Achievement Center</h2>
        </div>
        <p className="text-lg opacity-90">Total Points: {totalPoints}</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search achievements..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="engagement">Community Engagement</option>
          <option value="academic">Academic Excellence</option>
          <option value="compliance">Compliance</option>
        </select>

        {/* School/User Selection */}
       
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement._id}
            achievement={achievement}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
}