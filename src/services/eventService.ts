import axios from 'axios';

const API_URL = 'https://synergy-backend-six.vercel.app/api';

export const eventService = {
  // Get all events with optional filters
  getEvents: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
    search?: string;
  }) => {
    try {
      const response = await axios.get(`${API_URL}/events`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new event
  createEvent: async (data: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    type: 'online' | 'in-person' | 'hybrid';
    category: string;
    maxAttendees?: number;
    registrationDeadline: string;
    meetingLink?: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/events`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register for an event
  registerForEvent: async (eventId: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/register`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel registration
  cancelRegistration: async (eventId: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/events/${eventId}/register`,
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