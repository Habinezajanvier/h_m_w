import { combineReducers } from "redux";
import { ckdrNodeApi } from "../services/ckdrNodeApi";
import dashboardSlice from "./dashboard/dashboardSlice";
import signupSlice from "./signup/signupSlice";
import userAuthSlice from "./user/userAuthSlice";
import authSlice from "./auth/authSlice";

// combine reducers
export const rootReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [ckdrNodeApi.reducerPath]: ckdrNodeApi.reducer,
  currentUser: userAuthSlice,
  dashboard: dashboardSlice,
  signup: signupSlice,
  auth: authSlice,
});
