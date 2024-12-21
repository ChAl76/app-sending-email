import { api } from './axios.config';
import { Email, EmailsResponse, CreateEmailDto } from '../types/auth.types';

export const emailApi = {
  getEmails: async (
    page: number = 0,
    rowsPerPage: number = 10
  ): Promise<EmailsResponse> => {
    const response = await api.get<EmailsResponse>(
      `emails/?offset=${page}&limit=${rowsPerPage}`
    );
    return response.data;
  },

  sendEmail: async (emailData: CreateEmailDto): Promise<Email> => {
    const response = await api.post<Email>('emails/', emailData);
    return response.data;
  },

  // Дополнительные методы, если потребуются
  getEmailById: async (id: number): Promise<Email> => {
    const response = await api.get<Email>(`emails/${id}/`);
    return response.data;
  },

  deleteEmail: async (id: number): Promise<void> => {
    await api.delete(`emails/${id}/`);
  },
};
