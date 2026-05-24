'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AssignmentFormData {
  subject: string
  topic: string
  gradeLevel: string
  questionTypes: string[]
  numQuestions: number
  totalMarks: number
  dueDate: string
  additionalInstructions: string
}

interface AssignmentStore {
  formData: AssignmentFormData
  jobId: string | null
  assignmentId: string | null
  isSubmitting: boolean
  lastSubmittedFile: null
  setFormData: (data: Partial<AssignmentFormData>) => void
  setJobId: (id: string) => void
  setAssignmentId: (id: string) => void
  setSubmitting: (v: boolean) => void
  reset: () => void
}

const defaultForm: AssignmentFormData = {
  subject: '',
  topic: '',
  gradeLevel: '',
  questionTypes: [],
  numQuestions: 5,
  totalMarks: 25,
  dueDate: '',
  additionalInstructions: ''
}

export const useAssignmentStore = create<AssignmentStore>()(
  persist(
    (set) => ({
      formData: defaultForm,
      jobId: null,
      assignmentId: null,
      isSubmitting: false,
      lastSubmittedFile: null,
      setFormData: (data) =>
        set((s) => ({ formData: { ...s.formData, ...data } })),
      setJobId: (id) => set({ jobId: id }),
      setAssignmentId: (id) => set({ assignmentId: id }),
      setSubmitting: (v) => set({ isSubmitting: v }),
      reset: () =>
        set({ formData: defaultForm, jobId: null, assignmentId: null, isSubmitting: false })
    }),
    {
      name: 'vedaai-assignment-store',
      partialize: (s) => ({ formData: s.formData, jobId: s.jobId, assignmentId: s.assignmentId })
    }
  )
)
