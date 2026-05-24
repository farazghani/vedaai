'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAssignmentStore } from '../../store/assignmentStore'
import { addStoredAssignment } from '../../lib/localStorage'
import { assignmentsApi } from '../../lib/api'
import FileUpload from './FileUpload'
import QuestionTypeRow from './QuestionTypeRow'

interface QuestionRow {
  id: string
  type: string
  numQuestions: number
  marks: number
}

export default function CreateAssignmentForm() {
  const router = useRouter()
  const { setJobId } = useAssignmentStore()
  const [file, setFile] = useState<File | null>(null)
  const [dueDate, setDueDate] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [questionRows, setQuestionRows] = useState<QuestionRow[]>([
    { id: '1', type: 'Multiple Choice Questions', numQuestions: 4, marks: 1 },
    { id: '2', type: 'Short Questions', numQuestions: 3, marks: 2 }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalQuestions = useMemo(
    () => questionRows.reduce((sum, row) => sum + row.numQuestions, 0),
    [questionRows]
  )

  const totalMarks = useMemo(
    () => questionRows.reduce((sum, row) => sum + row.numQuestions * row.marks, 0),
    [questionRows]
  )

  const addQuestionRow = () => {
    setQuestionRows((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'Multiple Choice Questions', numQuestions: 3, marks: 2 }
    ])
  }

  const removeQuestionRow = (index: number) => {
    setQuestionRows((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const updateType = (index: number, type: string) => {
    setQuestionRows((prev) => prev.map((row, i) => (i === index ? { ...row, type } : row)))
  }

  const updateNum = (index: number, val: number) => {
    setQuestionRows((prev) => prev.map((row, i) => (i === index ? { ...row, numQuestions: val } : row)))
  }

  const updateMarks = (index: number, val: number) => {
    setQuestionRows((prev) => prev.map((row, i) => (i === index ? { ...row, marks: val } : row)))
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    if (!dueDate) nextErrors.dueDate = 'Due date is required'
    if (questionRows.length === 0) nextErrors.questions = 'Add at least one question type'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('subject', 'General Assessment')
      formData.append('topic', additionalInfo.trim() || 'General Knowledge')
      formData.append('gradeLevel', 'Grade 10')

      const questionTypes = [...new Set(
        questionRows.map((row) => {
          if (row.type.includes('Multiple Choice')) return 'mcq'
          if (row.type.includes('Short')) return 'short'
          if (row.type.includes('Long') || row.type.includes('Essay')) return 'long'
          if (row.type.includes('True')) return 'truefalse'
          return 'short'
        })
      )]

      questionTypes.forEach((type) => formData.append('questionTypes', type))
      formData.append('numQuestions', String(totalQuestions))
      formData.append('totalMarks', String(totalMarks))
      formData.append('dueDate', dueDate)
      formData.append(
        'additionalInstructions',
        `${additionalInfo}\n\nQuestion breakdown: ${questionRows
          .map((row) => `${row.type}: ${row.numQuestions} questions × ${row.marks} marks`)
          .join(', ')}`
      )
      if (file) formData.append('file', file)

      const res = await assignmentsApi.create(formData)
      const { jobId, assignmentId } = res.data

      addStoredAssignment({
        jobId,
        subject: 'General',
        topic: additionalInfo || 'General Assessment',
        gradeLevel: 'Grade 10',
        questionTypes,
        numQuestions: totalQuestions,
        totalMarks,
        dueDate,
        status: 'pending',
        createdAt: new Date().toISOString()
      })

      setJobId(jobId)
      if (assignmentId) {
        // reserved for later phases
      }
      router.push(`/generating/${jobId}`)
    } catch (err: unknown) {
      const submitError =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: unknown }; message?: string }).response?.data ||
            (err as { response?: { data?: unknown }; message?: string }).message
          : err instanceof Error
            ? err.message
            : 'Failed to create assignment'
      console.error('[Submit Error]', submitError)
      const message = err instanceof Error ? err.message : 'Failed to create assignment'
      setErrors({ submit: message })
      setIsSubmitting(false)
      return
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Create Assignment</h1>
          <p className="text-sm text-gray-500">Set up a new assignment for your students</p>
        </div>
      </div>

      <div className="mb-8 flex gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-gray-900" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-8">
        <h2 className="mb-1 text-lg font-bold text-gray-900">Assignment Details</h2>
        <p className="mb-6 text-sm text-gray-500">Basic information about your assignment</p>

        <div className="mb-6">
          <FileUpload selectedFile={file} onFileSelect={setFile} />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-900">Due Date</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="DD-MM-YYYY"
              className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                errors.dueDate ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          {errors.dueDate ? <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p> : null}
        </div>

        <div className="mb-4">
          <div className="mb-2 hidden md:grid md:grid-cols-[1fr_auto_auto] md:gap-4 md:px-1">
            <p className="text-sm font-semibold text-gray-900">Question Type</p>
            <p className="w-[110px] text-center text-sm font-semibold text-gray-900">
              No. of Questions
            </p>
            <p className="w-[90px] text-center text-sm font-semibold text-gray-900">Marks</p>
          </div>

          <div className="flex flex-col gap-3">
            {questionRows.map((row, index) => (
              <QuestionTypeRow
                key={row.id}
                index={index}
                questionType={row.type}
                numQuestions={row.numQuestions}
                marks={row.marks}
                onTypeChange={updateType}
                onNumChange={updateNum}
                onMarksChange={updateMarks}
                onRemove={removeQuestionRow}
              />
            ))}
          </div>

          {errors.questions ? <p className="mt-2 text-xs text-red-500">{errors.questions}</p> : null}

          <button type="button" onClick={addQuestionRow} className="mt-4 flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 transition-colors group-hover:bg-gray-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Add Question Type</span>
          </button>

          <div className="mt-4 flex flex-col items-end gap-0.5">
            <p className="text-sm text-gray-600">
              Total Questions : <span className="font-semibold text-gray-900">{totalQuestions}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Marks : <span className="font-semibold text-gray-900">{totalMarks}</span>
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Additional Information{' '}
            <span className="font-normal text-gray-400">(For better output)</span>
          </label>
          <div className="relative">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="pointer-events-none absolute right-3 bottom-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
          </div>
        </div>

        {errors.submit ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between pb-8">
        <button
          type="button"
          onClick={() => router.push('/assignments')}
          className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
