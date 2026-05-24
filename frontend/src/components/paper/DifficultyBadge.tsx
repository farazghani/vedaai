'use client'

import type { Difficulty } from '../../types/paper'

type Props = {
  difficulty: Difficulty
  className?: string
}

const config = {
  easy: {
    label: 'Easy',
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  medium: {
    label: 'Moderate',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200'
  },
  hard: {
    label: 'Challenging',
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200'
  }
} as const

export default function DifficultyBadge({ difficulty, className = '' }: Props) {
  const badge = config[difficulty]

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text} ${badge.border} ${className}`}
    >
      {badge.label}
    </span>
  )
}
