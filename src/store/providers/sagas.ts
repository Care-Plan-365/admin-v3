import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../api/client";
import { toast } from "vyrn";
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
//
interface ProvidersApiResponse {
    data?: {
        providers?: unknown;
    };
}

const buildProvidersPath = (status?: string) => {
    if (!status) {
        return "/admin/providers";
    }

    const params = new URLSearchParams({ status });
    return `/admin/providers?${params.toString()}`;
};

function* fetchProviders(action: { payload?: { status?: string } }) {
    try {
        const status = action?.payload?.status;
        const response: ProvidersApiResponse = yield call(
            apiClient<ProvidersApiResponse>,
            buildProvidersPath(status)
        );
        // const providers = normalizeProvidersPayload(response);
        const providersPayload = response?.data?.providers;
        const providers = normalizeProvidersPayload(providersPayload);

        yield put(fetchProvidersSuccess(providers));
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
        toast.success("Provider approved.");
        yield put(approveProviderSuccess({ id }));
    } catch (error) {
        const message = getMessage(error);
        toast.error(`Unable to approve provider. ${message}`);
        yield put(approveProviderFailure({ id, error: message }));
    }
}

function* rejectProvider(action: { type: string; payload: { id: string } }) {
    const { id } = action.payload;
    try {
        yield call(apiClient, `/admin/providers/${id}/reject`, {
            method: "POST",
        });
        toast.success("Provider rejected.");
        yield put(rejectProviderSuccess({ id }));
    } catch (error) {
        const message = getMessage(error);
        toast.error(`Unable to reject provider. ${message}`);
        yield put(rejectProviderFailure({ id, error: message }));
    }
}

export function* providersSaga() {
    yield takeLatest(fetchProvidersRequest.match, fetchProviders);
    yield takeEvery(approveProviderRequest.match, approveProvider);
    yield takeEvery(rejectProviderRequest.match, rejectProvider);
}
