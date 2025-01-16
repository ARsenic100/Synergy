import React from 'react';
import { BookOpen } from 'lucide-react';

interface EducationalSupportSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function EducationalSupportSection({
  formData,
  onChange,
  errors,
}: EducationalSupportSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.curriculumStandardsAdherence}
              onChange={(e) => onChange('curriculumStandardsAdherence', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Curriculum Standards Adherence</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.curriculumImplementation}
              onChange={(e) => onChange('curriculumImplementation', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Curriculum Implementation</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.qualifiedAndTrainedTeachers}
              onChange={(e) => onChange('qualifiedAndTrainedTeachers', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Qualified and Trained Teachers</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.supportiveLearningEnvironment}
              onChange={(e) => onChange('supportiveLearningEnvironment', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Supportive Learning Environment</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.noPunitivePractices}
              onChange={(e) => onChange('noPunitivePractices', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>No Punitive Practices</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.studentLearningOutcomes}
              onChange={(e) => onChange('studentLearningOutcomes', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Student Learning Outcomes</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.positiveEducationalOutcomes}
              onChange={(e) => onChange('positiveEducationalOutcomes', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Positive Educational Outcomes</span>
          </label>
        </div>
      </div>
    </div>
  );
}