import React, { useState, useEffect } from 'react';
import { StateSelector } from './StateSelector';
import { EntitySelector } from './EntitySelector';
import { MetricsOverview } from './MetricsOverview';
import { ProgressDistribution } from './ProgressDistribution';
import { TopPerformers } from './TopPerformers';
import { AIInsights } from './AIInsights';
import { useComparativeAnalysis } from '../../../hooks/useComparativeAnalysis';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function ComparativeAnalysis() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState<'district' | 'school'>('district');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);

  const {
    data,
    loading,
    error,
    fetchAnalysis
  } = useComparativeAnalysis();

  useEffect(() => {
    if (selectedState && selectedEntities.length > 0) {
      fetchAnalysis(selectedState, selectedType, selectedEntities);
    }
  }, [selectedState, selectedType, selectedEntities]);

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StateSelector
            value={selectedState}
            onChange={setSelectedState}
          />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={selectedType === 'district'}
                onChange={() => setSelectedType('district')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>District-wise</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={selectedType === 'school'}
                onChange={() => setSelectedType('school')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>School-wise</span>
            </label>
          </div>
        </div>

        <EntitySelector
          state={selectedState}
          type={selectedType}
          selected={selectedEntities}
          onChange={setSelectedEntities}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data ? (
        <>
          <MetricsOverview metrics={data.metrics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressDistribution
              data={data.progressDistribution}
              type={selectedType}
            />
            <TopPerformers performers={data.topPerformers} type={selectedType} />
          </div>
          <AIInsights insights={data.insights} />
        </>
      ) : null}
    </div>
  );
}