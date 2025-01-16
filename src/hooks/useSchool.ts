import { useState, useEffect } from 'react';
import { School } from '../types/school';
import { schoolService } from '../services/schoolService';
import { filterSchools } from '../utils/filterSchools';

interface Filters {
  structure: string;
  state: string;
  type: string;
  performanceBand: string;
  facilities: string[];
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [filters, setFilters] = useState<Filters>({
    structure: '',
    state: '',
    type: '',
    performanceBand: '',
    facilities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(schools);
  console.log(filters)

  // Fetch all schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const data = await schoolService.getAllSchools();
        setSchools(data);
        setFilteredSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch schools');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = filterSchools(schools, filters);
    setFilteredSchools(filtered);
  }, [schools, filters]);

  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return {
    schools: filteredSchools,
    allSchools: schools,
    loading,
    error,
    filters,
    updateFilters
  };
}