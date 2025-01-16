import React from 'react';
import {
  Users,
  School,
  Building2,
  Droplets,
  Monitor,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CalculationResultsProps {
  results: any;
}

export function CalculationResults({ results }: CalculationResultsProps) {
  const metrics = [
    {
      label: 'Teachers Required',
      value: results.teachers,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Classrooms Needed',
      value: results.classrooms,
      icon: School,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Total Building Area',
      value: `${results.buildingArea}m²`,
      icon: Building2,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Washrooms Required',
      value: results.washrooms,
      icon: Droplets,
      color: 'bg-cyan-50 text-cyan-600',
    },
    {
      label: 'Computers Needed',
      value: results.computers,
      icon: Monitor,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Estimated Cost',
      value: `₹${results.estimatedCost.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-800">Calculation Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {results.warnings && results.warnings.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h4 className="text-lg font-medium text-yellow-800">
              Important Considerations
            </h4>
          </div>
          <ul className="mt-2 space-y-1 text-yellow-700">
            {results.warnings.map((warning: string, index: number) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}