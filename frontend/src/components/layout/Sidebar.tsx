'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx as cn } from 'clsx'
import { useAssignments } from '../../hooks/useAssignments'

const navItems = [
  { label: 'Home', href: '/', icon: 'grid' },
  { label: 'My Groups', href: '/groups', icon: 'users' },
  { label: 'Assignments', href: '/assignments', icon: 'document' },
  { label: "AI Teacher's Toolkit", href: '/toolkit', icon: 'wand' },
  { label: 'My Library', href: '/library', icon: 'library' }
] as const

type NavIconType = (typeof navItems)[number]['icon']

function NavIcon({
  type,
  active
}: {
  type: NavIconType
  active: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={cn('h-5 w-5 shrink-0', active ? 'text-gray-900' : 'text-current')}
      aria-hidden="true"
    >
      {type === 'grid' ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      ) : null}
      {type === 'users' ? (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ) : null}
      {type === 'document' ? (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </>
      ) : null}
      {type === 'wand' ? (
        <>
          <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" />
        </>
      ) : null}
      {type === 'library' ? (
        <>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
      ) : null}
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function SchoolAvatar() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-sm font-bold text-orange-600">
      <span>🐻</span>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { assignments } = useAssignments()
  const assignmentCount = assignments.length

  return (
    <aside className="fixed left-3 top-3 z-40 flex h-[calc(100vh-24px)] w-[304px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <span className="text-sm font-bold leading-none text-white">V</span>
          </div>
          <span className="text-[20px] font-bold text-gray-900">VedaAI</span>
        </div>

        <button
          type="button"
          onClick={() => router.push('/assignments/new')}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gray-900 text-sm font-medium text-white ring-2 ring-orange-500 ring-offset-2 transition-colors hover:bg-gray-800"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z" />
          </svg>
          <span>Create Assignment</span>
        </button>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === '/assignments' && pathname.startsWith('/assignments'))

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
                    isActive
                      ? 'bg-gray-100 font-medium text-gray-900'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  <NavIcon type={item.icon} active={isActive} />
                  <span className="text-sm">{item.label}</span>
                  {item.label === 'Assignments' && assignmentCount > 0 ? (
                    <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-white">
                      {assignmentCount}
                    </span>
                  ) : null}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-500">
          <SettingsIcon />
          <span className="text-sm">Settings</span>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <SchoolAvatar />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-900">Delhi Public School</div>
            <div className="truncate text-xs text-gray-500">Bokaro Steel City</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
