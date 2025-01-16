import axios from 'axios';

const api = axios.create({
  baseURL: 'https://synergy-backend-six.vercel.app/api'
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: async (formData: FormData) => {
    const response = await api.post('/auth/register', formData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: { name: string; email: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  resetPassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/reset-password', data);
    return response.data;
  },

  getPendingApprovals: async () => {
    const response = await api.get('/auth/pending-approvals');
    return response.data;
  },

  approveUser: async (userId: string) => {
    const response = await api.put(`/auth/approve/${userId}`);
    return response.data;
  },

  rejectUser: async (userId: string) => {
    const response = await api.delete(`/auth/reject/${userId}`);
    return response.data;
  }
};

export default api;