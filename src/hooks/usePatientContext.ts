import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  approvePatient,
  fetchPatientsRequest,
  rejectPatient,
  type PatientsStatusQuery,
} from '../store/patients/slice';

export const usePatientContext = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState) => rootState.patients);
  const patients = Array.isArray(state.patients) ? state.patients : [];
  const error = typeof state.error === 'string' ? state.error : null;

  const approve = useCallback(
    (id: string) => {
      dispatch(approvePatient({ id }));
    },
    [dispatch],
  );

  const reject = useCallback(
    (id: string) => {
      dispatch(rejectPatient({ id }));
    },
    [dispatch],
  );

  const refreshPatients = useCallback(
    (status: PatientsStatusQuery) => {
      dispatch(fetchPatientsRequest({ status }));
    },
    [dispatch],
  );

  return {
    patients,
    isLoading: Boolean(state.loading),
    error,
    hasLoaded: Boolean(state.hasLoaded),
    approvePatient: approve,
    rejectPatient: reject,
    refreshPatients,
  };
};
