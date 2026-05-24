'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useResultStore } from '../store/resultStore'

export function useWebSocket(jobId: string | null) {
  const wsRef = useRef<WebSocket | null>(null)
  const [status, setConnectionStatus] = useState<WebSocket['readyState'] | null>(null)
  const router = useRouter()
  const {
    setStatus,
    setPaper,
    setError,
    addProgressMessage,
    setCurrentJobId
  } = useResultStore()

  const connect = useCallback(() => {
    if (!jobId) return
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
    const ws = new WebSocket(`${WS_URL}/ws?jobId=${jobId}`)
    wsRef.current = ws

    setCurrentJobId(jobId)
    setStatus('pending')

    ws.onopen = () => {
      console.log('[WS] Connected for jobId:', jobId)
      setConnectionStatus(WebSocket.OPEN)
      setStatus('processing')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('[WS] Message:', data.type)

        switch (data.type) {
          case 'connected':
            addProgressMessage('Connected to server...')
            break

          case 'job:progress':
            addProgressMessage(data.message)
            setStatus('processing')
            break

          case 'job:complete':
            setPaper(data.paper)
            setStatus('done')
            addProgressMessage('✓ Question paper ready!')
            setTimeout(() => router.push(`/result/${jobId}`), 1000)
            break

          case 'job:failed':
            setError(data.error || 'Generation failed')
            setStatus('failed')
            addProgressMessage(`✗ Error: ${data.error}`)
            break
        }
      } catch (err) {
        console.error('[WS] Failed to parse message:', err)
      }
    }

    ws.onerror = (err) => {
      console.error('[WS] Error:', err)
      setError('WebSocket connection failed')
      setStatus('failed')
    }

    ws.onclose = (e) => {
      console.log('[WS] Closed, code:', e.code)
      setConnectionStatus(WebSocket.CLOSED)
    }
  }, [addProgressMessage, jobId, router, setCurrentJobId, setError, setPaper, setStatus])

  useEffect(() => {
    connect()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [connect])

  return {
    status,
    disconnect: () => wsRef.current?.close()
  }
}
