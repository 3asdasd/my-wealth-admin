import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://5.189.141.126:5000';

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
});

export const register = createAsyncThunk('/register', async (userData) => {
  const response = await axios.post(`${API_URL}/Register`, userData);
  return response.data;
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (otpData) => {
  const response = await axios.post(`${API_URL}/verify-otp`, otpData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;