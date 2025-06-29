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
    <div className="centro">
      <div className="card-central">
        <h1 className="titulo">Lista de Posts</h1>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No hay posts aún.</p>}
        <ul>
          {posts.map(post => (
            <li key={post._id} style={{ marginBottom: '2rem', borderBottom: '1px solid #aaa', paddingBottom: 10 }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><i>Por: {post.author?.username}</i></p>
              <button className="boton-principal" style={{ marginRight: '1rem' }} onClick={() => handleDelete(post._id)}>Eliminar</button>
              <Link to={`/posts/${post._id}/edit`} className="boton-principal" style={{ background: '#70a2ff' }}>
                Editar
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
