require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')

require('./config/passport')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Solo esta línea para auth:
app.use('/api/auth', require('./routes/auth'))

app.use('/api/posts', require('./routes/posts'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))

app.get('/', (req, res) => {
  res.send('Servidor corriendo 👋');
});
