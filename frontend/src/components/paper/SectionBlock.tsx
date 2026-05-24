'use client'

import type { Section } from '../../types/paper'
import QuestionRow from './QuestionRow'

type Props = {
  section: Section
  startIndex?: number
}

function getQuestionTypeTitle(section: Section) {
  const type = section.questions[0]?.type

  if (type === 'mcq') return 'Multiple Choice Questions'
  if (type === 'short') return 'Short Answer Questions'
  if (type === 'long') return 'Long Answer Questions'
  if (type === 'truefalse') return 'True or False Questions'
  return 'Questions'
}

export default function SectionBlock({ section, startIndex = 0 }: Props) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-center text-base font-bold text-gray-900">
        {section.title}
      </h3>

      <div className="mb-3">
        <p className="text-sm font-bold text-gray-900">{getQuestionTypeTitle(section)}</p>
        <p className="mt-0.5 text-xs italic text-gray-500">{section.instruction}</p>
      </div>

      <ol className="list-none space-y-3">
        {section.questions.map((q, i) => (
          <QuestionRow key={q.id} question={q} index={startIndex + i} />
        ))}
      </ol>
    </div>
  )
}
