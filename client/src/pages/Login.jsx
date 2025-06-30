import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import '../Bluemoon.css'

export default function Login() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const { loading, error } = useSelector(state => state.auth)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const result = await dispatch(loginUser(form)).unwrap()
      if (result.token) {
        localStorage.setItem('jwt', result.token)
        setMessage('Bienvenido')
      }
    } catch {
      setMessage('Error en el login')
    }
  }

  return (
    <div className="bm-contenedor-form">
      <h2 className="bm-titulo">Login</h2>
      <form className="bm-formulario" onSubmit={handleSubmit}>
        <input
          className="bm-input" type="email"    name="email"
          placeholder="Correo"                  value={form.email}
          onChange={handleChange} required
        />
        <input
          className="bm-input" type="password" name="password"
          placeholder="Contraseña"              value={form.password}
          onChange={handleChange} required
        />
        <button className="bm-boton" type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
      {message && (
        <p className={message.startsWith('Bienvenido') ? 'bm-success' : 'bm-error'}>
          {message}
        </p>
      )}
      {error && <p className="bm-error">{error}</p>}

      <a
        href="http://localhost:5000/api/auth/google"
        className="bm-boton"
        style={{ marginTop: 16, display: 'inline-block' }}
      >
        Iniciar sesión con Google
      </a>
    </div>
  )
}
