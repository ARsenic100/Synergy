import React from 'react';
import { PolicyUpdate } from '../../types/engagement';
import { AlertCircle, Calendar, ArrowRight } from 'lucide-react';

interface PolicyUpdateCardProps {
  update: PolicyUpdate;
  onViewDetails: (updateId: string) => void;
}

export function PolicyUpdateCard({ update, onViewDetails }: PolicyUpdateCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${
          update.importance === 'high' ? 'bg-red-100' :
          update.importance === 'medium' ? 'bg-yellow-100' :
          'bg-blue-100'
        }`}>
          <AlertCircle className={`h-6 w-6 ${
            update.importance === 'high' ? 'text-red-600' :
            update.importance === 'medium' ? 'text-yellow-600' :
            'text-blue-600'
          }`} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{update.summary}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Effective: {new Date(update.effectiveDate).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => onViewDetails(update.id)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}