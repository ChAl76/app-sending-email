import { api } from './axios.config';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.get<User>('users/current/');
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<void> => {
    await api.post('users/', credentials);
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('users/current/');
    return response.data;
  },
};
