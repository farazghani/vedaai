'use client'

import type { GeneratedPaper } from '../../types/paper'
import SectionBlock from './SectionBlock'
import StudentInfoBlock from './StudentInfoBlock'

type Props = {
  paper: GeneratedPaper
}

function getSectionStartIndices(paper: GeneratedPaper) {
  const indices: number[] = []
  let running = 0

  paper.sections.forEach((section) => {
    indices.push(running)
    running += section.questions.length
  })

  return indices
}

export default function QuestionPaper({ paper }: Props) {
  const sectionStartIndices = getSectionStartIndices(paper)

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 md:p-12">
      <div className="mb-6 border-b border-gray-200 pb-6 text-center">
        <h1 className="mb-1 text-lg font-bold text-gray-900 md:text-xl">
          Delhi Public School, Sector-4, Bokaro
        </h1>
        <p className="text-sm font-semibold text-gray-800 md:text-base">
          Subject: {paper.subject}
        </p>
        <p className="text-sm font-semibold text-gray-800 md:text-base">
          Class: {paper.gradeLevel}
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-800">
          Time Allowed: {paper.duration} minutes
        </span>
        <span className="font-semibold text-gray-800">
          Maximum Marks: {paper.totalMarks}
        </span>
      </div>

      <p className="mb-4 text-sm font-bold text-gray-900">
        All questions are compulsory unless stated otherwise.
      </p>

      <StudentInfoBlock />

      <div className="mb-6 border-t border-gray-200" />

      {paper.sections.map((section, i) => (
        <SectionBlock
          key={section.title + i}
          section={section}
          startIndex={sectionStartIndices[i]}
        />
      ))}

      <div className="mt-8 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm font-bold text-gray-900">End of Question Paper</p>
      </div>
    </div>
  )
}
