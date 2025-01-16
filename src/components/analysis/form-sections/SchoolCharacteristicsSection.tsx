import React from 'react';
import { Building2, School } from 'lucide-react';

interface SchoolCharacteristicsSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function SchoolCharacteristicsSection({
  formData,
  onChange,
  errors,
}: SchoolCharacteristicsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-gray-500" />
              School Category
            </div>
          </label>
          <select
            value={formData.schoolCategory}
            onChange={(e) => onChange('schoolCategory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              School Management
            </div>
          </label>
          <select
            value={formData.schoolManagement}
            onChange={(e) => onChange('schoolManagement', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select management type</option>
            <option value="private">Private</option>
            <option value="government">Government</option>
            <option value="aided">Aided</option>
            <option value="unaided">Unaided</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-gray-500" />
              Medium of Instruction
            </div>
          </label>
          <input
            type="text"
            value={formData.mediumOfInstruction}
            onChange={(e) => onChange('mediumOfInstruction', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter medium of instruction"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              School Type
            </div>
          </label>
          <select
            value={formData.schoolType}
            onChange={(e) => onChange('schoolType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select school type</option>
            <option value="co-educational">Co-Educational</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
        </div>
      </div>
    </div>
  );
}