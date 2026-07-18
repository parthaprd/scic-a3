import api from './api';

export const authService = {
  register: async (registerData: any) => {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  },

  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};
