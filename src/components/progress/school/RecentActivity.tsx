import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  BookOpen,
  FileText,
  Users
} from 'lucide-react';

interface Activity {
  date: string;
  title: string;
  type: 'milestone' | 'update' | 'training' | 'task';
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}

interface RecentActivityProps {
  activities: Activity[] | null;
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities) return null;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return CheckCircle;
      case 'update':
        return FileText;
      case 'training':
        return Users;
      default:
        return BookOpen;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">{activity.title}</div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}