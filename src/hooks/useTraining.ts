import { useState, useEffect } from 'react';
import axios from 'axios';
import { Training } from '../types/support';
import { TopicStatus } from '../components/support/training/TopicProgress';

const API_URL = 'https://synergy-backend-six.vercel.app/api/training';

export function useTraining() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(API_URL);
      setTrainings(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trainings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const updateTrainingProgress = async (
    trainingId: string,
    topicId: string,
    status: TopicStatus
  ) => {
    try {
      const response = await axios.patch(`${API_URL}/${trainingId}/topics/${topicId}`, {
        status
      });

      // Update local state
      setTrainings(trainings.map(training =>
        training.id === trainingId ? response.data : training
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
    }
  };

  const createTraining = async (data: Partial<Training>) => {
    try {
      const response = await axios.post(API_URL, data);
      setTrainings([...trainings, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create training');
      throw err;
    }
  };

  const updateTraining = async (trainingId: string, data: Partial<Training>) => {
    try {
      const response = await axios.patch(`${API_URL}/${trainingId}`, data);

      // Update local state
      setTrainings(trainings.map(training =>
        training.id === trainingId ? { ...training, ...response.data } : training
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update training');
      throw err;
    }
  };

  return {
    trainings,
    loading,
    error,
    updateTrainingProgress,
    createTraining,
    updateTraining,
    refreshTrainings: fetchTrainings,
  };
}
