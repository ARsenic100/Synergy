import axios from 'axios';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
};

export const schoolDetailService = {
  async getSchoolDetails(schoolId: string) {
    try {
      const token = getAuthToken(); // Retrieve the token
      const response = await axios.get(`${API_BASE_URL}/school/details/search/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching school details:', error);
      throw error;
    }
  }
};
