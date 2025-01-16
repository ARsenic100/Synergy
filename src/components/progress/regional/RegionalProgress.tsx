import React, { useState } from 'react';
import { Map } from 'lucide-react';
import { RegionalMetrics } from './metrics/RegionalMetrics';
import { StateComparisonChart } from './comparison/StateComparisonChart';
import { RegionalChallenges } from './challenges/RegionalChallenges';
import { RegionalGoals } from './goals/RegionalGoals';
import { useRegionalProgress } from '../../../hooks/useRegionalProgress';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function RegionalProgress() {
  const [selectedState, setSelectedState] = useState('Kerala');
  const {
    metrics,
    stateComparison,
    challenges,
    goals,
    loading,
    error,
    fetchStateComparison,
    addGoal,
    updateGoal,
  } = useRegionalProgress(selectedState);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Map className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Regional Progress Dashboard</h2>
        </div>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          {[
            'WEST BENGAL',
            'Uttar Pradesh',
            'ANDHRA PRADESH',
            'ARUNACHAL PRADESH',
            'ASSAM',
            'BIHAR',
            'CHHATTISGARH',
            'GOA',
            'GUJARAT',
            'HARYANA',
            'HIMACHAL PRADESH',
            'JHARKHAND',
            'Karnataka',
            'KERALA',
            'MADHYA PRADESH',
            'MAHARASHTRA',
            'MANIPUR',
            'MEGHALAYA',
            'MIZORAM',
            'NAGALAND',
            'ODISHA',
            'PUNJAB',
            'RAJASTHAN',
            'SIKKIM',
            'TAMIL NADU',
            'TELANGANA',
            'TRIPURA',
            
            'UTTARAKHAND',
            
          ].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <RegionalMetrics metrics={metrics} />

      <StateComparisonChart
        data={stateComparison}
        onStateSelect={fetchStateComparison}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionalChallenges challenges={challenges} />
        <RegionalGoals
          goals={goals}
          onAddGoal={addGoal}
          onUpdateGoal={updateGoal}
        />
      </div>
    </div>
  );
}
