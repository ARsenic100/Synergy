import axios from 'axios';
import { TrainingModule } from '../types/support';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api';

export const trainingService = {
  async getAllTrainings(): Promise<TrainingModule[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/training`);
      return response.data;
    } catch (error) {
      console.error('Error fetching training modules:', error);
      throw error;
    }
  },

  async getTrainingById(id: string): Promise<TrainingModule> {
    try {
      const response = await axios.get(`${API_BASE_URL}/training/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching training module:', error);
      throw error;
    }
  },

  async createTraining(training: Omit<TrainingModule, 'id'>): Promise<TrainingModule> {
    try {
      const response = await axios.post(`${API_BASE_URL}/training`, training);
      return response.data;
    } catch (error) {
      console.error('Error creating training module:', error);
      throw error;
    }
  },

  async updateTraining(id: string, training: Partial<TrainingModule>): Promise<TrainingModule> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/training/${id}`, training);
      return response.data;
    } catch (error) {
      console.error('Error updating training module:', error);
      throw error;
    }
  },

  async deleteTraining(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/training/${id}`);
    } catch (error) {
      console.error('Error deleting training module:', error);
      throw error;
    }
  },

  async updateCompletionRate(trainingId: string, completionRate: number): Promise<TrainingModule> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/training/completion`, {
        trainingId,
        completionRate
      });
      return response.data;
    } catch (error) {
      console.error('Error updating completion rate:', error);
      throw error;
    }
  }
};