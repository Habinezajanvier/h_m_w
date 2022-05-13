import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: 6,
  signupData: {
    phone: "",
    otp: "",
    mnenominPassword: "",
    confirmMnenominPassword: "",
    mnenominPhrase: "",
  },
  registerData: {},
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    signupBackToPreviousView: (state) => {
      if (state.currentView > 0) state.currentView -= 1;
    },
    saveRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    signupValues: (state, action) => {
      let { signupData } = state;
      let { payload } = action;
      let {
        phone,
        otp,
        mnenominPassword,
        confirmMnenominPassword,
        mnenominPhrase,
      } = payload;
      state.signupData = {
        phone: phone ? phone : signupData.phone,
        otp: otp ? otp : signupData.otp,
        mnenominPassword: mnenominPassword
          ? mnenominPassword
          : signupData.mnenominPassword,

        confirmMnenominPassword: confirmMnenominPassword
          ? confirmMnenominPassword
          : signupData.confirmMnenominPassword,
        mnenominPhrase: mnenominPhrase
          ? mnenominPhrase
          : signupData.mnenominPhrase,
      };
    },
  },
});

export const {
  signupCurrentView,
  signupBackToPreviousView,
  signupValues,
  saveRegisterData,
} = signupSlice.actions;
export default signupSlice.reducer;
