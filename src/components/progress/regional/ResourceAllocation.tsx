import React from 'react';
import { Package, ArrowRight } from 'lucide-react';

interface ResourceAllocationProps {
  state: string;
}

export function ResourceAllocation({ state }: ResourceAllocationProps) {
  const resources = [
    {
      type: 'Infrastructure',
      allocated: 5000000,
      utilized: 3500000,
      status: 'on-track'
    },
    {
      type: 'Teaching Staff',
      allocated: 250,
      utilized: 200,
      status: 'attention'
    },
    {
      type: 'Educational Materials',
      allocated: 1000000,
      utilized: 950000,
      status: 'critical'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Resource Allocation Status</h3>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          View Details
        </button>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.type} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{resource.type}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Allocated</span>
                    <span className="font-medium">
                      {typeof resource.allocated === 'number' && resource.allocated > 1000
                        ? `₹${(resource.allocated / 1000000).toFixed(1)}M`
                        : resource.allocated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Utilized</span>
                    <span className="font-medium">
                      {typeof resource.utilized === 'number' && resource.utilized > 1000
                        ? `₹${(resource.utilized / 1000000).toFixed(1)}M`
                        : resource.utilized}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  resource.status === 'on-track'
                    ? 'bg-green-100 text-green-800'
                    : resource.status === 'attention'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {resource.status}
              </span>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    resource.status === 'on-track'
                      ? 'bg-green-500'
                      : resource.status === 'attention'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${(resource.utilized / resource.allocated) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}