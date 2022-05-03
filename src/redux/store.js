import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ckdrNodeApi } from "./services/ckdrNodeApi";
import { encryptTransform } from "redux-persist-transform-encrypt";
import devToolsEnhancer from "remote-redux-devtools";

// redux persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { rootReducer } from "./modules/rootReducer";
import logger from "redux-logger";

// redux persist config
const persistConfig = {
  key: "persist-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  
  reducer: persistedReducer,
  devTools: [devToolsEnhancer({ realtime: true })],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  transforms: [
    encryptTransform({
      secretKey: "9138nn89nc2983nv28vn823vn928vb982v982n8", // TODO: Move this to process env storage
      onError: function (error) {
        console.log(`Error in Encryption Transformer`, error);
      },
    }),
  ],
});

setupListeners(store.dispatch);

export default store;

export const persistor = persistStore(store);
