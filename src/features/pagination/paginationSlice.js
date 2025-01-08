import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	paginate: { page: 1, size: 10 },
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
			state.paginate.size = action.payload;
		},
		updateSearch: (state, action) => {
			state.search = action.payload;
		},
	},
});

export const { updatePage, updateSearch, updateLimit } =
	paginationSlice.actions;
export default paginationSlice.reducer;

export const PAGINATION = (state) => state.pagination.paginate;
export const SEARCH = (state) => state.pagination.search;
