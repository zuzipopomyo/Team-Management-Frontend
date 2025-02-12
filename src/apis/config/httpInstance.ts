import axios, { AxiosRequestConfig } from 'axios';

// Create an axios instance
export const httpInstance = axios.create({
  baseURL: 'http://localhost:5500/v1'
});

// Add a request interceptor to attach the token
httpInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Debugging: Log the token

    // Ensure headers exist, otherwise initialize it as an empty object
    if (config.headers) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      // If headers are undefined, initialize it as an empty object
      config.headers = { Authorization: `Bearer ${token}` };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
