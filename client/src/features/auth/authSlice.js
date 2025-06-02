import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'


const tokenLocal = localStorage.getItem('token') || null
const userLocal = localStorage.getItem('username') || null

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL + 'register', userData)
      return res.data.message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error en el servidor')
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL + 'login', credentials)
      return res.data 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error en el servidor')
    }
  }
)

const initialState = {
  token: tokenLocal,
  username: userLocal,
  loading: false,
  error: null,
  registerMessage: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.registerMessage = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.registerMessage = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.username = action.payload.username
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
