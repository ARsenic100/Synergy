import axios from 'axios';
import { Achievement, NewAchievement } from '../types/achievement';

const API_URL = 'https://synergy-backend-six.vercel.app/api/achievements';

// Get the Bearer token dynamically (e.g., from localStorage)
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
};

export const achievementService = {
  // Get achievements for a specific user/school
  getAchievements: async (userId: string) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Award new achievement
  awardAchievement: async (userId: string, achievement: NewAchievement) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/${userId}`, achievement, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Share achievement
  shareAchievement: async (achievementId: string) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/${achievementId}/share`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
