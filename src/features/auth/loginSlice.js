import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "John Doe",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    resetStateUser: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const { updateUser, updateToken, logout, resetStateUser } =
  userSlice.actions;
export default userSlice.reducer;

export const DATA_USER = (state) => state.user.user;
