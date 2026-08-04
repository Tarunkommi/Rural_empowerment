import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // User is logged in but doesn't have required role (e.g. USER trying to access ADMIN)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-center px-4">
        <h1 className="text-4xl font-bold text-error mb-4">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">You do not have permission to access this page.</p>
        <button 
          onClick={() => window.history.back()}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-[#0c3c66]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
}
