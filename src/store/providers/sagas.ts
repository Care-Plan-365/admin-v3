import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../api/client";
import {
    approveProviderFailure,
    approveProviderRequest,
    approveProviderSuccess,
    fetchProvidersFailure,
    fetchProvidersRequest,
    fetchProvidersSuccess,
    rejectProviderFailure,
    rejectProviderRequest,
    rejectProviderSuccess,
} from "./slice";
import type { Provider } from "../../types/provider";

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Unable to complete the request.";
};

function* fetchProviders() {
    try {
        const response: Provider[] = yield call(
            apiClient<Provider[]>,
            "/admin/providers"
        );
        yield put(fetchProvidersSuccess(response));
    } catch (error) {
        yield put(fetchProvidersFailure(getMessage(error)));
    }
}

function* approveProvider(action: { type: string; payload: { id: string } }) {
    const { id } = action.payload;
    try {
        yield call(apiClient, `/admin/providers/${id}/approve`, {
            method: "POST",
        });
        yield put(approveProviderSuccess({ id }));
    } catch (error) {
        yield put(approveProviderFailure({ id, error: getMessage(error) }));
    }
}

function* rejectProvider(action: { type: string; payload: { id: string } }) {
    const { id } = action.payload;
    try {
        yield call(apiClient, `/admin/providers/${id}/reject`, {
            method: "POST",
        });
        yield put(rejectProviderSuccess({ id }));
    } catch (error) {
        yield put(rejectProviderFailure({ id, error: getMessage(error) }));
    }
}

export function* providersSaga() {
    yield takeLatest(fetchProvidersRequest.type, fetchProviders);
    yield takeEvery(approveProviderRequest.type, approveProvider);
    yield takeEvery(rejectProviderRequest.type, rejectProvider);
}
