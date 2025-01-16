import React from 'react';
import { Users } from 'lucide-react';

interface TeacherStudentSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function TeacherStudentSection({
  formData,
  onChange,
  errors,
}: TeacherStudentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Total Teachers
            </div>
          </label>
          <input
            type="number"
            value={formData.totalTeachers}
            onChange={(e) => onChange('totalTeachers', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Total Students
            </div>
          </label>
          <input
            type="number"
            value={formData.totalStudents}
            onChange={(e) => onChange('totalStudents', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">Student Demographics</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            General
          </label>
          <input
            type="number"
            value={formData.studentDemographics.general}
            onChange={(e) =>
              onChange('studentDemographics', {
                ...formData.studentDemographics,
                general: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SC
          </label>
          <input
            type="number"
            value={formData.studentDemographics.SC}
            onChange={(e) =>
              onChange('studentDemographics', {
                ...formData.studentDemographics,
                SC: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ST
          </label>
          <input
            type="number"
            value={formData.studentDemographics.ST}
            onChange={(e) =>
              onChange('studentDemographics', {
                ...formData.studentDemographics,
                ST: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OBC
          </label>
          <input
            type="number"
            value={formData.studentDemographics.OBC}
            onChange={(e) =>
              onChange('studentDemographics', {
                ...formData.studentDemographics,
                OBC: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}