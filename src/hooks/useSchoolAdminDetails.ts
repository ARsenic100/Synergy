import { useState, useEffect } from 'react';
import { SchoolDetail } from '../types/schoolDetail';
import { schoolDetailService } from '../services/schoolDetailService';

export function useSchoolAdminDetails(schoolId: string | undefined) {
  const [schoolData, setSchoolData] = useState<SchoolDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(schoolId)

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      if (!schoolId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await schoolDetailService.getSchoolDetails(schoolId);
        setSchoolData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch school details');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetails();
  }, [schoolId]);

  return { schoolData, loading, error };
}