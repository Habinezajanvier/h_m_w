import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Authenticate user
export const authUser = createAsyncThunk(
  "user/authUser",
  async (auth, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await axios.get("/my/account.json", { auth })
      localStorage.setItem("token", response.data.user.api_key)
      return response.data.user
    } catch (error) {
      const errorObj = Object.assign({}, error);
      const errorMessage = errorObj.response?.status === 401 ? 'Invalid login credentials' : errorObj.response?.data
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(errorMessage)
    }
  }
)

// Unauth user
export const unauthUser = createAsyncThunk(
  "user/unauthUser",
  async () => {
    localStorage.clear()
  }
)

const userAuthSlice = createSlice({
  name: 'authUser',
  initialState: {
    authenticated: false,
    info: null,
    isLoading: false,
    error: null
  },
  reducers: {
    authUserForToken: (state) => {
      state.authenticated = true
    }
  },
  extraReducers: {
    [authUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [authUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.authenticated = true
      state.info = action.payload
    },
    [authUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [unauthUser.fulfilled]: (state, action) => {
      state.authenticated = false
      state.info = null
    },
  }
})
// console.log(state.authUser)
export const { authUserForToken } = userAuthSlice.actions

// Exporting data for selectors
export const isAuthenticated = (state) => { return state.currentUser.authenticated }
export const isLoading = (state) => { return state.currentUser.isLoading }

export default userAuthSlice.reducer;