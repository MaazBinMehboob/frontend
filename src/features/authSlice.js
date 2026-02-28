import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../services/auth'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.loginUser.matchRejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })

    // SignUp
    builder
      .addMatcher(authApi.endpoints.signUpUser.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(authApi.endpoints.signUpUser.matchFulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.signUpUser.matchRejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })

    // Me (current user)
    builder
      .addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.me.matchRejected, (state) => {
        state.user = null
        state.isAuthenticated = false
      })

    // Logout
    builder
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
