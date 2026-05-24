function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15.5 17.5H8.5C8.5 17.5 9.25 15.5 9.25 12.25V10.75C9.25 8.40279 10.9028 6.5 13 6.5C15.0972 6.5 16.75 8.40279 16.75 10.75V12.25C16.75 15.5 17.5 17.5 17.5 17.5H15.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 17.5C10.2 18.5 11.2 19.5 12.5 19.5C13.8 19.5 14.8 18.5 15 17.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15.5 5.5L9 12L15.5 18.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12H19" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="4" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="4" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="10.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="10.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="10.5" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function Avatar({ size = "md" }: { size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "h-9 w-9 text-[18px]" : "h-10 w-10 text-[22px]";
  return (
    <div className={`flex ${sizeClass} items-center justify-center overflow-hidden rounded-full bg-[#f0e5d8] ring-1 ring-black/5`}>
      <span className="leading-none">🧑🏽‍🎓</span>
    </div>
  );
}

export default function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between rounded-[1.6rem] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#2d2d2d] text-white shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
            <span className="text-[23px] font-black leading-none">V</span>
          </div>
          <div className="text-[1.9rem] font-extrabold tracking-tight text-[#313131]">VedaAI</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f5] text-[#4a4a4a]">
            <BellIcon className="h-7 w-7" />
            <span className="absolute right-[8px] top-[8px] h-2.5 w-2.5 rounded-full bg-[#ff6d2f]" />
          </button>
          <Avatar size="sm" />
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f5] text-[#2f2f2f]">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <header className="hidden items-center justify-between rounded-[1.9rem] bg-white px-6 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.08)] md:flex">
        <div className="flex min-w-0 items-center gap-4">
          <button className="flex h-14 w-14 items-center justify-center rounded-none border-4 border-[#ff5a2e] text-[#363636]">
            <BackIcon className="h-8 w-8" />
          </button>
          <div className="flex items-center gap-3 text-[#b0b0b0]">
            <GridIcon className="h-6 w-6" />
            <span className="text-[1.15rem] font-semibold">Assignment</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f3f3] text-[#4a4a4a]">
            <BellIcon className="h-8 w-8" />
            <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-[#ff6d2f]" />
          </button>
          <button className="flex items-center gap-3 rounded-full bg-[#f3f3f3] px-4 py-2.5 pr-5 text-[#2f2f2f]">
            <Avatar />
            <span className="text-[1.05rem] font-medium">John Doe</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#3f3f3f]" aria-hidden="true">
              <path d="M6.5 9.5L12 15L17.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
