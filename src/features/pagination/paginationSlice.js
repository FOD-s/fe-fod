import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginate: { page: 1, limit: 10, totalItem: 0 },
  search: "",
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.paginate.page = action.payload;
    },
    updateLimit: (state, action) => {
      state.paginate.limit = action.payload;
    },
    updateTotalItem: (state, action) => {
      state.paginate.totalItem = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    resetStatePagination: (state) => {
      state.paginate = initialState.paginate;
      state.search = initialState.search;
    },
  },
});

export const {
  updatePage,
  updateSearch,
  updateLimit,
  updateTotalItem,
  resetStatePagination,
} = paginationSlice.actions;
export default paginationSlice.reducer;

export const PAGINATION = (state) => state.pagination.paginate;
export const SEARCH = (state) => state.pagination.search;
