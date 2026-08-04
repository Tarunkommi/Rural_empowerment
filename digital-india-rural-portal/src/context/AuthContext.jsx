import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = async () => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        // Verify token by fetching user profile
        const response = await authService.getCurrentUser();
        
        if (response.success) {
          setUser(response.data.user);
          setToken(storedToken);
          setIsAuthenticated(true);
          // Sync local storage with fresh DB data
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      } catch (error) {
        // Error is handled globally by axiosConfig interceptor (401 clears storage)
        console.error("Authentication failed during startup:", error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthentication();
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

  const updateUserContext = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const refreshProfile = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success) {
        updateUserContext(response.data.user);
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login: loginContext,
        logout: logoutContext,
        updateProfile: updateUserContext,
        refreshProfile,
        checkAuthentication,
        loginContext,
        logoutContext,
        updateUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
