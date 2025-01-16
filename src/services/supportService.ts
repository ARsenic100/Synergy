import axios from 'axios';
import { 
  SupportTicket, 
  CreateTicketData, 
  UpdateTicketData, 
  CreateCommentData 
} from '../types/support';

const API_URL = 'https://synergy-backend-six.vercel.app/api';

export const supportService = {
  // Get all tickets
  getTickets: async () => {
    try {
      const response = await axios.get(`${API_URL}/support/tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new ticket
  createTicket: async (data: CreateTicketData) => {
    try {
      const requestData = {
        subject: data.subject,
        description: data.description,
        category: data.category,
        priority: data.priority,
      };

      if (data.attachments && data.attachments.length > 0) {
        const attachmentsBase64 = await Promise.all(
          data.attachments.map((file) => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
            });
          })
        );
        requestData.attachments = attachmentsBase64;
      }

      const response = await axios.post(`${API_URL}/support/tickets`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update ticket
  updateTicket: async (ticketId: string, data: UpdateTicketData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/support/tickets/${ticketId}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add comment to ticket
  addComment: async (ticketId: string, data: CreateCommentData) => {
    try {
      const requestData = {
        content: data.content
      };

      const response = await axios.post(
        `${API_URL}/support/tickets/${ticketId}/comments`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
