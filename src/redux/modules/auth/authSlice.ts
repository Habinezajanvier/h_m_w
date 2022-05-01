import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {db} from '../../../utils/levelDB'
export interface AuthState {
  value: boolean;
}

const initialState = { value: true } as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      console.log('Login dispatch called')
      db.put("logintoken","token").then(()=>{
        state.value = true;
      })
    },
    logout(state) {
      state.value = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
