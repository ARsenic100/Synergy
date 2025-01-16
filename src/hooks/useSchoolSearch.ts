import { useState, useEffect } from 'react';
import { School, SchoolFilters } from '../types/school';
import { schoolService } from '../services/schoolService';

export function useSchoolSearch() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SchoolFilters>({
    category: '',
    state: '',
    gradeLevels: [],
    type: '',
    performanceBand: '',
    facilities: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        setError(null);
        const { schools, total } = await schoolService.searchSchools(
          searchTerm,
          filters,
          currentPage
        );
        setSchools(schools);
        setTotalResults(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching schools');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSchools, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filters, currentPage]);

  return {
    schools,
    loading,
    error,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
    totalResults,
    currentPage,
    setCurrentPage
  };
}