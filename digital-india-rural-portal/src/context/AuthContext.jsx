import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // Verify token by fetching user profile
          const response = await authService.getCurrentUser();
          
          if (response.success) {
            setUser(response.data);
            setToken(storedToken);
            setIsAuthenticated(true);
            // Sync local storage with fresh DB data
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } catch (error) {
          // Error is handled globally by axiosConfig interceptor (401 clears storage)
          console.error("Authentication failed during startup:", error.message);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const loginContext = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);

    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutContext = () => {
    authService.logout(); // Optional backend call
    
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        loginContext,
        logoutContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
