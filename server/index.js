import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json({ limit: '3mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use('/api/course', courseRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
