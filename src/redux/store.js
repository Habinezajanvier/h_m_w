import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ckdrNodeApi } from "./services/ckdrNodeApi";
import userAuthSlice from "./modules/user/userAuthSlice";

// redux persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./modules/rootReducer";

// redux persist config
const persistConfig = {
  key: "persist-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // {
  //   // Add the generated reducer as a specific top-level slice
  //   [ckdrNodeApi.reducerPath]: ckdrNodeApi.reducer,
  //   currentUser: userAuthSlice,
  // },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ckdrNodeApi.middleware);
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

export const persistor = persistStore(store);
