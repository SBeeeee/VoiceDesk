import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAnalyticsThunk } from "../../thunks/analytics.thunks";
import { IAnalytics } from "../../services/analytics.service";

interface AnalyticsState {
    stats: IAnalytics | null;
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    stats: null,
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        clearAnalyticsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnalyticsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAnalyticsThunk.fulfilled, (state, action: PayloadAction<IAnalytics>) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getAnalyticsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
