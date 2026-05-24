'use client'

import { useRouter } from 'next/navigation'

export default function EmptyState() {
  const router = useRouter()

  return (
    <div className="flex h-full min-h-[500px] flex-col items-center justify-center px-4">
      <div className="mb-8">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <circle cx="100" cy="105" r="75" fill="#E8E8F0" />
          <rect x="65" y="45" width="75" height="95" rx="6" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="78" y="65" width="48" height="4" rx="2" fill="#E5E7EB" />
          <rect x="78" y="77" width="38" height="4" rx="2" fill="#E5E7EB" />
          <rect x="78" y="89" width="44" height="4" rx="2" fill="#E5E7EB" />
          <rect x="78" y="101" width="32" height="4" rx="2" fill="#E5E7EB" />
          <rect x="118" y="30" width="45" height="32" rx="6" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="126" y="39" width="28" height="3" rx="1.5" fill="#E5E7EB" />
          <rect x="126" y="46" width="20" height="3" rx="1.5" fill="#E5E7EB" />
          <circle cx="105" cy="115" r="35" fill="white" stroke="#C4B5FD" strokeWidth="2.5" opacity="0.9" />
          <line x1="93" y1="103" x2="117" y2="127" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="117" y1="103" x2="93" y2="127" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="131" y1="141" x2="150" y2="160" stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="52" cy="130" r="5" fill="#818CF8" opacity="0.6" />
          <circle cx="160" cy="100" r="4" fill="#60A5FA" opacity="0.5" />
          <path
            d="M48 65 L50 58 L52 65 L59 67 L52 69 L50 76 L48 69 L41 67 Z"
            fill="#FCD34D"
            opacity="0.8"
          />
          <path d="M58 88 Q52 82 56 76 L72 56 L82 66 L66 88 Z" fill="#9CA3AF" opacity="0.4" />
        </svg>
      </div>

      <h2 className="mb-3 text-xl font-bold text-gray-900">No assignments yet</h2>
      <p className="mb-8 max-w-sm text-center text-sm leading-relaxed text-gray-500">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let
        AI assist with grading.
      </p>

      <button
        type="button"
        onClick={() => router.push('/assignments/new')}
        className="flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        <span className="text-lg leading-none">+</span>
        Create Your First Assignment
      </button>
    </div>
  )
}
