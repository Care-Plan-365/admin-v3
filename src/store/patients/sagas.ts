import { call, put, takeLatest } from "redux-saga/effects";
import { ApiError, apiClient } from "../../api/client";
import type { Patient, PatientStatus } from "../../types/patient";
import {
    fetchPatientsFailure,
    fetchPatientsRequest,
    fetchPatientsSuccess,
} from "./slice";
import { clearAuthSession } from "../../utils/authStorage";
import { logoutSuccess } from "../auth/slice";
import { normalizeEntityArray } from "../../utils/normalizeEntityArray";

const patientArrayKeys = ["patients", "data", "items", "results"];

type PlainObject = Record<string, unknown>;

const normalizePatientsPayload = (payload: unknown): unknown[] => {
    return normalizeEntityArray<unknown>(
        payload,
        patientArrayKeys,
        "Received malformed patients payload."
    );
};

const toStringOrNull = (value: unknown): string | null => {
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed.length ? trimmed : null;
    }
    return null;
};

const pickString = (
    source: PlainObject,
    keys: readonly string[]
): string | null => {
    for (const key of keys) {
        const candidate = toStringOrNull(source[key]);
        if (candidate) {
            return candidate;
        }
    }
    return null;
};

const inferStatus = (value: string | null): PatientStatus => {
    switch (value?.toLowerCase()) {
        case "new":
        case "pending":
        case "submitted":
        case "awaiting":
            return "new";
        case "rejected":
        case "declined":
        case "denied":
            return "rejected";
        case "current":
        case "active":
        case "approved":
            return "current";
        default:
            return "current";
    }
};

const buildProviderName = (source: PlainObject): string => {
    const direct = pickString(source, ["providerName", "provider"]);
    if (direct) {
        return direct;
    }

    const provider =
        (source.assignedProvider as PlainObject | undefined) ??
        (source.provider as PlainObject | undefined) ??
        (source.primaryProvider as PlainObject | undefined);

    if (provider) {
        const first =
            pickString(provider, ["firstName", "first_name", "givenName"]) ??
            "";
        const last =
            pickString(provider, ["lastName", "last_name", "surname"]) ?? "";
        const full = [first, last].map((part) => part.trim()).join(" ").trim();
        if (full) {
            return full;
        }
        const fallback = pickString(provider, ["name", "fullName"]);
        if (fallback) {
            return fallback;
        }
    }

    return "Unassigned provider";
};

const buildSuburb = (source: PlainObject): string => {
    const direct = pickString(source, ["suburb", "city", "location", "address"]);
    if (direct) {
        return direct;
    }

    const location = source.location as PlainObject | undefined;
    if (location) {
        const suburb =
            pickString(location, ["suburb", "city", "name"]) ?? undefined;
        const state = pickString(location, ["state"]) ?? undefined;
        const composed = [suburb, state].filter(Boolean).join(", ");
        if (composed) {
            return composed;
        }
    }

    return "Unknown suburb";
};

const toPatient = (raw: unknown, index: number): Patient => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        throw new Error("Received malformed patient record.");
    }

    const source = raw as PlainObject;
    const id =
        pickString(source, ["id", "_id", "patientId"]) ??
        `patient-${index + 1}`;
    const firstName =
        pickString(source, ["firstName", "first_name", "givenName"]) ??
        pickString(source, ["fullName"])?.split(" ")[0] ??
        "Unknown";

    const lastName =
        pickString(source, ["lastName", "last_name", "surname"]) ??
        pickString(source, ["fullName"])
            ?.split(" ")
            .slice(1)
            .join(" ") ??
        "";

    const suburb = buildSuburb(source);
    const providerName = buildProviderName(source);
    const status = inferStatus(
        pickString(source, ["status", "patientStatus", "applicationStatus"])
    );

    return {
        id,
        firstName,
        lastName,
        suburb,
        providerName,
        status,
    };
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

function* fetchPatients() {
    try {
        const response: PatientsApiResponse = yield call(
            apiClient<PatientsApiResponse>,
            "/admin/patients"
        );
        const patientsPayload = response?.data?.patients;
        const rawPatients = normalizePatientsPayload(patientsPayload);
        const patients = rawPatients.map((patient, index) =>
            toPatient(patient, index)
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
