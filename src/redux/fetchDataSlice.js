import { createSlice } from '@reduxjs/toolkit';
import { fetchData }from '../api/api' // Thay thế đường dẫn tới file API của bạn

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.products = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} = fetchDataSlice.actions;

// Thunk action creator để gọi API và lấy dữ liệu
export const fetchDataAsync = () => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());

    const response = await fetchData();

    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default fetchDataSlice.reducer;
