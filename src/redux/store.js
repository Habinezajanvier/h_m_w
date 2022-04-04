import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { ckdrNodeApi } from './services/ckdrNodeApi'
import userAuthSlice from './modules/user/userAuthSlice'

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [ckdrNodeApi.reducerPath]: ckdrNodeApi.reducer,
    currentUser: userAuthSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ckdrNodeApi.middleware)
  }
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export default store;