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

export interface Assignment {
  jobId: string
  subject: string
  topic: string
  gradeLevel: string
  questionTypes: string[]
  numQuestions: number
  totalMarks: number
  dueDate?: string
  additionalInstructions?: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  createdAt: string
}

export interface AssignmentResult {
  status: 'pending' | 'processing' | 'done' | 'failed'
  paper?: GeneratedPaper
  error?: string
  fromCache?: boolean
}
