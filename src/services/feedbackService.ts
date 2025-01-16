import axios from 'axios';
import { CommunityFeedback } from '../types/feedback';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/';

export const feedbackService = {
  getAllFeedback: async (): Promise<CommunityFeedback[]> => {
    const { data } = await axios.get(`${API_BASE_URL}/feedback`);
    return data;
  },

  submitFeedback: async (feedback: Omit<CommunityFeedback, 'id' | 'date' | 'status'>): Promise<CommunityFeedback> => {
    const { data } = await axios.post(`${API_BASE_URL}/feedback`, feedback);
    return data;
  },

  updateFeedbackStatus: async (id: string, status: string, response?: string): Promise<CommunityFeedback> => {
    const { data } = await axios.put(`${API_BASE_URL}/feedback/${id}`, { status, response });
    return data;
  }
};