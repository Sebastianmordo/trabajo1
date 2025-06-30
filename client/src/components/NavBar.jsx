import { Link, useNavigate } from 'react-router-dom'
import '../Bluemoon.css'

export default function NavBar() {
  const isAuthenticated = !!localStorage.getItem('jwt')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        {isAuthenticated ? (
          <>
            <Link to="/posts" className="navbar-link">Posts</Link>
            <Link to="/new-post" className="navbar-link">Nuevo Post</Link>
            <button className="navbar-link" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">Registro</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}
