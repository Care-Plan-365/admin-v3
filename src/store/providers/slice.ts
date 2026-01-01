import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Provider } from "../../types/provider";

export type ProvidersFetchStatus = "Pending" | "Approved" | "Rejected";

interface ProvidersState {
    providers: Provider[];
    loading: boolean;
    error: string | null;
    updating: Record<string, boolean>;
    hasLoaded: boolean;
}

const initialState: ProvidersState = {
    providers: [],
    loading: false,
    error: null,
    updating: {},
    hasLoaded: false,
};

const providersSlice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        fetchProvidersRequest(
            state,
            action: PayloadAction<
                { status?: ProvidersFetchStatus } | undefined
            >
        ) {
            void action.payload;
            state.loading = true;
            state.error = null;
        },
        fetchProvidersSuccess(state, action: PayloadAction<Provider[]>) {
            state.loading = false;
            state.providers = action.payload;
            state.hasLoaded = true;
        },
        fetchProvidersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.hasLoaded = true;
        },
        approveProviderRequest(state, action: PayloadAction<{ id: string }>) {
            state.updating[action.payload.id] = true;
        },
        approveProviderSuccess(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            delete state.updating[id];
            state.providers = state.providers.map((provider) =>
                provider.id === id
                    ? { ...provider, status: "approved" }
                    : provider
            );
        },
        approveProviderFailure(
            state,
            action: PayloadAction<{ id: string; error: string }>
        ) {
            const { id, error } = action.payload;
            delete state.updating[id];
            state.error = error;
        },
        rejectProviderRequest(state, action: PayloadAction<{ id: string }>) {
            state.updating[action.payload.id] = true;
        },
        rejectProviderSuccess(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            delete state.updating[id];
            state.providers = state.providers.map((provider) =>
                provider.id === id
                    ? { ...provider, status: "rejected" }
                    : provider
            );
        },
        rejectProviderFailure(
            state,
            action: PayloadAction<{ id: string; error: string }>
        ) {
            const { id, error } = action.payload;
            delete state.updating[id];
            state.error = error;
        },
    },
});

export const {
    fetchProvidersRequest,
    fetchProvidersSuccess,
    fetchProvidersFailure,
    approveProviderRequest,
    approveProviderSuccess,
    approveProviderFailure,
    rejectProviderRequest,
    rejectProviderSuccess,
    rejectProviderFailure,
} = providersSlice.actions;

export const providersReducer = providersSlice.reducer;
