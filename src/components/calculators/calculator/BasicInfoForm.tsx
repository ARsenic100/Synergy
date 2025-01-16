import React from 'react';
import { Building2, Users, Landmark, MapPin } from 'lucide-react';
import { ResourceCalculation } from '../../../types/calculator';

interface BasicInfoFormProps {
  data: ResourceCalculation;
  onChange: (data: ResourceCalculation) => void;
  onNext: () => void;
}

export function BasicInfoForm({ data, onChange, onNext }: BasicInfoFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      basicInfo: {
        ...data.basicInfo,
        [field]: value,
      },
    });
  };

  const isValid = () => {
    return (
      data.basicInfo.totalStudents > 0 &&
      data.basicInfo.budget > 0 &&
      data.basicInfo.landArea > 0
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Total Students</span>
            <div className="mt-1 relative">
              <input
                type="number"
                value={data.basicInfo.totalStudents}
                onChange={(e) =>
                  handleChange('totalStudents', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
              />
              <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">School Type</span>
            <div className="mt-1 relative">
              <select
                value={data.basicInfo.schoolType}
                onChange={(e) => handleChange('schoolType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              >
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
                <option value="semi-urban">Semi-Urban</option>
              </select>
              <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">
              Available Budget (₹)
            </span>
            <div className="mt-1 relative">
              <input
                type="number"
                value={data.basicInfo.budget}
                onChange={(e) =>
                  handleChange('budget', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
              />
              <Landmark className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">
              Land Area (square meters)
            </span>
            <div className="mt-1 relative">
              <input
                type="number"
                value={data.basicInfo.landArea}
                onChange={(e) =>
                  handleChange('landArea', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
              />
              <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}