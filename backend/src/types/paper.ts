export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'mcq' | 'short' | 'long' | 'truefalse'

export interface Question {
  id: string
  text: string
  difficulty: Difficulty
  marks: number
  type: QuestionType
  options?: string[]
}

export interface Section {
  title: string
  instruction: string
  totalMarks: number
  questions: Question[]
}

export interface GeneratedPaper {
  subject: string
  topic: string
  gradeLevel: string
  totalMarks: number
  duration: number
  sections: Section[]
}
