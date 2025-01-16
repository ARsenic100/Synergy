import React from 'react';
import { Building2, MapPin, Users, BookOpen } from 'lucide-react';
import { School } from '../../types/school';

interface FilterPanelProps {
  filters: {
    structure: string;
    state: string;
    type: string;
    performanceBand: string;
    facilities: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string | string[]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Available states based on your data
  const states = [
    'Ladakh', 'Kerala', 'Tamil Nadu', 'Karnataka', 'Maharashtra',
    'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Bihar', 'West Bengal'
  ];

  // School structures based on your data
  const structures = [
    { value: 'Odd Structure', label: 'Odd Structure' },
    { value: 'Standard Structure', label: 'Standard Structure' }
  ];

  // School types based on your data
  const schoolTypes = [
    { value: 'government', label: 'Government' },
    { value: 'private', label: 'Private' },
    { value: 'aided', label: 'Aided' },
    { value: 'unaided', label: 'Unaided' }
  ];

  // Performance bands based on your data
  const performanceBands = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Average', label: 'Average' },
    { value: 'Poor', label: 'Poor' }
  ];

  // Available facilities based on your data
  const facilityOptions = [
    'Library',
    'Computer Lab',
    'Science Lab',
    'Playground',
    'Electricity',
    'Smart Classroom'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <p className="text-sm text-gray-500 mt-1">Refine your search results</p>
      </div>

      <div className="divide-y divide-gray-200">
        {/* School Structure Filter */}
        <div className="p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <Building2 className="h-4 w-4 text-indigo-500" />
            Structure
          </label>
          <select
            value={filters.structure}
            onChange={(e) => handleFilterChange('structure', e.target.value)}
            className="w-full rounded-lg border-gray-200 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Structures</option>
            {structures.map((structure) => (
              <option key={structure.value} value={structure.value}>
                {structure.label}
              </option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <MapPin className="h-4 w-4 text-indigo-500" />
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full rounded-lg border-gray-200 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* School Type Filter */}
        <div className="p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <Users className="h-4 w-4 text-indigo-500" />
            School Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full rounded-lg border-gray-200 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {schoolTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Band Filter */}
        <div className="p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <Users className="h-4 w-4 text-indigo-500" />
            Performance Band
          </label>
          <select
            value={filters.performanceBand}
            onChange={(e) => handleFilterChange('performanceBand', e.target.value)}
            className="w-full rounded-lg border-gray-200 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Performance Levels</option>
            {performanceBands.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </div>

        {/* Facilities Filter */}
        <div className="p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <BookOpen className="h-4 w-4 text-indigo-500" />
            Facilities
          </label>
          <div className="space-y-3">
            {facilityOptions.map((facility) => (
              <label key={facility} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.facilities.includes(facility)}
                  onChange={(e) => {
                    const newFacilities = e.target.checked
                      ? [...filters.facilities, facility]
                      : filters.facilities.filter((f) => f !== facility);
                    handleFilterChange('facilities', newFacilities);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        <button
          onClick={() =>
            onFilterChange({
              structure: '',
              state: '',
              type: '',
              performanceBand: '',
              facilities: [],
            })
          }
          className="w-full px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}