import { call, put, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../api/client";
import type { Patient } from "../../types/patient";
import {
    fetchPatientsFailure,
    fetchPatientsRequest,
    fetchPatientsSuccess,
} from "./slice";

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
        yield put(fetchPatientsFailure(getMessage(error)));
    }
}

export function* patientsSaga() {
    yield takeLatest(fetchPatientsRequest.type, fetchPatients);
}
