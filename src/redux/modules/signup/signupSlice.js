import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: 0,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    signupBackToPreviousView: (state) => {
      state.currentView -= 1;
    },
  },
});

export const {
  signupCurrentView,
  signupBackToPreviousView,
} = signupSlice.actions;
export default signupSlice.reducer;
