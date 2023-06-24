import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  search: "",
  total :"",
};

const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearch: (state, action) =>{
      state.search = action.payload;
    },
    setLoading: (state, action) =>{
      state.loading = action.payload;
    },
    setItem: (state, action)=>{
      state.items = action.payload;
    },
    setTotal: (state, action) =>{
      state.total = action.payload;
    }
  },
});

export const {
  setPage,
  setPageSize,
  setSearch,
  setLoading,
  setItem,
  setTotal,
} = fetchDataSlice.actions;

// Thunk action creator để gọi API và lấy dữ liệu


export default fetchDataSlice.reducer;
