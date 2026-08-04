import axios from 'axios';

let apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
// Ensure the URL always ends with /api/v1
if (apiBaseUrl && !apiBaseUrl.endsWith('/api/v1')) {
  apiBaseUrl = apiBaseUrl.endsWith('/') ? `${apiBaseUrl}api/v1` : `${apiBaseUrl}/api/v1`;
}

// Create a configured axios instance
const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // For HTTP-only cookies (refresh token)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
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

// Response Interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is 401 Unauthorized, it means token expired or is invalid
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Prevent redirecting if we are already on login or register pages
      if (
        window.location.pathname !== '/login' && 
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
