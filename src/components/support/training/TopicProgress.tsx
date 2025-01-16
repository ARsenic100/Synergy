import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export type TopicStatus = 'pending' | 'in-progress' | 'completed';

interface TopicProgressProps {
  title: string;
  status: TopicStatus;
  onStatusChange: (status: TopicStatus) => void;
}

export function TopicProgress({ title, status, onStatusChange }: TopicProgressProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      status === 'completed' ? 'bg-green-50' : 'bg-gray-50'
    }`}>
      <div className="flex items-center gap-3">
        {status === 'completed' ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : status === 'in-progress' ? (
          <Clock className="h-5 w-5 text-yellow-600" />
        ) : (
          <Circle className="h-5 w-5 text-gray-400" />
        )}
        <span className={`font-medium ${
          status === 'completed' ? 'text-green-600' : 'text-gray-700'
        }`}>{title}</span>
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as TopicStatus)}
        className="rounded-md border-gray-300 text-sm"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}