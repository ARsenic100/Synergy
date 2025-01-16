import axios from 'axios';
import { Policy } from '../types/policy';

const API_URL = 'https://synergy-backend-six.vercel.app/api';

export const policyService = {
  // Get all policies with optional filters
  getPolicies: async (params?: {
    category?: string;
    importance?: string;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await axios.get(`${API_URL}/policies`, {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get policy by ID
  getPolicy: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/policies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new policy
  createPolicy: async (data: Omit<Policy, 'id' | 'author' | 'approvedBy' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(`${API_URL}/policies`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update policy
  updatePolicy: async (id: string, data: Partial<Policy>) => {
    try {
      const response = await axios.patch(`${API_URL}/policies/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Archive policy
  archivePolicy: async (id: string) => {
    try {
      const response = await axios.patch(
        `${API_URL}/policies/${id}/archive`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};