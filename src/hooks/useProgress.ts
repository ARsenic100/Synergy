import { useState, useEffect } from 'react';
import { progressService } from '../services/progressService';
import { 
  StateProgress, 
  KeyMetrics, 
  TransitionTrend,
  Insight 
} from '../types/progress';

export function useProgress() {
  const [stateProgress, setStateProgress] = useState<StateProgress[]>([]);
  const [keyMetrics, setKeyMetrics] = useState<KeyMetrics | null>(null);
  const [transitionTrends, setTransitionTrends] = useState<TransitionTrend[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          progressData,
          metricsData,
          trendsData,
          insightsData
        ] = await Promise.all([
          progressService.getStateProgress(),
          progressService.getKeyMetrics(),
          progressService.getTransitionTrends(),
          progressService.getInsights()
        ]);

        setStateProgress(progressData);
        setKeyMetrics(metricsData);
        setTransitionTrends(trendsData);
        setInsights(insightsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stateProgress,
    keyMetrics,
    transitionTrends,
    insights,
    loading,
    error
  };
}