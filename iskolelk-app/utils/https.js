import axios from 'axios';

const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
