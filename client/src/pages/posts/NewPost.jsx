import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../features/posts/postsSlice'

export default function NewPost() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.posts)

  const [form, setForm] = useState({ title: '', content: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      await dispatch(createPost(form)).unwrap()
      setMessage('Post creado correctamente')
      setForm({ title: '', content: '' })
    } catch (err) {
      if (err.payload && typeof err.payload === 'string') {
        setMessage(err.payload)
      } else if (err.message && typeof err.message === 'string') {
        setMessage(err.message)
      } else if (typeof err === 'string') {
        setMessage(err)
      } else {
        setMessage('Error desconocido al crear el post')
      }
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Crear Nuevo Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />
        <textarea
          name="content"
          placeholder="Contenido"
          value={form.content}
          onChange={handleChange}
          rows="5"
          required
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Post'}
        </button>
      </form>

      {message && (
        <p style={{ color: message.toLowerCase().includes('error') || message.toLowerCase().includes('token') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
