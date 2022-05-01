import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ckdrNodeApi } from "./services/ckdrNodeApi";
import { encryptTransform } from 'redux-persist-transform-encrypt';

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
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ckdrNodeApi.middleware);
  },
  transforms:[
    encryptTransform({
      secretKey: '9138nn89nc2983nv28vn823vn928vb982v982n8', // TODO: Move this to process env storage
      onError: function (error) {
        console.log(`Error in Encryption Transformer`, error)
      },
    }),
  ],
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

export const persistor = persistStore(store);
