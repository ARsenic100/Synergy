import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

interface ProgressMetric {
  label: string;
  value: number;
  total: number;
  status: 'completed' | 'in-progress' | 'pending';
}

const mockMetrics: ProgressMetric[] = [
  {
    label: 'Infrastructure Tasks',
    value: 8,
    total: 12,
    status: 'in-progress'
  },
  {
    label: 'Academic Integration',
    value: 5,
    total: 8,
    status: 'in-progress'
  },
  {
    label: 'Staff Training',
    value: 3,
    total: 3,
    status: 'completed'
  },
  {
    label: 'Documentation',
    value: 2,
    total: 6,
    status: 'pending'
  }
];

export function ProgressOverview() {
  const calculatePercentage = (value: number, total: number) => {
    return (value / total) * 100;
  };

  const getStatusColor = (status: ProgressMetric['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold">Transition Progress</h2>
          <p className="text-sm text-gray-600">Overall completion: 65%</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Est. completion: June 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span>8 team members</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium">{metric.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-gray-500">/ {metric.total}</span>
                </div>
              </div>
              
              <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                {metric.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : metric.status === 'in-progress' ? (
                  <Clock className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {calculatePercentage(metric.value, metric.total).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">+5%</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${calculatePercentage(metric.value, metric.total)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}