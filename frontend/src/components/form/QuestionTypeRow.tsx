'use client'

const QUESTION_TYPE_OPTIONS = [
  'Multiple Choice Questions',
  'Short Questions',
  'Long Questions',
  'True/False Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'Fill in the Blanks',
  'Essay Questions'
]

type QuestionTypeRowProps = {
  index: number
  questionType: string
  numQuestions: number
  marks: number
  onTypeChange: (index: number, type: string) => void
  onNumChange: (index: number, val: number) => void
  onMarksChange: (index: number, val: number) => void
  onRemove: (index: number) => void
}

export default function QuestionTypeRow({
  index,
  questionType,
  numQuestions,
  marks,
  onTypeChange,
  onNumChange,
  onMarksChange,
  onRemove
}: QuestionTypeRowProps) {
  return (
    <>
      <div className="hidden items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 md:grid md:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={questionType}
              onChange={(e) => onTypeChange(index, e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pr-8 pl-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {QUESTION_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex min-w-[110px] items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5">
          <button
            type="button"
            onClick={() => onNumChange(index, Math.max(1, numQuestions - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            −
          </button>
          <span className="min-w-[20px] text-center text-sm font-medium text-gray-900">
            {numQuestions}
          </span>
          <button
            type="button"
            onClick={() => onNumChange(index, numQuestions + 1)}
            className="flex h-6 w-6 items-center justify-center rounded-full font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            +
          </button>
        </div>

        <div className="flex min-w-[90px] items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5">
          <button
            type="button"
            onClick={() => onMarksChange(index, Math.max(1, marks - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            −
          </button>
          <span className="min-w-[20px] text-center text-sm font-medium text-gray-900">
            {marks}
          </span>
          <button
            type="button"
            onClick={() => onMarksChange(index, marks + 1)}
            className="flex h-6 w-6 items-center justify-center rounded-full font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-3 rounded-xl border border-gray-200 bg-white p-4 md:hidden">
        <div className="mb-3 flex items-center gap-2">
          <select
            value={questionType}
            onChange={(e) => onTypeChange(index, e.target.value)}
            className="flex-1 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none"
          >
            {QUESTION_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs text-gray-500">No. of Questions</p>
            <div className="flex items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
              <button
                type="button"
                onClick={() => onNumChange(index, Math.max(1, numQuestions - 1))}
                className="text-lg font-medium leading-none text-gray-600"
              >
                −
              </button>
              <span className="text-sm font-medium">{numQuestions}</span>
              <button
                type="button"
                onClick={() => onNumChange(index, numQuestions + 1)}
                className="text-lg font-medium leading-none text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs text-gray-500">Marks</p>
            <div className="flex items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
              <button
                type="button"
                onClick={() => onMarksChange(index, Math.max(1, marks - 1))}
                className="text-lg font-medium leading-none text-gray-600"
              >
                −
              </button>
              <span className="text-sm font-medium">{marks}</span>
              <button
                type="button"
                onClick={() => onMarksChange(index, marks + 1)}
                className="text-lg font-medium leading-none text-gray-600"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
