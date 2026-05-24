'use client'

import { useParams } from 'next/navigation'
import { useWebSocket } from '../../../hooks/useWebSocket'
import { useResultStore } from '../../../store/resultStore'

export default function GeneratingPage() {
  const params = useParams()
  const jobId = params.jobId as string

  useWebSocket(jobId)
  const { progressMessages, status, error } = useResultStore()

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        {status === 'failed' ? (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
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
            <h2 className="mb-2 text-xl font-bold text-gray-900">Generation Failed</h2>
            <p className="mb-6 text-sm text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
            >
              ← Try Again
            </button>
          </>
        ) : (
          <>
            <div className="relative mx-auto mb-8 h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F97316" aria-hidden="true">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
              </div>
            </div>

            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Generating your question paper...
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Our AI is crafting the perfect questions for your students
            </p>

            <div className="space-y-3 text-left">
              {progressMessages.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  {i === progressMessages.length - 1 && status === 'processing' ? (
                    <div className="mt-0.5 h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
                  ) : (
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <p
                    className={`text-sm ${
                      i === progressMessages.length - 1 ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {msg}
                  </p>
                </div>
              ))}

              {progressMessages.length === 0 ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
                  <p className="text-sm text-gray-600">Connecting to server...</p>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
