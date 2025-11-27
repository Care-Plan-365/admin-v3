const AUTH_STATE_KEY = 'auth:isAuthenticated';
const AUTH_TOKEN_KEY = 'auth:token';

interface StoredAuth {
  token: string | null;
  isAuthenticated: boolean;
}

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getStoredAuth = (): StoredAuth => {
  if (!canUseStorage()) {
    return { token: null, isAuthenticated: false };
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
  const isAuthenticated = window.localStorage.getItem(AUTH_STATE_KEY) === 'true';

  return { token, isAuthenticated };
};

export const getStoredToken = (): string | null => {
  if (!canUseStorage()) {
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const persistAuthSession = (payload: { token: string | null; isAuthenticated: boolean }) => {
  if (!canUseStorage()) {
    return;
  }

  const { token, isAuthenticated } = payload;

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  window.localStorage.setItem(AUTH_STATE_KEY, isAuthenticated ? 'true' : 'false');
};

export const clearAuthSession = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_STATE_KEY);
};
