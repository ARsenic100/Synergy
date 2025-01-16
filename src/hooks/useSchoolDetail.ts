import { useState, useEffect } from 'react';
import { schoolDetailService } from '../services/schoolDetailService';

export function useSchoolDetail(schoolId: string) {
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        const data = await schoolDetailService.getSchoolDetails(schoolId);
        setSchool(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch school details');
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchool();
    }
  }, [schoolId]);

  return { school, loading, error };
}