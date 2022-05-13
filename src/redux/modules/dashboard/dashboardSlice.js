import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotificationPanelActive: false,
  isSidePanelActive: false,
  bills: [],
  activitiesList: [],
  activity: {},
  showDevices: false,
  location: {
    latitude: null,
    longitude: null,
  },
  userLocation: { latitude: null, longitude: null },
  sideBar: "activities",
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
    saveActivity: (state, action) => {
      state.activity = action.payload;
    },
    saveActivityLocation: (state, action) => {
      state.location = action.payload;
    },
    saveUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    saveSideBarView: (state, action) => {
      state.sideBar = action.payload;
    },
  },
});

export const {
  notification,
  sidePanel,
  saveBills,
  saveActivitiesList,
  saveActivity,
  setDevicesShow,
  saveActivityLocation,
  saveUserLocation,
  saveSideBarView,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
