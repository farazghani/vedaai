'use client'

import { usePathname, useRouter } from 'next/navigation'

function Avatar() {
  return (
    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
      <span className="text-xs font-semibold text-gray-600">JD</span>
    </div>
  )
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const isAssignmentRoute = pathname.startsWith('/assignments')

  return (
    <header className="fixed left-[327px] top-3 z-40 flex h-14 items-center justify-between rounded-2xl border border-gray-100 bg-white px-6 shadow-sm right-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-gray-500" aria-current={isAssignmentRoute ? 'page' : undefined}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="text-sm text-gray-600">Assignment</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-50"
        >
          <Avatar />
          <span className="text-sm font-medium text-gray-900">John Doe</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  )
}
