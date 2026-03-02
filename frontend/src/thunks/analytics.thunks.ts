import { createAsyncThunk } from "@reduxjs/toolkit";
import analyticsService, { IAnalytics } from "../services/analytics.service";

export const getAnalyticsThunk = createAsyncThunk<IAnalytics>(
    "analytics/getStats",
    async (_, { rejectWithValue }) => {
        try {
            return await analyticsService.getStats();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
