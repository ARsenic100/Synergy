import axios from 'axios';
import { RegionalMetrics, StateComparison, RegionalChallenge, RegionalGoal } from '../types/progress';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/regional-progress';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your actual token retrieval logic
};

export const regionalProgressService = {
  async getRegionalMetrics(state: string): Promise<RegionalMetrics> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/metrics/${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching regional metrics:', error);
      throw error;
    }
  },

  async getStateComparison(states: string[]): Promise<StateComparison[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/comparison`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { states: states.join(',') },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching state comparison:', error);
      throw error;
    }
  },

  async getRegionalChallenges(state: string): Promise<RegionalChallenge[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/challenges/${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching regional challenges:', error);
      throw error;
    }
  },

  async getRegionalGoals(state: string): Promise<RegionalGoal[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/goals/${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching regional goals:', error);
      throw error;
    }
  },

  async addRegionalGoal(goal: Omit<RegionalGoal, 'id'>): Promise<RegionalGoal> {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_BASE_URL}/goals`, goal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding regional goal:', error);
      throw error;
    }
  },

  async updateGoalProgress(
    goalId: string,
    progress: number,
    milestones?: { title: string; completed: boolean }[]
  ): Promise<RegionalGoal> {
    try {
      const token = getAuthToken();
      const response = await axios.patch(
        `${API_BASE_URL}/goals/${goalId}`,
        {
          progress,
          milestones,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating goal progress:', error);
      throw error;
    }
  },
};
