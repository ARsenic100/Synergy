import React from 'react';
import { CheckCircle } from 'lucide-react';

interface TimelineTaskProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
}

export function TimelineTask({ id, title, completed, onToggle }: TimelineTaskProps) {
  return (
    <div className="flex items-start gap-3 p-2">
      <button
        onClick={() => onToggle(id, !completed)}
        className={`flex items-center gap-2 text-sm ${
          completed ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        <CheckCircle 
          className={`h-4 w-4 ${
            completed ? 'text-green-600' : 'text-gray-400'
          }`} 
        />
        <span className={completed ? 'line-through' : ''}>
          {title}
        </span>
      </button>
    </div>
  );
}