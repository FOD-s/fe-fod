import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

export const LOADING = (state) => state.loading.loading;
