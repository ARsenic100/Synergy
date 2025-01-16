import React from 'react';
import { Building2, BookOpen } from 'lucide-react';

interface InfrastructureSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function InfrastructureSection({
  formData,
  onChange,
  errors,
}: InfrastructureSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              Total Classrooms
            </div>
          </label>
          <input
            type="number"
            value={formData.totalClassrooms}
            onChange={(e) => onChange('totalClassrooms', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              Lowest Class
            </div>
          </label>
          <input
            type="number"
            value={formData.lowestClass}
            onChange={(e) => onChange('lowestClass', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              Highest Class
            </div>
          </label>
          <input
            type="number"
            value={formData.highestClass}
            onChange={(e) => onChange('highestClass', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.separateRoomForHM}
              onChange={(e) => onChange('separateRoomForHM', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Separate Room for HM</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.boysWashrooms}
              onChange={(e) => onChange('boysWashrooms', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Boys Washrooms</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.girlsWashrooms}
              onChange={(e) => onChange('girlsWashrooms', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Girls Washrooms</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.boundaryWall}
              onChange={(e) => onChange('boundaryWall', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Boundary Wall</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.playgroundAvailable}
              onChange={(e) => onChange('playgroundAvailable', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Playground Available</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.libraryAvailable}
              onChange={(e) => onChange('libraryAvailable', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Library Available</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.computerLabAvailable}
              onChange={(e) => onChange('computerLabAvailable', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Computer Lab Available</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.drinkingWaterAvailable}
              onChange={(e) => onChange('drinkingWaterAvailable', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Drinking Water Available</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.electricityAvailability}
              onChange={(e) => onChange('electricityAvailability', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Electricity Available</span>
          </label>
        </div>
      </div>
    </div>
  );
}