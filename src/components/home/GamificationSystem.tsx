import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Target,
  Star,
  Award,
  Crown,
  Users,
  ArrowRight,
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  unlocked: boolean;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  school: string;
  points: number;
  rank: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Data Pioneer',
    description: 'Submit your first school data analysis',
    icon: Medal,
    progress: 80,
    unlocked: false,
  },
  {
    id: '2',
    name: 'Resource Master',
    description: 'Achieve 90% resource utilization',
    icon: Star,
    progress: 65,
    unlocked: true,
  },
  {
    id: '3',
    name: 'Community Leader',
    description: 'Engage with 10 other schools',
    icon: Users,
    progress: 40,
    unlocked: false,
  },
];

const leaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Delhi Public School',
    school: 'New Delhi',
    points: 2500,
    rank: 1,
  },
  {
    id: '2',
    name: "St. Mary's Academy",
    school: 'Mumbai',
    points: 2350,
    rank: 2,
  },
  {
    id: '3',
    name: 'Kendriya Vidyalaya',
    school: 'Bangalore',
    points: 2200,
    rank: 3,
  },
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Complete School Profile',
    description: 'Fill in all required school information',
    points: 100,
    difficulty: 'easy',
    completed: false,
  },
  {
    id: '2',
    title: 'Resource Optimization',
    description: 'Achieve 85% resource utilization rate',
    points: 250,
    difficulty: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Community Engagement',
    description: 'Share insights with 5 other schools',
    points: 500,
    difficulty: 'hard',
    completed: true,
  },
];

export function GamificationSystem() {
  const [activeTab, setActiveTab] = useState<
    'badges' | 'leaderboard' | 'challenges'
  >('badges');

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Trophy className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Achievement Center
          </h2>
          <p className="text-lg text-gray-600">
            Track your progress and compete with other schools
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {(['badges', 'leaderboard', 'challenges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-lg border-2 ${
                      badge.unlocked
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon
                        className={`h-8 w-8 ${
                          badge.unlocked ? 'text-green-500' : 'text-gray-400'
                        }`}
                      />
                      <h3 className="font-semibold">{badge.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{badge.description}</p>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {badge.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${badge.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        entry.rank === 1
                          ? 'bg-yellow-100'
                          : entry.rank === 2
                          ? 'bg-gray-100'
                          : 'bg-orange-100'
                      }`}
                    >
                      {entry.rank === 1 ? (
                        <Crown className="h-6 w-6 text-yellow-600" />
                      ) : (
                        <Trophy
                          className={`h-6 w-6 ${
                            entry.rank === 2
                              ? 'text-gray-600'
                              : 'text-orange-600'
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.name}</h3>
                      <p className="text-sm text-gray-600">{entry.school}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">
                      {entry.points.toLocaleString()} pts
                    </p>
                    <p className="text-sm text-gray-600">Rank #{entry.rank}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border ${
                    challenge.completed
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Target
                        className={`h-6 w-6 ${
                          challenge.completed
                            ? 'text-green-500'
                            : 'text-gray-400'
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">
                        {challenge.points} pts
                      </p>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          challenge.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : challenge.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`w-full mt-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      challenge.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {challenge.completed ? (
                      <>
                        <Award className="h-5 w-5" />
                        Completed
                      </>
                    ) : (
                      <>
                        Start Challenge
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
