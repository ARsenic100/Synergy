import React from 'react';
import { Play, Clock, FileText, AlertCircle } from 'lucide-react';
import { TimelineTask } from './TimelineTask';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TimelineMilestoneProps {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  tasks: Task[];
  onTaskToggle: (taskId: string, completed: boolean) => void;
}

export function TimelineMilestone({
  title,
  description,
  date,
  status,
  tasks,
  onTaskToggle,
}: TimelineMilestoneProps) {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-gray-200 last:pb-0">
      {/* Timeline Node */}
      <div className="absolute -left-[9px] top-0">
        {status === 'completed' ? (
          <div className="w-4 h-4 rounded-full bg-green-600" />
        ) : status === 'in-progress' ? (
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
        ) : (
          <div className="w-4 h-4 rounded-full bg-gray-300" />
        )}
      </div>

      {/* Milestone Content */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{format(new Date(date), 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <TimelineTask
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onToggle={onTaskToggle}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <Clock className="h-4 w-4" />
            <span>Set Reminder</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <FileText className="h-4 w-4" />
            <span>Add Note</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <AlertCircle className="h-4 w-4" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
}