'use client'
import { useState, useEffect, useCallback } from 'react'
import { assignmentsApi } from '../lib/api'
import {
  getStoredAssignments,
  removeStoredAssignment
} from '../lib/localStorage'
import type { Assignment } from '../types/paper'

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAssignments = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await assignmentsApi.getAll()
      const data = res.data?.assignments || []
      if (data.length > 0) {
        setAssignments(data)
      } else {
        const local = getStoredAssignments()
        setAssignments(local)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.warn('[useAssignments] API failed:', message)
      const local = getStoredAssignments()
      setAssignments(local)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteAssignment = useCallback(async (jobId: string) => {
    try {
      await assignmentsApi.delete(jobId)
    } catch {
      console.warn('[useAssignments] Delete API failed, removing locally')
    }
    removeStoredAssignment(jobId)
    setAssignments(prev => prev.filter(a => a.jobId !== jobId))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAssignments()
  }, [fetchAssignments])

  return {
    assignments,
    isLoading,
    error,
    refetch: fetchAssignments,
    deleteAssignment
  }
}
