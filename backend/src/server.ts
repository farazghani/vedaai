import http from 'node:http'
import { app } from './app.js'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'
import { initWebSocket } from './websocket/wsServer.js'

async function start(): Promise<void> {
  await connectDB()

  const server = http.createServer(app)
  initWebSocket(server)

  await import('./queue/worker.js').then(() => {
    console.log('[Server] Worker started in-process')
  })

  server.listen(env.PORT, () => {
    console.log(`[Server] Running on port ${env.PORT}`)
    console.log(`[Server] WebSocket ready on ws://localhost:${env.PORT}/ws`)
  })
}

start().catch((error) => {
  console.error('Server failed to start:', error)
  process.exit(1)
})
