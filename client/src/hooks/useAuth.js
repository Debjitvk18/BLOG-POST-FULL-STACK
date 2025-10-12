import { useState, useEffect } from 'react';
import { getAuthToken } from '../utils/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const checkAuth = () => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  };

  return {
    isAuthenticated,
    isLoading,
    checkAuth,
  };
};
