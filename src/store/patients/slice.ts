import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Patient } from "../../types/patient";

export type PatientsStatusQuery = "approved" | "pending" | "rejected";

interface PatientsState {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    hasLoaded: boolean;
    activeStatus: PatientsStatusQuery | null;
}

const initialState: PatientsState = {
    patients: [],
    loading: false,
    error: null,
    hasLoaded: false,
    activeStatus: null,
};

const patientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        fetchPatientsRequest(
            state,
            action: PayloadAction<{ status: PatientsStatusQuery }>
        ) {
            state.loading = true;
            state.error = null;
            state.activeStatus = action.payload.status;
            // Ensure tab switches don't momentarily show a different tab's data.
            state.patients = [];
        },
        fetchPatientsSuccess(state, action: PayloadAction<Patient[]>) {
            state.loading = false;
            state.patients = action.payload;
            state.hasLoaded = true;
        },
        fetchPatientsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.hasLoaded = true;
        },
        approvePatient(state, action: PayloadAction<{ id: string }>) {
            state.patients = state.patients.map((patient) =>
                patient.id === action.payload.id &&
                (patient.status === "new" || patient.status === "pending")
                    ? { ...patient, status: "approved" }
                    : patient
            );
        },
        rejectPatient(state, action: PayloadAction<{ id: string }>) {
            state.patients = state.patients.map((patient) =>
                patient.id === action.payload.id
                    ? { ...patient, status: "rejected" }
                    : patient
            );
        },
    },
});

export const {
    fetchPatientsRequest,
    fetchPatientsSuccess,
    fetchPatientsFailure,
    approvePatient,
    rejectPatient,
} = patientsSlice.actions;

export const patientsReducer = patientsSlice.reducer;
