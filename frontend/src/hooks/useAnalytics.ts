import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/src/store"
import { getAnalyticsThunk } from "@/src/thunks/analytics.thunks"
import { clearAnalyticsError } from "@/src/store/slices/analyticsSlice"

export const useAnalytics = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { stats, loading, error } = useSelector((s: RootState) => s.analytics);

    return {
        stats,
        loading,
        error,
        getAnalytics: () => dispatch(getAnalyticsThunk()),
        clearError: () => dispatch(clearAnalyticsError()),
    };
};
