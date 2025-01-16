import axios from 'axios';
import { StateProgress, KeyMetrics, TransitionTrend, Insight } from '../types/progress';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/progress';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace this with your token retrieval logic
};

export const progressService = {
  async getStateProgress(): Promise<StateProgress[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/state-progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching state progress:', error);
      throw error;
    }
  },

  async getKeyMetrics(): Promise<KeyMetrics> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/key-metrics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching key metrics:', error);
      throw error;
    }
  },

  async getTransitionTrends(): Promise<TransitionTrend[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/transition-trends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transition trends:', error);
      throw error;
    }
  },

  async getInsights(): Promise<Insight[]> {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/insights`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  },
};
