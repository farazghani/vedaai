'use client'
import { create } from 'zustand'
import type { GeneratedPaper } from '../types/paper'

type ResultStatus = 'idle' | 'pending' | 'processing' | 'done' | 'failed'

interface ResultStore {
  paper: GeneratedPaper | null
  status: ResultStatus
  error: string | null
  progressMessages: string[]
  currentJobId: string | null
  setPaper: (paper: GeneratedPaper) => void
  setStatus: (s: ResultStatus) => void
  setError: (e: string) => void
  addProgressMessage: (msg: string) => void
  setCurrentJobId: (id: string) => void
  reset: () => void
}

export const useResultStore = create<ResultStore>()((set) => ({
  paper: null,
  status: 'idle',
  error: null,
  progressMessages: [],
  currentJobId: null,
  setPaper: (paper) => set({ paper }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  addProgressMessage: (msg) =>
    set((s) => ({
      progressMessages: [...s.progressMessages, msg]
    })),
  setCurrentJobId: (id) => set({ currentJobId: id }),
  reset: () =>
    set({
      paper: null,
      status: 'idle',
      error: null,
      progressMessages: [],
      currentJobId: null
    })
}))
