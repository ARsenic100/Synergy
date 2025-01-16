import React from 'react';
import { School } from '../../../types/school';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonSelectorProps {
  schools: School[];
  selectedSchools: School[];
  onSelectSchool: (school: School) => void;
  onRemoveSchool: (schoolId: string) => void;
}

export function ComparisonSelector({
  schools,
  selectedSchools,
  onSelectSchool,
  onRemoveSchool,
}: ComparisonSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedSchools.map((school) => (
          <motion.div
            key={school.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg"
          >
            <span className="text-sm font-medium">{school.name}</span>
            <button
              onClick={() => onRemoveSchool(school.id)}
              className="p-1 hover:bg-indigo-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {selectedSchools.length < 3 && (
        <select
          onChange={(e) => {
            const school = schools.find((s) => s.id === e.target.value);
            if (school) onSelectSchool(school);
          }}
          value=""
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Add school to compare...</option>
          {schools
            .filter(
              (school) => !selectedSchools.find((s) => s.id === school.id)
            )
            .map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
