import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => res.json({ message: '⚡ Hogwarts API running' }))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(process.env.PORT, () =>
      console.log(`⚡ Server running on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.error('❌ MongoDB error:', err))