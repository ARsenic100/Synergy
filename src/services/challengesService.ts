import axios from 'axios';
import { Challenge, ChallengeMetrics } from '../types/challenges';

const API_URL = 'https://synergy-backend-six.vercel.app/api/challenges';

export const challengesService = {
  async getChallenges(): Promise<{ challenges: Challenge[]; metrics: ChallengeMetrics }> {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async createChallenge(data: Omit<Challenge, '_id'>): Promise<Challenge> {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  async updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge> {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  },

  async deleteChallenge(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async analyzeSchoolData(): Promise<{ challenges: Challenge[]; metrics: ChallengeMetrics }> {
    const response = await axios.post(`${API_URL}/analyze`);
    return response.data;
  }
};