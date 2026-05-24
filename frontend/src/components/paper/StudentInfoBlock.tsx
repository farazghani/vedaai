'use client'

export default function StudentInfoBlock() {
  return (
    <div className="my-6 space-y-2">
      {[
        { label: 'Name', width: 'w-48' },
        { label: 'Roll Number', width: 'w-36' },
        { label: 'Class: 5th Section', width: 'w-24' }
      ].map((field) => (
        <div key={field.label} className="flex items-baseline gap-1">
          <span className="whitespace-nowrap text-sm font-medium text-gray-800">
            {field.label}:
          </span>
          <div className={`${field.width} h-5 border-b border-gray-800`} />
        </div>
      ))}
    </div>
  )
}
