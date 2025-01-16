import React from 'react';
import { Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { ResourceCalculation } from '../../../types/calculator';

interface GradeStructureProps {
  data: ResourceCalculation;
  onChange: (data: ResourceCalculation) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GradeStructure({
  data,
  onChange,
  onNext,
  onBack,
}: GradeStructureProps) {
  const handleGradeChange = (grade: string, field: string, value: any) => {
    onChange({
      ...data,
      gradeStructure: {
        ...data.gradeStructure,
        [grade]: {
          ...data.gradeStructure[grade as keyof typeof data.gradeStructure],
          [field]: value,
        },
      },
    });
  };

  const isValid = () => {
    const totalStudents = Object.values(data.gradeStructure).reduce(
      (sum, grade) => sum + (grade.enabled ? grade.students : 0),
      0
    );
    return totalStudents > 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data.gradeStructure).map(([grade, info]) => (
          <div
            key={grade}
            className="p-6 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={info.enabled}
                  onChange={(e) =>
                    handleGradeChange(grade, 'enabled', e.target.checked)
                  }
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="font-medium text-gray-700">
                  {grade
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
              </label>
            </div>

            {info.enabled && (
              <div className="relative">
                <input
                  type="number"
                  value={info.students}
                  onChange={(e) =>
                    handleGradeChange(grade, 'students', parseInt(e.target.value) || 0)
                  }
                  placeholder="Number of students"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  min="0"
                />
                <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        ))}
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
          onClick={onNext}
          disabled={!isValid()}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}