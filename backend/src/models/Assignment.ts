import mongoose, { type Document, type Model, type Types } from 'mongoose'
import type { QuestionType } from '../types/paper.js'

export interface IAssignment extends Document {
  subject: string
  topic: string
  gradeLevel: string
  questionTypes: QuestionType[]
  numQuestions: number
  totalMarks: number
  dueDate?: Date
  additionalInstructions?: string
  fileContent?: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  jobId: string
  createdAt: Date
  updatedAt: Date
  _id: Types.ObjectId
}

const assignmentSchema = new mongoose.Schema<IAssignment>(
  {
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    gradeLevel: { type: String, required: true, trim: true },
    questionTypes: {
      type: [String],
      required: true,
      validate: {
        validator: (value: unknown[]) => Array.isArray(value) && value.length > 0,
        message: 'questionTypes must contain at least one value',
      },
    },
    numQuestions: { type: Number, required: true, min: 1 },
    totalMarks: { type: Number, required: true, min: 1 },
    dueDate: { type: Date },
    additionalInstructions: { type: String, trim: true },
    fileContent: { type: String },
    status: {
      type: String,
      enum: ['pending', 'processing', 'done', 'failed'],
      default: 'pending',
      required: true,
    },
    jobId: { type: String, required: true, unique: true, index: true },
  },
  {
    timestamps: true,
  }
)

export const Assignment: Model<IAssignment> =
  mongoose.models.Assignment ?? mongoose.model<IAssignment>('Assignment', assignmentSchema)

export default Assignment
