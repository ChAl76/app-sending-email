import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/auth.api';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';
import { storage } from '../utils/storage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      storage.setCredentials(credentials.username, credentials.password);
      const user = await authApi.login(credentials);
      return user;
    } catch (error) {
      storage.clearCredentials();
      return rejectWithValue('Invalid credentials');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { dispatch, rejectWithValue }) => {
    try {
      await authApi.register(credentials);
      return dispatch(
        login({
          username: credentials.username,
          password: credentials.password,
        })
      ).unwrap();
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      storage.clearCredentials();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
