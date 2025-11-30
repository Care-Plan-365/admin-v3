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
  const providers = Array.isArray(state.providers) ? state.providers : [];
  const updating =
    state.updating && typeof state.updating === 'object' ? state.updating : {};
  const error = typeof state.error === 'string' ? state.error : null;

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
    providers,
    isLoading: Boolean(state.loading),
    error,
    hasLoaded: Boolean(state.hasLoaded),
    updating,
    approveProvider,
    rejectProvider,
    refreshProviders,
  };
};
