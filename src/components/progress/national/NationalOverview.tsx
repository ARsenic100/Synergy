import React from 'react';
import { ProgressMap } from './ProgressMap';
import { KeyMetrics } from './KeyMetrics';
import { TrendsAnalysis } from './TrendsAnalysis';
import { AIInsights } from '../shared/AIInsights';
import { useProgress } from '../../../hooks/useProgress';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function NationalOverview() {
  const { 
    stateProgress, 
    keyMetrics, 
    transitionTrends, 
    insights,
    loading,
    error 
  } = useProgress();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">National Progress Map</h2>
          <ProgressMap stateProgress={stateProgress} />
        </div>
        <div>
          <KeyMetrics metrics={keyMetrics} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendsAnalysis trends={transitionTrends} />
        <AIInsights insights={insights} />
      </div>
    </div>
  );
}