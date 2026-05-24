'use client'

import type { Question } from '../../types/paper'

type Props = {
  question: Question
  index: number
}

function difficultyLabel(difficulty: Question['difficulty']) {
  if (difficulty === 'easy') return 'Easy'
  if (difficulty === 'medium') return 'Moderate'
  return 'Challenging'
}

export default function QuestionRow({ question, index }: Props) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-gray-800">
      <span className="shrink-0 font-medium">{index + 1}.</span>
      <div className="flex-1">
        <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
          <span className="shrink-0 text-xs font-medium text-gray-500">
            [{difficultyLabel(question.difficulty)}]
          </span>
          <span className="flex-1">{question.text}</span>
          <span className="shrink-0 whitespace-nowrap font-medium text-gray-600">
            [{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}]
          </span>
        </div>

        {question.options && question.options.length > 0 ? (
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 pl-1">
            {question.options.map((opt, i) => (
              <span key={opt + i} className="text-sm text-gray-700">
                {String.fromCharCode(65 + i)}. {opt}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  )
}
