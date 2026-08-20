import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://harry-potter-three-tan.vercel.app',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/harry-potter-[a-z0-9-]+\.vercel\.app$/.test(origin)
    callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed)
  },
}))
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