'use client'

import { useAssignments } from '../../hooks/useAssignments'
import EmptyState from '../../components/assignments/EmptyState'
import AssignmentGrid from '../../components/assignments/AssignmentGrid'

export default function AssignmentsPage() {
  const { assignments, isLoading, deleteAssignment } = useAssignments()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[162px] animate-pulse rounded-2xl border border-gray-100 bg-white"
          />
        ))}
      </div>
    )
  }

  if (assignments.length === 0) {
    return <EmptyState />
  }

  return <AssignmentGrid assignments={assignments} onDelete={deleteAssignment} />
}
