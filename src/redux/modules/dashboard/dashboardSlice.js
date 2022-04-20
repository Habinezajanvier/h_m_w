import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotificationPanelActive: false,
  isSidePanelActive: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    notification: (state, action) => {
      state.isNotificationPanelActive = action.payload;
    },
    sidePanel: (state, action) => {
      state.isSidePanelActive = action.payload;
    },
  },
});

export const { notification, sidePanel } = dashboardSlice.actions;
export default dashboardSlice.reducer;
