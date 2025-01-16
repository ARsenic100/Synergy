import React from 'react';
import {
  Book,
  Monitor,
  Flag,
  Trees,
  Palette,
  Music,
  Heart,
  Coffee,
  ArrowLeft,
  Calculator,
  Sliders,
} from 'lucide-react';
import { ResourceCalculation } from '../../../types/calculator';

interface FacilityRequirementsProps {
  data: ResourceCalculation;
  onChange: (data: ResourceCalculation) => void;
  onCalculate: () => void;
  onBack: () => void;
}

export function FacilityRequirements({
  data,
  onChange,
  onCalculate,
  onBack,
}: FacilityRequirementsProps) {
  const handleFacilityChange = (facility: string, value: boolean) => {
    onChange({
      ...data,
      facilities: {
        ...data.facilities,
        [facility]: value,
      },
    });
  };

  const handleRatioChange = (ratio: string, value: number) => {
    onChange({
      ...data,
      ratios: {
        ...data.ratios,
        [ratio]: value,
      },
    });
  };

  const facilities = [
    { id: 'library', label: 'Library', icon: Book },
    { id: 'computerLab', label: 'Computer Lab', icon: Monitor },
    { id: 'scienceLab', label: 'Science Lab', icon: Flag },
    { id: 'playground', label: 'Playground', icon: Trees },
    { id: 'artRoom', label: 'Art Room', icon: Palette },
    { id: 'musicRoom', label: 'Music Room', icon: Music },
    { id: 'infirmary', label: 'Infirmary', icon: Heart },
    { id: 'cafeteria', label: 'Cafeteria', icon: Coffee },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sliders className="h-5 w-5 text-indigo-600" />
          Resource Ratios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teacher-Student Ratio (1:X)
            </label>
            <input
              type="number"
              value={data.ratios.teacherStudent}
              onChange={(e) =>
                handleRatioChange(
                  'teacherStudent',
                  parseInt(e.target.value) || 30
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Classroom-Student Ratio (1:X)
            </label>
            <input
              type="number"
              value={data.ratios.classroomStudent}
              onChange={(e) =>
                handleRatioChange(
                  'classroomStudent',
                  parseInt(e.target.value) || 40
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Washroom-Student Ratio (1:X)
            </label>
            <input
              type="number"
              value={data.ratios.washroomStudent}
              onChange={(e) =>
                handleRatioChange(
                  'washroomStudent',
                  parseInt(e.target.value) || 50
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Computer-Student Ratio (1:X)
            </label>
            <input
              type="number"
              value={data.ratios.computerStudent}
              onChange={(e) =>
                handleRatioChange(
                  'computerStudent',
                  parseInt(e.target.value) || 20
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Required Facilities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilities.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                data.facilities[id as keyof typeof data.facilities]
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={data.facilities[id as keyof typeof data.facilities]}
                onChange={(e) => handleFacilityChange(id, e.target.checked)}
                className="sr-only"
              />
              <Icon
                className={`h-5 w-5 ${
                  data.facilities[id as keyof typeof data.facilities]
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              />
              <span
                className={
                  data.facilities[id as keyof typeof data.facilities]
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600'
                }
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <button
          onClick={onCalculate}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Calculator className="h-5 w-5" />
          Calculate Resources
        </button>
      </div>
    </div>
  );
}
