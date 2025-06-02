import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const API_URL = 'http://localhost:5000/api/posts'
const token = localStorage.getItem('token') || null

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al obtener posts')
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        API_URL,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al crear el post')
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al actualizar el post')
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return postId
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al eliminar el post')
    }
  }
)

const initialState = {
  posts: [],
  loading: false,
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.posts.unshift(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        const index = state.posts.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.posts[index] = action.payload
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
   
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = state.posts.filter((p) => p._id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default postsSlice.reducer
