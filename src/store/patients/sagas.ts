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

const patientArrayKeys = ["patients", "data", "items", "results"];

const findPatientsArray = (payload: unknown): Patient[] | null => {
    if (Array.isArray(payload)) {
        return payload as Patient[];
    }

    if (payload && typeof payload === "object") {
        const container = payload as Record<string, unknown>;
        for (const key of patientArrayKeys) {
            const value = container[key];
            const array = findPatientsArray(value);
            if (array) {
                return array;
            }
        }
    }

    return null;
};

const normalizePatientsPayload = (payload: unknown): Patient[] => {
    // Some backends wrap patient arrays (e.g. { data: { patients: [] } }); walk
    // through the known container keys until we find the actual array.
    const patients = findPatientsArray(payload);
    if (patients) {
        return patients;
    }
    throw new Error("Received malformed patients payload.");
};

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Unable to load patients.";
};

function* fetchPatients() {
    try {
        const response: unknown = yield call(
            apiClient<unknown>,
            "/admin/patients"
        );
        const patients = normalizePatientsPayload(response);
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
    yield takeLatest(fetchPatientsRequest.type, fetchPatients);
}
