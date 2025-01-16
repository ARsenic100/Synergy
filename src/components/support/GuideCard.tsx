import React from 'react';
import { Guide } from '../../types/support';
import { ChevronRight, BookOpen } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
  onSelect: (guide: Guide) => void;
}

export function GuideCard({ guide, onSelect }: GuideCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{guide.steps.length} steps</span>
            </div>
            <div>
              <span>Est. {guide.estimatedDuration}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onSelect(guide)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}