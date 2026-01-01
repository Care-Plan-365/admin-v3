import { call, put, takeLatest } from "redux-saga/effects";
import { ApiError, apiClient } from "../../api/client";
import type { Patient } from "../../types/patient";
import {
    fetchPatientsFailure,
    fetchPatientsRequest,
    fetchPatientsSuccess,
} from "./slice";
import { clearAuthSession } from "../../utils/authStorage";
import { logoutSuccess } from "../auth/slice";
import { normalizeEntityArray } from "../../utils/normalizeEntityArray";

const patientArrayKeys = ["patients", "data", "items", "results"];

// const normalizePatientsPayload = (payload: unknown): Patient[] => {
const normalizePatientsPayload = (payload: unknown): Patient[] => {
    return normalizeEntityArray<Patient>(
        payload,
        patientArrayKeys,
        "Received malformed patients payload."
    );
};

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Unable to load patients.";
};

interface PatientsApiResponse {
    data?: {
        patients?: unknown;
    };
}

const buildPatientsPath = (status?: string) => {
    if (!status) {
        return "/admin/patients";
    }

    const params = new URLSearchParams({ status });
    return `/admin/patients?${params.toString()}`;
};

function* fetchPatients(action: { payload?: { status?: string } }) {
    try {
        const status = action?.payload?.status;
        const response: PatientsApiResponse = yield call(
            apiClient<PatientsApiResponse>,
            buildPatientsPath(status)
        );
        // const patients = normalizePatientsPayload(response);
        const patientsPayload = response?.data?.patients;
        const patients = normalizePatientsPayload(patientsPayload);
        yield put(fetchPatientsSuccess(patients));
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            yield call(clearAuthSession);
            yield put(logoutSuccess());
            yield put(
                fetchPatientsFailure(
                    "Your session has expired. Please sign in again."
                )
            );
            return;
        }

        yield put(fetchPatientsFailure(getMessage(error)));
    }
}

export function* patientsSaga() {
    yield takeLatest(fetchPatientsRequest.match, fetchPatients);
}
