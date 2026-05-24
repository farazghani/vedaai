'use client'

import { useRef, useState } from 'react'

type FileUploadProps = {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export default function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) onFileSelect(file)
        }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
          isDragging
            ? 'border-orange-400 bg-orange-50'
            : selectedFile
              ? 'border-green-300 bg-green-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <polyline points="9 15 12 18 15 15" />
                <line x1="12" y1="12" x2="12" y2="18" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-green-700">{selectedFile.name}</p>
            <p className="text-xs text-green-600">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onFileSelect(null)
              }}
              className="mt-1 text-xs text-red-400 underline transition-colors hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Choose a file or drag &amp; drop it here
              </p>
              <p className="mt-1 text-xs text-gray-400">JPEG, PNG, upto 10MB</p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">
        Upload images of your preferred document/image
      </p>
    </div>
  )
}
