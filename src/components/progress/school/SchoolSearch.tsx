import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { School } from '../../../types/school';
import { useSchoolSearch } from '../../../hooks/useSchoolSearch';

interface SchoolSearchProps {
  onSchoolSelect: (school: School) => void;
}

export function SchoolSearch({ onSchoolSelect }: SchoolSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { schools, loading } = useSchoolSearch(searchTerm);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a school..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {searchTerm && schools.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() => {
                onSchoolSelect(school);
                setSearchTerm('');
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              <div className="font-medium">{school.name}</div>
              <div className="text-sm text-gray-500">
                {school.district}, {school.state}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}