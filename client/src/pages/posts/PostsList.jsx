import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, deletePost } from '../../features/posts/postsSlice'
import { Link } from 'react-router-dom'

export default function PostsList() {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deletePost(id))
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Lista de Posts</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No hay posts aún.</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id} style={{ marginBottom: '2rem' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <i>Por: {post.author.username}</i>
            </p>
            <button onClick={() => handleDelete(post._id)}>Eliminar</button>
            <Link to={`/posts/${post._id}/edit`} style={{ marginLeft: '1rem' }}>
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
