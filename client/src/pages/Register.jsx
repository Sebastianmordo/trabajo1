import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice'
import '../Bluemoon.css'

export default function Register() {
  const dispatch = useDispatch()
  const { loading, error, registerMessage } = useSelector(state => state.auth)
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(registerUser(form)).unwrap()
      setForm({ username: '', email: '', password: '' })
    } catch (_) {}
  }

  return (
    <div className="bm-contenedor-form">
      <h2 className="bm-titulo">Registro</h2>
      <form className="bm-formulario" onSubmit={handleSubmit}>
        <input
          className="bm-input"
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="bm-input"
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="bm-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bm-boton" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {registerMessage && <p className="bm-success">{registerMessage}</p>}
      {error && <p className="bm-error">{error}</p>}
    </div>
  )
}
