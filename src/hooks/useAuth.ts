import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { loginRequest, logoutRequest, type LoginPayload } from '../store/auth/slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const login = useCallback(
    (email: string, password: string) => {
      dispatch(loginRequest({ email, password } satisfies LoginPayload));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return {
    ...authState,
    login,
    logout,
  };
};
