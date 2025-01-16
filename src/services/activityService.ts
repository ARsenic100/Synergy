import axios from 'axios';

const API_URL = 'https://synergy-backend-six.vercel.app/api/activities';

export const activityService = {
  trackActivity: async (data: {
    type: string;
    action: string;
    title: string;
    description?: string;
    metadata?: any;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRecentActivities: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/recent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};