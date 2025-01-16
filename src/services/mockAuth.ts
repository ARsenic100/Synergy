import api from "./api"

// Login API
interface Credentials {
  username: string;
  password: string;
}

interface FormData {
  username: string;
  password: string;
  email: string;
}

interface ApiResponse {
  data: any;
}

export const login = async (credentials: Credentials): Promise<ApiResponse> => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

// Register API
interface RegisterFormData {
  username: string;
  password: string;
  email: string;
}

export const register = async (formData: RegisterFormData): Promise<ApiResponse> => {
  const { data } = await api.post('/auth/register', formData);
  return data;
};
