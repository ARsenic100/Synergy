import { useState, useEffect } from 'react';
import { regionalProgressService } from '../services/regionalProgressService';
import { RegionalMetrics, StateComparison, RegionalChallenge, RegionalGoal } from '../types/progress';

export function useRegionalProgress(state: string) {
  const [metrics, setMetrics] = useState<RegionalMetrics | null>(null);
  const [stateComparison, setStateComparison] = useState<StateComparison[]>([]);
  const [challenges, setChallenges] = useState<RegionalChallenge[]>([]);
  const [goals, setGoals] = useState<RegionalGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [metricsData, challengesData, goalsData] = await Promise.all([
          regionalProgressService.getRegionalMetrics(state),
          regionalProgressService.getRegionalChallenges(state),
          regionalProgressService.getRegionalGoals(state)
        ]);

        setMetrics(metricsData);
        setChallenges(challengesData);
        setGoals(goalsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchData();
    }
  }, [state]);

  const fetchStateComparison = async (states: string[]) => {
    try {
      const data = await regionalProgressService.getStateComparison(states);
      setStateComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const addGoal = async (goal: Omit<RegionalGoal, 'id'>) => {
    try {
      const newGoal = await regionalProgressService.addRegionalGoal(goal);
      setGoals(prev => [...prev, newGoal]);
      return newGoal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateGoal = async (goalId: string, progress: number, milestones?: { title: string; completed: boolean }[]) => {
    try {
      const updatedGoal = await regionalProgressService.updateGoalProgress(goalId, progress, milestones);
      setGoals(prev => prev.map(g => g.id === goalId ? updatedGoal : g));
      return updatedGoal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    metrics,
    stateComparison,
    challenges,
    goals,
    loading,
    error,
    fetchStateComparison,
    addGoal,
    updateGoal
  };
}