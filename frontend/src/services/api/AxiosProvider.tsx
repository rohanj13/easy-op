import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import api from './api'; // your configured axios instance

const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    const setAuthHeader = () => {
      if (auth?.isAuthenticated && auth?.user?.id_token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${auth.user.id_token}`;
      }
    };

    setAuthHeader();
  }, [auth.isAuthenticated, auth.user]);

  return <>{children}</>;
};

export default AxiosProvider;