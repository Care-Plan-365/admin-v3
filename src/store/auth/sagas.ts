import { call, put, takeLatest } from 'redux-saga/effects';
import { apiClient } from '../../api/client';
import { clearAuthSession, persistAuthSession } from '../../utils/authStorage';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  type LoginPayload,
} from './slice';

interface LoginResponse {
  token?: string;
}

const getMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};

function* handleLogin(action: { type: string; payload: LoginPayload }) {
  try {
    const response: LoginResponse = yield call(apiClient<LoginResponse>, '/v3/auth/login', {
      method: 'POST',
      body: action.payload,
      skipAuth: true,
    });

    const token = response?.token ?? null;
    yield call(persistAuthSession, { token, isAuthenticated: true });
    yield put(loginSuccess({ token }));
  } catch (error) {
    yield call(clearAuthSession);
    yield put(loginFailure(getMessage(error)));
  }
}

function* handleLogout() {
  try {
    yield call(apiClient, '/v3/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    yield call(clearAuthSession);
    yield put(logoutFailure(getMessage(error)));
    return;
  }

  yield call(clearAuthSession);
  yield put(logoutSuccess());
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}
