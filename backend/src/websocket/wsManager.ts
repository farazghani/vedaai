import WebSocket from 'ws'
import type { GeneratedPaper } from '../types/paper.js'

const socketMap = new Map<string, WebSocket>()

export function registerSocket(jobId: string, ws: WebSocket): void {
  socketMap.set(jobId, ws)
  console.log('[WS] Socket registered for jobId:', jobId)
}

export function removeSocket(jobId: string): void {
  socketMap.delete(jobId)
  console.log('[WS] Socket removed for jobId:', jobId)
}

export function notifyJobProgress(jobId: string, message: string): void {
  const socket = socketMap.get(jobId)

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: 'job:progress',
        jobId,
        message,
        timestamp: new Date(),
      })
    )
  }

  console.log('[WS] Progress sent to', jobId, ':', message)
}

export function notifyJobComplete(jobId: string, paper: GeneratedPaper): void {
  const socket = socketMap.get(jobId)

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: 'job:complete',
        jobId,
        paper,
        timestamp: new Date(),
      })
    )
  }

  console.log('[WS] Complete sent to', jobId)
  removeSocket(jobId)
}

export function notifyJobFailed(jobId: string, error: string): void {
  const socket = socketMap.get(jobId)

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: 'job:failed',
        jobId,
        error,
        timestamp: new Date(),
      })
    )
  }

  console.log('[WS] Failed sent to', jobId, ':', error)
  removeSocket(jobId)
}
