import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    error: null,
    loading: false,
    user:null,
    token: null,

  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.access_token;
        // localStorage.setItem("jwtToken", action.payload.access_token)
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const {setUser} = authSlice.actions;

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://wlp.howizbiz.com/api/web-authenticate', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://wlp.howizbiz.com/api/logout', token, config);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue('Invalid response data');
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export default authSlice.reducer;
