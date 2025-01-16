import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  MessageSquare, 
  ClipboardList, 
  Bell, 
  Users, 
  Calendar,
  FileText,
  TrendingUp,
  Trophy,
  Headphones,
  Activity,
  X
} from 'lucide-react';
import { activityService } from '../../services/activityService';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityItem {
  _id: string;
  type: string;
  action: string;
  title: string;
  description?: string;
  createdAt: string;
  user: {
    name: string;
  };
}

const getActivityIcon = (type: string) => {
  const icons: { [key: string]: React.ElementType } = {
    discussions: MessageSquare,
    surveys: ClipboardList,
    policies: Bell,
    directory: Users,
    events: Calendar,
    resources: FileText,
    progress: TrendingUp,
    achievements: Trophy,
    support: Headphones
  };
  return icons[type] || Activity;
};

const getActivityColor = (type: string) => {
  const colors: { [key: string]: string } = {
    discussions: 'text-blue-600 bg-blue-50',
    surveys: 'text-green-600 bg-green-50',
    policies: 'text-yellow-600 bg-yellow-50',
    directory: 'text-purple-600 bg-purple-50',
    events: 'text-pink-600 bg-pink-50',
    resources: 'text-indigo-600 bg-indigo-50',
    progress: 'text-cyan-600 bg-cyan-50',
    achievements: 'text-orange-600 bg-orange-50',
    support: 'text-red-600 bg-red-50'
  };
  return colors[type] || 'text-gray-600 bg-gray-50';
};

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await activityService.getRecentActivities();
        setActivities(data);
      } catch (err) {
        setError('Failed to fetch recent activities');
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    // Poll for new activities every minute
    const interval = setInterval(fetchActivities, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const displayedActivities = showAllActivities ? activities : activities.slice(0, 4);
  console.log(displayedActivities);

  const ActivityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Activities</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {displayedActivities.map((activity, index) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  {React.createElement(getActivityIcon(activity.type), { className: "h-5 w-5" })}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    by {activity.user}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
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
    <>
      <div className="space-y-4">
        {displayedActivities.map((activity, index) => (
          <motion.div
            key={activity._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                {React.createElement(getActivityIcon(activity.type), { className: "h-5 w-5" })}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  by {activity.user}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activities.length > 4 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            View All Activities
          </button>
        </div>
      )}

      <AnimatePresence>
        {showModal && <ActivityModal />}
      </AnimatePresence>
    </>
  );
}