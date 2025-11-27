import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  approvePatient,
  fetchPatientsRequest,
  rejectPatient,
} from '../store/patients/slice';

export const usePatientContext = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState) => rootState.patients);

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

  const refreshPatients = useCallback(() => {
    dispatch(fetchPatientsRequest());
  }, [dispatch]);

  return {
    patients: state.patients,
    isLoading: state.loading,
    error: state.error,
    hasLoaded: state.hasLoaded,
    approvePatient: approve,
    rejectPatient: reject,
    refreshPatients,
  };
};
