import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const { loading, error, username } = useSelector(state => state.auth)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(loginUser(form)).unwrap()
      setMessage(`Bienvenido, ${result.username}`)
    } catch (err) {
      setMessage(err || 'Error en el login')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
      {message && <p style={{ color: message.startsWith('Bienvenido') ? 'green' : 'red' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
