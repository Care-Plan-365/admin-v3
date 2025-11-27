import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Patient } from '../../types/patient';

interface PatientsState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
  hasLoaded: false,
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsRequest(state) {
      state.loading = true;
      state.error = null;
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
        patient.id === action.payload.id && patient.status === 'new'
          ? { ...patient, status: 'current' }
          : patient,
      );
    },
    rejectPatient(state, action: PayloadAction<{ id: string }>) {
      state.patients = state.patients.map((patient) =>
        patient.id === action.payload.id ? { ...patient, status: 'rejected' } : patient,
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
