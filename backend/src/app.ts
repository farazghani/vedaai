import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { assignmentsRouter } from './routes/assignments.js'
import { resultsRouter } from './routes/results.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

app.use(
  cors({
    origin: [env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.path}`)
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
  })
})

app.use('/api/assignments', assignmentsRouter)
app.use('/api/results', resultsRouter)
app.use(errorHandler)

export default app
