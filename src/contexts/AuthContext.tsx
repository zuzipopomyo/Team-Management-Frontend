import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  // const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userInfo: any) => {
    if (userInfo) {
      setIsAuthenticated(true);
      setUser(userInfo);
      // navigate('/home');
    } else {
      setIsAuthenticated(false);
      setUser(null);
      // navigate('/login');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // navigate('/login');
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout } as any}>{children}</AuthContext.Provider>;
};
