'use client'

type FilterBarProps = {
  searchQuery: string
  onSearchChange: (v: string) => void
  onFilterClick: () => void
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  onFilterClick
}: FilterBarProps) {
  return (
    <div className="flex h-16 items-center justify-between bg-transparent px-4">
      <button
        type="button"
        onClick={onFilterClick}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filter By
      </button>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Assignment"
          className="w-64 rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  )
}
