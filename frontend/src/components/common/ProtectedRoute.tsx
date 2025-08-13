import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedGroups?: string[]; // e.g., ['doctor', 'nurse']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedGroups }) => {
  const auth = useAuth();
  const location = useLocation();
  // Get groups from the ID token. checks if the cognito:groups claim exists and is an array or string
  const rawGroups = auth.user?.profile?.['cognito:groups'];
  const groups: string[] = Array.isArray(rawGroups)
    ? rawGroups
    : typeof rawGroups === 'string'
      ? [rawGroups]
      : [];

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      const currentPath = location.pathname + location.search;
      auth.signinRedirect({ state: { returnUrl: currentPath } });
    }
  }, [auth.isLoading, auth.isAuthenticated, location, auth]);

  if (auth.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  // If allowedGroups is set, check if user is in any allowed group
  if (allowedGroups && !groups.some(g => allowedGroups.includes(g))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;