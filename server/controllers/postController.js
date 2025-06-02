const Post = require('../models/Post')

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username')
    return res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error al obtener posts' })
  }
}

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id).populate('author', 'username')
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }
    return res.status(200).json(post)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error al obtener el post' })
  }
}

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const newPost = new Post({
      title,
      content,
      author: req.user.id
    })
    await newPost.save()
    // Hacer populate antes de devolver
    const populated = await newPost.populate('author', 'username')
    return res.status(201).json(populated)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error al crear el post' })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para editar este post' })
    }

    post.title = title
    post.content = content
    const updated = await post.save()
    const populated = await updated.populate('author', 'username')
    return res.status(200).json(populated)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error al actualizar el post' })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este post' })
    }
    await post.remove()
    return res.status(200).json({ message: 'Post eliminado correctamente' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error al eliminar el post' })
  }
}
