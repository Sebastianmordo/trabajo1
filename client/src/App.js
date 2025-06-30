import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import PostsList from './pages/posts/PostsList'
import NewPost from './pages/posts/NewPost'
import EditPost from './pages/posts/EditPost'
import NotFound from './pages/NotFound'
import Bluemoon from './Bluemoon'
import './Bluemoon.css'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('jwt', token)
      window.history.replaceState({}, document.title, '/')
      navigate('/posts')
    }
  }, [navigate])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Bluemoon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
