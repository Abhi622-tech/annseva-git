// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Replace with your backend API URL
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        // Redirect to Unauthorized page if access is denied
        window.location.href = '/unauthorized'; // Use window.location.href for immediate redirect
      } else if (error.response.status === 401) {
        // Redirect to Login page if unauthorized
        window.location.href = '/login'; // Use window.location.href for immediate redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;