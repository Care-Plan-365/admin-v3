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

const getMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Unable to load patients.";
};

function* fetchPatients() {
    try {
        const patients: Patient[] = yield call(
            apiClient<Patient[]>,
            "/admin/patients"
        );
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
