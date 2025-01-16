import React from 'react';
import { TrainingModule } from '../../types/support';
import { Clock, BookOpen, Award } from 'lucide-react';

interface TrainingCardProps {
  module: TrainingModule;
  onStart: (moduleId: string) => void;
}

export function TrainingCard({ module, onStart }: TrainingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{module.title}</h3>
        <span className={`px-2 py-1 rounded text-xs ${
          module.level === 'basic' ? 'bg-green-100 text-green-800' :
          module.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {module.level}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{module.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{module.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>{module.topics.length} topics</span>
        </div>
      </div>

      {module.completionRate !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{module.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${module.completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      <button
        onClick={() => onStart(module.id)}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        {module.completionRate ? 'Continue' : 'Start'} Training
      </button>
    </div>
  );
}