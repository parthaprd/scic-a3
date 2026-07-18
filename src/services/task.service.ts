import api from './api';
import { ITask } from '../types';

export const taskService = {
  getTasks: async (filters: any = {}) => {
    const params = new URLSearchParams();
    
    // Append filters dynamically
    Object.keys(filters).forEach((key) => {
      const val = filters[key];
      if (val !== undefined && val !== null && val !== '') {
        if (Array.isArray(val)) {
          val.forEach((v) => params.append(key, v));
        } else {
          params.append(key, String(val));
        }
      }
    });

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },

  getMyTasks: async (filters: any = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/tasks/my?${params.toString()}`);
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: Omit<ITask, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, taskData: Partial<ITask>) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
