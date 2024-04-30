import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: 1,
  filter: "all",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentScreen: (state, { payload }) => {
      state.currentTab = payload;
    },
    setFilters: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setCurrentScreen, setFilters } = adminSlice.actions;

export default adminSlice.reducer;
