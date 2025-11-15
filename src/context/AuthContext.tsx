import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from './auth-context';

const AUTH_STORAGE_KEY = 'cp365.isAuthenticated';

const getStoredAuthState = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getStoredAuthState);

  const login = useCallback((_email: string, _password: string) => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

