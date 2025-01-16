import React from 'react';
import { School } from '../../../types/school';
import { PerformanceChart } from './PerformanceChart';
import { ResourceDistribution } from './ResourceDistribution';
import { TrendAnalysis } from './TrendAnalysis';
import { motion } from 'framer-motion';

interface DataVisualizationProps {
  school: School;
}

export function DataVisualization({ school }: DataVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart school={school} />
        <ResourceDistribution school={school} />
      </div>
      <TrendAnalysis school={school} />
    </motion.div>
  );
}
