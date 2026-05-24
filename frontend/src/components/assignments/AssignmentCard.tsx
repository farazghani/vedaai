'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Assignment } from '../../types/paper'

type AssignmentCardProps = {
  assignment: Assignment
  onDelete: (jobId: string) => void
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '-')
}

export default function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const statusClass =
    assignment.status === 'done'
      ? 'bg-green-50 text-green-600'
      : assignment.status === 'failed'
        ? 'bg-red-50 text-red-500'
        : 'bg-yellow-50 text-yellow-600'

  return (
    <div className="relative flex h-[162px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3
            className="cursor-pointer text-base font-bold text-gray-900 underline underline-offset-2 transition-colors hover:text-gray-600 line-clamp-2"
            onClick={() => router.push(`/result/${assignment.jobId}`)}
          >
            {assignment.subject}: {assignment.topic}
          </h3>
          <span className="mt-1.5 inline-block rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
            {assignment.gradeLevel}
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-9 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  router.push(`/result/${assignment.jobId}`)
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                View Assignment
              </button>
              <div className="mx-2 h-px bg-gray-100" />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(assignment.jobId)
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Assigned on</span>:{' '}
          {formatDate(assignment.createdAt)}
        </span>
        {assignment.dueDate ? (
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Due</span>:{' '}
            {formatDate(assignment.dueDate)}
          </span>
        ) : null}
        <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>
          {assignment.status}
        </span>
      </div>
    </div>
  )
}
