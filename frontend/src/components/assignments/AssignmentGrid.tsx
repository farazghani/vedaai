'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import FilterBar from './FilterBar'
import AssignmentCard from './AssignmentCard'
import type { Assignment } from '../../types/paper'

type AssignmentGridProps = {
  assignments: Assignment[]
  onDelete: (jobId: string) => void
}

export default function AssignmentGrid({ assignments, onDelete }: AssignmentGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filtered = useMemo(
    () =>
      assignments.filter((assignment) =>
        `${assignment.subject} ${assignment.topic} ${assignment.gradeLevel}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [assignments, searchQuery]
  )

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3 px-1">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
          <h1 className="text-xl font-bold text-gray-900">Assignments</h1>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Manage and create assignments for your classes.
        </p>
      </div>

      <div className="mb-4 rounded-2xl border border-gray-100 bg-white">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => console.log('filter clicked')}
        />
      </div>

      {filtered.length === 0 && searchQuery ? (
        <div className="flex h-48 flex-col items-center justify-center text-gray-400">
          <p className="text-sm">
            No assignments match &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.jobId} assignment={assignment} onDelete={onDelete} />
          ))}
        </div>
      )}

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => router.push('/assignments/new')}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-2xl font-light text-white shadow-lg transition-colors hover:bg-orange-600"
        >
          +
        </button>
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-gray-100 to-transparent px-4 pb-3 md:hidden">
        <button
          type="button"
          onClick={() => router.push('/assignments/new')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-3.5 text-sm font-medium text-white"
        >
          <span>+</span> Create Assignment
        </button>
      </div>
    </div>
  )
}
