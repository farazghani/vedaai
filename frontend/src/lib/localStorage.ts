import type { Assignment } from '../types/paper'

const KEY = 'vedaai_assignments'

export function getStoredAssignments(): Assignment[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addStoredAssignment(assignment: Assignment): void {
  if (typeof window === 'undefined') return
  const existing = getStoredAssignments()
  const updated = [assignment, ...existing.filter(a => a.jobId !== assignment.jobId)]
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function removeStoredAssignment(jobId: string): void {
  if (typeof window === 'undefined') return
  const existing = getStoredAssignments()
  localStorage.setItem(KEY, JSON.stringify(existing.filter(a => a.jobId !== jobId)))
}

export function updateStoredAssignment(jobId: string, updates: Partial<Assignment>): void {
  if (typeof window === 'undefined') return
  const existing = getStoredAssignments()
  const updated = existing.map(a => a.jobId === jobId ? { ...a, ...updates } : a)
  localStorage.setItem(KEY, JSON.stringify(updated))
}
