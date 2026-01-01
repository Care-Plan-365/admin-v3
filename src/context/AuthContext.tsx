import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from './auth-context';

const AUTH_STORAGE_KEY = 'auth:isAuthenticated';

const getInitialAuthState = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const login = (email: string, password: string) => {
    void email;
    void password;
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

