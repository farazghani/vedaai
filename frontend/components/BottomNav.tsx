const bottomItems = [
  { label: "Home", icon: HomeIcon, active: false },
  { label: "Assignments", icon: AssignmentsIcon, active: true },
  { label: "Library", icon: LibraryIcon, active: false },
  { label: "AI Toolkit", icon: ToolkitIcon, active: false },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 11L12 5L20 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5V19H17.5V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19V13.5H14V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AssignmentsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4.75C7 4.33579 7.33579 4 7.75 4H14.5L19 8.5V19.25C19 19.6642 18.6642 20 18.25 20H7.75C7.33579 20 7 19.6642 7 19.25V4.75Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.5 4V8.5H19" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 12H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10 15.5H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ToolkitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="3.75" width="14" height="16.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 8.5H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 12H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function LibraryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4.75H17V19.25H7V4.75Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4.75V19.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 8.5H10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 12H10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13.5 8.5H14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13.5 12H14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 md:hidden">
      <div className="mx-auto flex max-w-[440px] items-stretch justify-between rounded-[1.6rem] bg-[#161616] px-5 py-4 text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={[
                "flex min-w-0 flex-1 flex-col items-center justify-end gap-1 px-1 text-[0.82rem] transition-opacity",
                item.active ? "opacity-100" : "opacity-45",
              ].join(" ")}
            >
              <Icon className="h-6 w-6" />
              <span className={item.active ? "font-semibold" : "font-medium"}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
