import { createAsyncThunk } from "@reduxjs/toolkit";
import authService, {
  LoginInput,
  RegisterInput,
  User,
} from "../services/auth.service";

export const registerThunk = createAsyncThunk<
  User,
  RegisterInput,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    return await authService.register(data);
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const loginThunk = createAsyncThunk<
  User,
  LoginInput,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    return await authService.login(data);
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getMeThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: null }
>("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    return await authService.getMe();
  } catch {
    return rejectWithValue(null); // silent fail — user just isn't logged in
  }
});