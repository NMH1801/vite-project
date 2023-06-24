import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kingdom: [],
  phylum: [],
  class: [],
  order: [],
  family: [],
  genus: [],
  iucns:[],
  sach_dos:[],
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setKingdom: (state, action) => {
      state.kingdom = action.payload;
    },
    setPhylum: (state, action) => {
      state.phylum = action.payload;
    },
    setClass: (state, action) => {
      state.class = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setFamily: (state, action) => {
      state.family = action.payload;
    },
    setGenus: (state, action) => {
      state.genus = action.payload;
    },
    setIucns :(state, action) =>{
      state.iucns = action.payload;
    },
    setSach_dos: (state, action) =>{
      state.sach_dos = action.payload;
    }
  },
});

export const {
  setKingdom,
  setPhylum,
  setClass,
  setOrder,
  setFamily,
  setGenus,
  setIucns,
  setSach_dos  
} = apiSlice.actions;

// Thunk action creator để gọi API và lấy dữ liệu

export default apiSlice.reducer;
