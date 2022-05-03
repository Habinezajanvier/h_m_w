import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotificationPanelActive: false,
  isSidePanelActive: false,
  bills: [],
  activitiesList: [],
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
    saveBills: (state, action) => {
      state.bills = action.payload;
    },
    saveActivitiesList: (state, action) => {
      state.activitiesList = action.payload;
    },
  },
});

export const { notification, sidePanel, saveBills, saveActivitiesList } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
