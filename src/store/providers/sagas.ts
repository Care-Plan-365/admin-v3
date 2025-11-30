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
import { normalizeEntityArray } from "../../utils/normalizeEntityArray";

const providerArrayKeys = ["providers", "data", "items", "results"];

const normalizeProvidersPayload = (payload: unknown): Provider[] => {
    return normalizeEntityArray<Provider>(
        payload,
        providerArrayKeys,
        "Received malformed providers payload."
    );
};

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Unable to complete the request.";
};

interface ProvidersApiResponse {
    data?: {
        providers?: unknown;
    };
}

function* fetchProviders() {
    try {
        const response: ProvidersApiResponse = yield call(
            apiClient<ProvidersApiResponse>,
            "/admin/providers"
        );
        // const providers = normalizeProvidersPayload(response);
        const providersPayload = response?.data?.providers;
        const providers = normalizeProvidersPayload(providersPayload);

        yield put(fetchProvidersSuccess(providers));
        console.log(response.data?.providers, "response");
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
