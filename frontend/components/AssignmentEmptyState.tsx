export default function AssignmentEmptyState() {
  return (
    <section className="flex flex-1 items-center justify-center px-5 pb-28 pt-8 text-center md:px-8 md:py-10">
      <div className="max-w-3xl rounded-[2rem] bg-white/0 px-0 py-0 text-center md:bg-white/70 md:px-8 md:py-16 md:shadow-[0_15px_40px_rgba(0,0,0,0.04)] md:backdrop-blur-[2px]">
        <div className="mx-auto mb-6 flex h-[250px] w-full max-w-[360px] items-center justify-center md:h-[340px] md:max-w-[520px]">
          <svg viewBox="0 0 520 340" className="h-full w-full" aria-hidden="true">
            <circle cx="260" cy="155" r="105" fill="#efefef" />
            <rect x="205" y="80" width="100" height="150" rx="16" fill="#ffffff" />
            <rect x="224" y="96" width="54" height="10" rx="5" fill="#012030" />
            <rect x="224" y="124" width="76" height="8" rx="4" fill="#d8d8d8" />
            <rect x="224" y="146" width="68" height="8" rx="4" fill="#d8d8d8" />
            <rect x="224" y="168" width="70" height="8" rx="4" fill="#d8d8d8" />
            <rect x="224" y="190" width="74" height="8" rx="4" fill="#d8d8d8" />
            <circle cx="262" cy="160" r="56" fill="none" stroke="#cec8e7" strokeWidth="8" />
            <path d="M293 193L338 238" stroke="#cec8e7" strokeWidth="14" strokeLinecap="round" />
            <path d="M278 148L300 170" stroke="#ff4a3d" strokeWidth="14" strokeLinecap="round" />
            <path d="M300 148L278 170" stroke="#ff4a3d" strokeWidth="14" strokeLinecap="round" />
            <path d="M126 94C154 80 172 62 186 40" stroke="#08202e" strokeWidth="3" strokeLinecap="round" />
            <path d="M154 55C162 50 175 51 181 58C176 67 162 72 154 69C150 64 150 59 154 55Z" fill="none" stroke="#08202e" strokeWidth="3" />
            <path d="M130 248C137 242 143 241 150 248C144 254 138 255 130 248Z" fill="none" stroke="#3f84b7" strokeWidth="3" />
            <circle cx="370" cy="205" r="6" fill="#3f84b7" />
            <rect x="342" y="67" width="83" height="46" rx="8" fill="#ffffff" />
            <circle cx="356" cy="92" r="7" fill="#d4cadf" />
            <rect x="376" y="86" width="38" height="14" rx="7" fill="#d4d4d4" />
            <path d="M185 120C180 157 179 188 181 229" stroke="#0d2a3a" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mx-auto mt-3 max-w-2xl px-2 md:px-0">
          <div className="text-3xl font-black text-[#373737] md:mb-6 md:text-4xl">No assignments yet</div>
          <p className="mx-auto mt-3 max-w-2xl text-[1.1rem] leading-8 text-[#777777] md:text-lg">
            Create your first assignment to start collecting and grading student submissions.
            You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>
          <button className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#171717] px-8 text-lg font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
            <span className="text-2xl leading-none">+</span>
            Create Your First Assignment
          </button>
        </div>
      </div>
    </section>
  );
}
