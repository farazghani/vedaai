'use client'

import { useRouter } from 'next/navigation'
import { usePdfDownload } from '../../hooks/usePdfDownload'

type Props = {
  jobId: string
  onRegenerate?: () => void
}

export default function ActionBar({ jobId, onRegenerate }: Props) {
  const router = useRouter()
  const { downloadPdf, isDownloading } = usePdfDownload()

  const handleDownload = async () => {
    try {
      await downloadPdf(jobId, `question-paper-${jobId.slice(0, 8)}.pdf`)
    } catch {
      alert('PDF download failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-gray-900 p-5 md:flex-row md:items-center md:p-6">
        <p className="flex-1 text-sm leading-relaxed text-white">
          Certainly! Here are your customized question paper for the selected assignment.
        </p>

        <div className="shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 rounded-full border border-white px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-gray-900 disabled:opacity-50"
          >
            {isDownloading ? (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
            <span className="hidden md:inline">
              {isDownloading ? 'Downloading...' : 'Download as PDF'}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push('/assignments')}
          className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Assignments
        </button>

        {onRegenerate ? (
          <button
            type="button"
            onClick={onRegenerate}
            className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Regenerate
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
