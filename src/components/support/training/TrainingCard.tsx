import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Training } from '../../../types/support';

interface TrainingCardProps {
  training: Training;
  onClick: () => void;
}

export function TrainingCard({ training, onClick }: TrainingCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-left w-full"
    >
      <h3 className="text-lg font-semibold mb-2">{training.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{training.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">{training.duration}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Level</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            training.level === 'basic'
              ? 'bg-green-100 text-green-800'
              : training.level === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {training.level}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Progress</span>
            <span>{training.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${training.completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}