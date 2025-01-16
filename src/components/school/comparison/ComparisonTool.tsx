import React, { useState } from 'react';
import { School } from '../../../types/school';
import { ComparisonChart } from './ComparisonChart';
import { ComparisonMetrics } from './ComparisonMetrics';
import { ComparisonSelector } from './ComparisonSelector';
import { motion } from 'framer-motion';

interface ComparisonToolProps {
  schools: School[];
  selectedSchools: School[];
  onSelectSchool: (school: School) => void;
  onRemoveSchool: (schoolId: string) => void;
}

export function ComparisonTool({
  schools,
  selectedSchools,
  onSelectSchool,
  onRemoveSchool,
}: ComparisonToolProps) {
  const [activeMetric, setActiveMetric] = useState<
    'students' | 'teachers' | 'facilities'
  >('students');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6">School Comparison</h2>

      <ComparisonSelector
        schools={schools}
        selectedSchools={selectedSchools}
        onSelectSchool={onSelectSchool}
        onRemoveSchool={onRemoveSchool}
      />

      {selectedSchools.length > 0 && (
        <>
          <div className="mt-8">
            <ComparisonMetrics
              schools={selectedSchools}
              activeMetric={activeMetric}
              onMetricChange={setActiveMetric}
            />
          </div>

          <div className="mt-8">
            <ComparisonChart schools={selectedSchools} metric={activeMetric} />
          </div>
        </>
      )}
    </motion.div>
  );
}
