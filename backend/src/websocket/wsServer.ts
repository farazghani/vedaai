import http from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { registerSocket, removeSocket } from './wsManager.js'

export function initWebSocket(server: http.Server): WebSocketServer {
  const wss = new WebSocketServer({ server, path: '/ws' })

  wss.on('connection', (ws, req) => {
    const jobId = new URL(req.url!, 'http://localhost').searchParams.get('jobId')

    if (!jobId) {
      console.log('[WS] Connection rejected — no jobId')
      ws.close(1008, 'jobId required')
      return
    }

    console.log('[WS] Client connected for jobId:', jobId)
    registerSocket(jobId, ws)

    ws.send(
      JSON.stringify({
        type: 'connected',
        jobId,
        message: 'Connected! Waiting for job...',
      })
    )

    ws.on('close', () => {
      console.log('[WS] Client disconnected for jobId:', jobId)
      removeSocket(jobId)
    })

    ws.on('error', (err) => {
      console.error('[WS] Socket error for jobId:', jobId, err.message)
      removeSocket(jobId)
    })
  })

  console.log('[WS] WebSocket server initialized on path /ws')
  return wss
}
