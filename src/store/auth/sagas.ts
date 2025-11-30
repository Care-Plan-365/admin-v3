import { call, put, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../api/client";
import { clearAuthSession, persistAuthSession } from "../../utils/authStorage";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutFailure,
    logoutRequest,
    logoutSuccess,
    type LoginPayload,
} from "./slice";

type LoginResponse = Record<string, unknown>;

const extractToken = (payload: LoginResponse | undefined): string | null => {
    if (!payload) {
        return null;
    }

    const search = (value: unknown, tokenHint = false): string | null => {
        if (!value) {
            return null;
        }

        if (typeof value === "string") {
            if (tokenHint) {
                const trimmed = value.trim();
                return trimmed || null;
            }
            return null;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                const match = search(item, tokenHint);
                if (match) {
                    return match;
                }
            }
            return null;
        }

        if (typeof value === "object" && value !== null) {
            for (const [key, nested] of Object.entries(
                value as Record<string, unknown>
            )) {
                const keyHasToken = tokenHint || key.toLowerCase().includes("token");
                const match = search(nested, keyHasToken);
                if (match) {
                    return match;
                }
            }
        }

        return null;
    };

    return search(payload, false);
};

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Something went wrong. Please try again.";
};

function* handleLogin(action: { type: string; payload: LoginPayload }) {
    try {
        const response: LoginResponse = yield call(
            apiClient<LoginResponse>,
            "/auth/login",
            {
                method: "POST",
                body: action.payload,
                skipAuth: true,
            }
        );

        const token = extractToken(response);
        if (!token) {
            throw new Error("Authentication token was not returned by the server.");
        }
        yield call(persistAuthSession, { token, isAuthenticated: true });
        yield put(loginSuccess({ token }));
    } catch (error) {
        yield call(clearAuthSession);
        yield put(loginFailure(getMessage(error)));
    }
}

function* handleLogout() {
    try {
        yield call(apiClient, "/auth/logout", {
            method: "POST",
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
