import axios from 'axios';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/reports';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
};

export const reportsService = {
  async generateReport(type: string, customMetrics?: any) {
    try {
      const token = getAuthToken();

      const response = await axios.post(
        `${API_BASE_URL}/generate`,
        { type, customMetrics },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  },

  async getReports() {
    try {
      const token = getAuthToken();

      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  async downloadReport(id: string) {
    try {
      const token = getAuthToken();

      const response = await axios.get(`${API_BASE_URL}/download/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // For file download
      });

      return response.data;
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  },


  async deleteReport(id: string) {
    try {
      const token = getAuthToken();
  
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  },

  async createCustomReport(data: {
    title: string;
    description: string;
    type: string;
    metrics: string[];
  }) {
    try {
      const token = getAuthToken();

      const response = await axios.post(`${API_BASE_URL}/custom`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating custom report:', error);
      throw error;
    }
  },
};
