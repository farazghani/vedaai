import { Worker } from 'bullmq'
import { redis } from '../config/redis.js'
import { Assignment } from '../models/Assignment.js'
import { Result } from '../models/Result.js'
import { generatePaper } from '../services/aiService.js'
import type { AssignmentJobData } from './jobTypes.js'
import {
  notifyJobComplete,
  notifyJobFailed,
  notifyJobProgress,
} from '../websocket/wsManager.js'

const worker = new Worker<AssignmentJobData>(
  'assignment-generation',
  async (job) => {
    let assignment = null
    let result = null

    try {
      console.log('[Worker] Job received:', job.id, job.data)

      assignment = await Assignment.findOne({ jobId: job.data.jobId })
      if (!assignment) {
        throw new Error(`Assignment not found for jobId: ${job.data.jobId}`)
      }

      console.log('[Worker] Assignment found:', assignment.subject, assignment.topic)
      await notifyJobProgress(job.data.jobId, 'Assignment received, preparing generation...')

      result = await Result.create({
        assignmentId: assignment._id,
        jobId: job.data.jobId,
        status: 'processing',
        processingStartedAt: new Date(),
      })
      console.log('[Worker] Result created, starting generation...')
      await notifyJobProgress(job.data.jobId, 'Starting question paper generation...')

      await notifyJobProgress(job.data.jobId, 'Calling AI to generate your question paper...')

      const generatedPaper = await generatePaper(assignment)

      await notifyJobProgress(job.data.jobId, 'AI generation complete, saving results...')

      result = await Result.findByIdAndUpdate(
        result._id,
        {
          status: 'done',
          paper: generatedPaper,
          completedAt: new Date(),
        },
        { new: true }
      )

      if (!result) {
        throw new Error('Failed to update result document')
      }
      console.log('[Worker] Result updated to done')
      await notifyJobProgress(job.data.jobId, 'Finalizing your question paper...')

      assignment = await Assignment.findByIdAndUpdate(
        assignment._id,
        { status: 'done' },
        { new: true }
      )

      if (!assignment) {
        throw new Error('Failed to update assignment document')
      }
      console.log('[Worker] Assignment updated to done')
      notifyJobComplete(job.data.jobId, generatedPaper)
      console.log('[Worker] Job complete:', job.data.jobId)

      return generatedPaper
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown worker error'

      if (result) {
        await Result.findByIdAndUpdate(result._id, {
          status: 'failed',
          error: message,
        })
      }

      if (assignment) {
        await Assignment.findByIdAndUpdate(assignment._id, {
          status: 'failed',
        })
      }

      console.error('[Worker] Job failed:', message)
      notifyJobFailed(job.data.jobId, message)
      throw error
    }
  },
  {
    connection: redis as any,
    concurrency: 2,
  }
)

worker.on('completed', (job) => console.log('[Worker] ✅ Completed job:', job.id))
worker.on('failed', (job, err) => console.error('[Worker] ❌ Failed job:', job?.id, err.message))
