import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  approveProviderRequest,
  fetchProvidersRequest,
  rejectProviderRequest,
} from '../store/providers/slice';

export const useProviderContext = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState) => rootState.providers);

  const approveProvider = useCallback(
    (id: string) => {
      dispatch(approveProviderRequest({ id }));
    },
    [dispatch],
  );

  const rejectProvider = useCallback(
    (id: string) => {
      dispatch(rejectProviderRequest({ id }));
    },
    [dispatch],
  );

  const refreshProviders = useCallback(() => {
    dispatch(fetchProvidersRequest());
  }, [dispatch]);

  return {
    providers: state.providers,
    isLoading: state.loading,
    error: state.error,
    hasLoaded: state.hasLoaded,
    updating: state.updating,
    approveProvider,
    rejectProvider,
    refreshProviders,
  };
};
