import axios from 'axios';
import { Guide } from '../types/support';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api';

export const guideService = {
  async getAllGuides(): Promise<Guide[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/guides`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw error;
    }
  },

  async getGuideById(id: string): Promise<Guide> {
    try {
      const response = await axios.get(`${API_BASE_URL}/guides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guide:', error);
      throw error;
    }
  },

  async createGuide(guide: Omit<Guide, 'id'>): Promise<Guide> {
    try {
      const response = await axios.post(`${API_BASE_URL}/guides`, guide);
      return response.data;
    } catch (error) {
      console.error('Error creating guide:', error);
      throw error;
    }
  },

  async updateGuide(id: string, guide: Partial<Guide>): Promise<Guide> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/guides/${id}`, guide);
      return response.data;
    } catch (error) {
      console.error('Error updating guide:', error);
      throw error;
    }
  },

  async deleteGuide(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/guides/${id}`);
    } catch (error) {
      console.error('Error deleting guide:', error);
      throw error;
    }
  },

  async updateStepStatus(guideId: string, stepId: string, status: string): Promise<Guide> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/guides/step/status`, {
        guideId,
        stepId,
        status
      });
      return response.data;
    } catch (error) {
      console.error('Error updating step status:', error);
      throw error;
    }
  },

  async updateCheckpoint(guideId: string, stepId: string, checkpointId: string, completed: boolean): Promise<Guide> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/guides/step/checkpoint`, {
        guideId,
        stepId,
        checkpointId,
        completed
      });
      return response.data;
    } catch (error) {
      console.error('Error updating checkpoint:', error);
      throw error;
    }
  }
};