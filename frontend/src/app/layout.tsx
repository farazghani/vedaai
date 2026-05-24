import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'VedaAI - AI Assessment Creator',
  description: 'Create AI-powered question papers for your students'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 antialiased">
        <div className="hidden md:block">
          <Sidebar />
          <Navbar />
          <main className="ml-[327px] mr-3 mt-[90px] min-h-[calc(100vh-102px)] pb-6">
            {children}
          </main>
        </div>

        <div className="md:hidden">
          <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500">
                <span className="text-xs font-bold text-white">V</span>
              </div>
              <span className="font-bold text-gray-900">VedaAI</span>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-500" />
              </button>

              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <span className="text-xs font-semibold text-gray-600">JD</span>
              </div>

              <button type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          <main className="min-h-screen pb-20 pt-14">{children}</main>

          <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around bg-gray-900 px-4">
            {[
              { label: 'Home', href: '/', icon: 'grid' },
              { label: 'Assignments', href: '/assignments', icon: 'document' },
              { label: 'Library', href: '/library', icon: 'library' },
              { label: 'AI Toolkit', href: '/toolkit', icon: 'wand' }
            ].map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-1 text-gray-400 transition-colors hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  {tab.icon === 'grid' ? (
                    <>
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </>
                  ) : null}
                  {tab.icon === 'document' ? (
                    <>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </>
                  ) : null}
                  {tab.icon === 'library' ? (
                    <>
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </>
                  ) : null}
                  {tab.icon === 'wand' ? (
                    <>
                      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" />
                    </>
                  ) : null}
                </svg>
                <span className="text-[10px]">{tab.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </body>
    </html>
  )
}
