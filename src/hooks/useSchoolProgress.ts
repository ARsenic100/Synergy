import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/school-progress';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace this with your actual token retrieval logic
};

export function useSchoolProgress() {
  const [progress, setProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchoolProgress = useCallback(async (schoolId: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();

      const [progressRes, activityRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/${schoolId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${API_BASE_URL}/${schoolId}/activity`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setProgress(progressRes.data);
      setRecentActivity(activityRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    progress,
    recentActivity,
    loading,
    error,
    fetchSchoolProgress,
  };
}
