import React from 'react';
import { School } from '../../types/school';
import { SchoolCard } from './SchoolCard';
import { Pagination } from '../common/Pagination';

interface SchoolListProps {
  schools: School[];
  loading: boolean;
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onViewDetails: (school: School) => void;
}

export function SchoolList({
  schools,
  loading,
  currentPage,
  totalResults,
  onPageChange,
  onViewDetails,
}: SchoolListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-6 shadow-md animate-pulse h-48"
          />
        ))}
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <p className="text-gray-600">
          No schools found matching your criteria.
        </p>
      </div>
    );
  }

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSchools = schools.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {currentSchools.map((school) => (
        <SchoolCard
          key={school.id}
          school={school}
          onViewDetails={() => onViewDetails(school)}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalItems={totalResults}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
