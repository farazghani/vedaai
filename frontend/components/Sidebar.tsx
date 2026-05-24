const sidebarItems = [
  { label: "Home", icon: HomeIcon, active: false },
  { label: "My Groups", icon: GroupsIcon, active: false },
  { label: "Assignments", icon: AssignmentsIcon, active: true, badge: "10" },
  { label: "AI Teacher's Toolkit", icon: ToolkitIcon, active: false },
  { label: "My Library", icon: LibraryIcon, active: false },
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

function GroupsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M17 11.5C18.657 11.5 20 10.157 20 8.5C20 6.843 18.657 5.5 17 5.5C15.343 5.5 14 6.843 14 8.5C14 10.157 15.343 11.5 17 11.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.75 20C4.32639 17.2222 5.96065 15.5 7.99996 15.5C10.0393 15.5 11.6736 17.2222 12.25 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13.5 20C13.9486 17.8704 15.3396 16.5 17 16.5C18.6604 16.5 20.0514 17.8704 20.5 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 8.75V12L14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function Avatar() {
  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#f0e5d8] ring-1 ring-black/5">
      <span className="text-[22px] leading-none">🧑🏽‍🎓</span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-[23rem] flex-col bg-white px-6 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ff9b2f_0%,#c53d2b_55%,#5d1623_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
          <span className="text-3xl font-black leading-none text-white">V</span>
        </div>
        <div className="text-[2rem] font-extrabold tracking-tight text-[#303030]">VedaAI</div>
      </div>

      <button className="mt-16 flex h-16 items-center justify-center gap-3 rounded-full border-[4px] border-[#ff875f] bg-[#2e2e2e] px-6 text-xl font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:scale-[1.01]">
        <span className="text-2xl">✦</span>
        Create Assignment
      </button>

      <nav className="mt-16 flex flex-1 flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={[
                "flex h-14 items-center gap-3 rounded-2xl px-4 text-left text-[1.05rem] transition-colors",
                item.active ? "bg-[#efefef] font-medium text-[#2d2d2d]" : "text-[#8a8a8a] hover:bg-black/5 hover:text-[#4a4a4a]",
              ].join(" ")}
            >
              <Icon className="h-6 w-6 shrink-0" />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto rounded-full bg-[#ff6d2f] px-3 py-1 text-sm font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[1.05rem] text-[#8a8a8a] transition-colors hover:bg-black/5 hover:text-[#4a4a4a]">
          <SettingsIcon className="h-6 w-6" />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-3 rounded-[1.4rem] bg-[#f1f1f1] px-4 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
          <Avatar />
          <div className="min-w-0">
            <div className="truncate text-[1.05rem] font-semibold text-[#2f2f2f]">Delhi Public School</div>
            <div className="truncate text-sm text-[#737373]">Bokaro Steel City</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
