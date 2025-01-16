import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/comparative-progress';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
};

export function useComparativeAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async (
    state: string,
    type: 'district' | 'school',
    entities: string[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();

      const response = await axios.get(`${API_BASE_URL}/analysis`, {
        params: { state, type, entities },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchAnalysis,
  };
}
