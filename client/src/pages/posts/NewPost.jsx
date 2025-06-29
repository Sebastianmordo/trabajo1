import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../features/posts/postsSlice'
import '../../Bluemoon.css'

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
      setMessage('Error al crear el post')
    }
  }

  return (
    <div className="bm-contenedor-form">
      <h2 className="bm-titulo">Crear Nuevo Post</h2>
      <form className="bm-formulario" onSubmit={handleSubmit}>
        <input
          className="bm-input"
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="bm-textarea"
          name="content"
          placeholder="Contenido"
          value={form.content}
          onChange={handleChange}
          rows="5"
          required
        />
        <button className="bm-boton" type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Post'}
        </button>
      </form>
      {message && (
        <p className={message.toLowerCase().includes('error') ? 'bm-error' : 'bm-success'}>
          {message}
        </p>
      )}
      {error && <p className="bm-error">{error}</p>}
    </div>
  )
}
