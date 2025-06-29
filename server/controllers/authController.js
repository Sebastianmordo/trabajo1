const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'El email ya está en uso' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashed
    })
    await newUser.save()

    return res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Email o contraseña inválidos' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Email o contraseña inválidos' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.status(200).json({ token, username: user.username })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}
