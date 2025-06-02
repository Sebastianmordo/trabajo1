import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

export default function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, username } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/register" style={{ marginRight: '1rem' }}>Registro</Link>

      {token ? (
        <>
          <span style={{ marginRight: '1rem' }}>Hola, {username}</span>
          <button onClick={handleLogout} style={{ marginRight: '1rem' }}>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      )}

      <Link to="/posts" style={{ marginRight: '1rem' }}>Posts</Link>
      <Link to="/new-post">Nuevo Post</Link>
    </nav>
  )
}
