
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  requireAdmin = false
}) => {
  const { user, isLoading } = useAuth();
  
  // If authentication is still loading, we could show a loading spinner
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not authenticated and the route requires authentication
  if (requireAuth && !user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If route requires admin role but user is not an admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated but the route is for non-authenticated users only (like sign-in page)
  if (!requireAuth && user) {
    return <Navigate to="/video" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
