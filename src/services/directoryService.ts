import axios from 'axios';
import { ForumPost, Survey, PolicyUpdate } from '../types/engagement';
import { Stakeholder, ConnectionRequest } from '../types/directory';

const API_URL = 'https://synergy-backend-six.vercel.app/api';

// Get the Bearer token dynamically (e.g., from local storage or a cookie)
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
};

// Directory Service Functions
export const directoryService = {
  // Get all stakeholders with optional filters
  getStakeholders: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    location?: string;
    expertise?: string;
  }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/directory`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new stakeholder
  createStakeholder: async (data: Omit<Stakeholder, 'id' | 'connections'>) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/directory`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Request connection
  requestConnection: async (stakeholderId: string) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/directory/${stakeholderId}/connect`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update connection status
  updateConnectionStatus: async (
    stakeholderId: string,
    userId: string,
    status: 'accepted' | 'rejected'
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.patch(
        `${API_URL}/directory/${stakeholderId}/connections/${userId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
