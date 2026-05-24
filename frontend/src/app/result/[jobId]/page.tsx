'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ActionBar from '../../../components/ui/ActionBar'
import QuestionPaper from '../../../components/paper/QuestionPaper'
import { resultsApi } from '../../../lib/api'
import { useResultStore } from '../../../store/resultStore'
import type { GeneratedPaper } from '../../../types/paper'

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string
  const { paper: storePaper } = useResultStore()
  const [paper, setPaper] = useState<GeneratedPaper | null>(() => storePaper)
  const [isLoading, setIsLoading] = useState(() => !storePaper)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const fetchResult = async () => {
      if (storePaper) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        let attempts = 0

        while (alive && attempts < 30) {
          const res = await resultsApi.get(jobId)

          if (!alive) {
            return
          }

          if (res.data.status === 'done' && res.data.paper) {
            setPaper(res.data.paper as GeneratedPaper)
            setIsLoading(false)
            return
          }

          if (res.data.status === 'failed') {
            setError(res.data.error || 'Generation failed')
            setIsLoading(false)
            return
          }

          attempts += 1
          await wait(2000)
        }

        if (alive) {
          setError('Timed out waiting for result')
          setIsLoading(false)
        }
      } catch (err: unknown) {
        if (!alive) return
        const message = err instanceof Error ? err.message : 'Failed to load result'
        setError(message)
        setIsLoading(false)
      }
    }

    fetchResult()

    return () => {
      alive = false
    }
  }, [jobId, storePaper])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
        <div className="mb-6 h-24 animate-pulse rounded-2xl bg-gray-900" />
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-10">
          <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-gray-100" />
          <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-100" />
          <div className="my-4 h-px bg-gray-200" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-4 animate-pulse rounded bg-gray-100 ${i === 1 ? 'w-[78%]' : ''} ${i === 2 ? 'w-[86%]' : ''} ${i === 3 ? 'w-[72%]' : ''} ${i === 4 ? 'w-[90%]' : ''} ${i === 5 ? 'w-[65%]' : ''}`}
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Failed to load paper</h2>
        <p className="max-w-sm text-center text-sm text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => router.push('/assignments')}
          className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
        >
          ← Back to Assignments
        </button>
      </div>
    )
  }

  if (!paper) return null

  return (
    <div className="pb-8">
      <ActionBar jobId={jobId} />
      <QuestionPaper paper={paper} />
    </div>
  )
}
