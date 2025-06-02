require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))

app.use('/api/posts', require('./routes/posts'))


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))
