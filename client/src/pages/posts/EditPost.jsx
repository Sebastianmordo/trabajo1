import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPosts, updatePost } from '../../features/posts/postsSlice'

export default function EditPost() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { posts, loading, error } = useSelector(state => state.posts)

  const postToEdit = posts.find(p => p._id === id)
  const [form, setForm] = useState({ title: '', content: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!postToEdit) {
      dispatch(fetchPosts())
    } else {
      setForm({ title: postToEdit.title, content: postToEdit.content })
    }
  }, [dispatch, postToEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await dispatch(updatePost({ id, ...form })).unwrap()
      setMessage('Post actualizado correctamente')
      setTimeout(() => navigate('/posts'), 1000)
    } catch (err) {
      setMessage('Error desconocido al actualizar el post')
    }
  }

  return (
    <div className="centro">
      <div className="card-central">
        <h1 className="titulo">Editar Post</h1>
        {!postToEdit && !loading && (
          <p>Cargando datos del post...</p>
        )}
        {postToEdit && (
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              className="input"
              name="content"
              placeholder="Contenido"
              value={form.content}
              onChange={handleChange}
              rows="5"
              required
            />
            <button className="boton-principal" type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Post'}
            </button>
          </form>
        )}
        {message && (
          <p style={{ color: message.toLowerCase().includes('error') ? 'red' : 'green' }}>
            {message}
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}
