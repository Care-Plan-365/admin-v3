import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getStoredAuth } from '../../utils/authStorage';

const storedAuth = getStoredAuth();

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  token: storedAuth.token,
  isAuthenticated: storedAuth.isAuthenticated,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string | null } | undefined>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload?.token ?? null;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
    restoreSession(state, action: PayloadAction<{ token: string | null; isAuthenticated: boolean }>) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearAuthError,
  restoreSession,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
