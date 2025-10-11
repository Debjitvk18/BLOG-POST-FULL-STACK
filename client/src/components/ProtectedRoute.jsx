import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/api';

export const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
