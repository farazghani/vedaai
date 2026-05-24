import mongoose, { type Document, type Model, type Types } from 'mongoose'

export interface IResult extends Document {
  assignmentId: Types.ObjectId
  jobId: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  paper?: unknown
  error?: string
  processingStartedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
  _id: Types.ObjectId
}

const resultSchema = new mongoose.Schema<IResult>(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
    },
    jobId: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'done', 'failed'],
      default: 'pending',
      required: true,
    },
    paper: { type: mongoose.Schema.Types.Mixed },
    error: { type: String },
    processingStartedAt: { type: Date },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

export const Result: Model<IResult> =
  mongoose.models.Result ?? mongoose.model<IResult>('Result', resultSchema)

export default Result
