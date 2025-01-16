import axios from 'axios';
import { Discussion, NewDiscussion, Reply } from '../types/discussion';

const API_URL = 'https://synergy-backend-six.vercel.app/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

export const discussionService = {
  getDiscussions: async (params: { page?: number; limit?: number; category?: string; search?: string }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/discussions`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDiscussion: async (id: string) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/discussions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDiscussion: async (discussion: NewDiscussion) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/discussions`, discussion, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addReply: async (discussionId: string, content: string) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/discussions/${discussionId}/replies`, { content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleLike: async (discussionId: string) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/discussions/${discussionId}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
