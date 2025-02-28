import useUserStore from '@/store/userStore';
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout/AppLayout';

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    //TODO: verify user token for authetication
    if (!isAuthenticated) {
      logout();
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedRoutes;
