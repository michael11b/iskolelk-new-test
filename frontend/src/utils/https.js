import axios from 'axios';
import { getCookie } from '@/actions/auth.js';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// Add a request interceptor to include Authorization token
http.interceptors.request.use(function (config) {
  // const token = localStorage.getItem('authToken');
  const token = getCookie('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default http;
