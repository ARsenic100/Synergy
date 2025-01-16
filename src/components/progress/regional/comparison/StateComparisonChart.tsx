import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StateComparison } from '../../../../types/progress';
import { states } from '../../../../data/states';

interface StateComparisonChartProps {
  data: StateComparison[];
  onStateSelect: (states: string[]) => void;
}

export function StateComparisonChart({ data, onStateSelect }: StateComparisonChartProps) {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const handleStateChange = (state: string) => {
    const newSelection = selectedStates.includes(state)
      ? selectedStates.filter(s => s !== state)
      : [...selectedStates, state].slice(-10);
    
    setSelectedStates(newSelection);
    onStateSelect(newSelection);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">State-wise Progress Comparison</h3>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <button
              key={state.code}
              onClick={() => handleStateChange(state.name)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedStates.includes(state.name)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Select up to 10 states to compare
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" name="Completed" fill="#4f46e5" />
            <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}