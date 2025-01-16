import axios from 'axios';

const API_URL = 'https://synergy-backend-six.vercel.app/api/resources';

interface ResourceData {
  title: string;
  description: string;
  type: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  tags: string[];
}

export const resourceService = {
  // Get all resources with optional filters
  getResources: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    type?: string;
    search?: string;
  }) => {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new resource
  createResource: async (data: ResourceData) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'application/json', // Changed from multipart/form-data
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Download resource
  downloadResource: async (id: string) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/download`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Toggle like on resource
  toggleLike: async (id: string) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Record resource view
  recordView: async (id: string) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/view`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};