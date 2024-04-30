import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorData: {},
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setVendorData: (state, { payload }) => {
      state.vendorData = payload;
    },
  },
});

export const { setVendorData } = customerSlice.actions;

export default customerSlice.reducer;
