import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../services/auth.service";
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  getMeThunk,
} from "../../thunks/auth.thunks";


interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })

      
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })

      
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.user = null;
        state.initialized = true;   
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;