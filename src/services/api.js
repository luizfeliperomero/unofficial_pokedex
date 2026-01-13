import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://localhost:8092/api/v1',
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    const isAuthRoute = config.url?.startsWith('/auth');

    if (!isAuthRoute) {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
