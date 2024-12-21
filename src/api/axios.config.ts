import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления Basic Auth
api.interceptors.request.use((config) => {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    const { username, password } = JSON.parse(credentials);
    config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  }
  return config;
});

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('credentials');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Функция для проверки актуальности токена
export const validateAuth = async () => {
  try {
    await api.get('users/current/');
    return true;
  } catch {
    return false;
  }
};
