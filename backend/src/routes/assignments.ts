import { randomUUID } from 'node:crypto'
import { Router, type NextFunction, type Request, type Response } from 'express'
import multer from 'multer'
import OpenAI from 'openai'
import { createRequire } from 'module'
import { z } from 'zod'
import { env } from '../config/env.js'
import { assignmentQueue } from '../queue/queues.js'
import { Assignment } from '../models/Assignment.js'
import { Result } from '../models/Result.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')

const testClient = new OpenAI({
  apiKey: env.MINIMAX_API_KEY,
  baseURL: 'https://api.minimax.io/v1',
  defaultHeaders: {
    Authorization: `Bearer ${env.MINIMAX_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true)
      return
    }

    cb(new Error('Only PDF and text/plain files are allowed'))
  },
})

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      })
      return
    }

    next()
  })
}

const assignmentSchema = z.object({
  subject: z.string().min(1),
  topic: z.string().min(1),
  gradeLevel: z.string().min(1),
  questionTypes: z.array(z.enum(['mcq', 'short', 'long', 'truefalse'])).min(1),
  numQuestions: z.coerce.number().min(1),
  totalMarks: z.coerce.number().min(1),
  dueDate: z.string().optional(),
  additionalInstructions: z.string().optional(),
})

router.get('/test-ai', async (_req, res) => {
  try {
    const response = await testClient.chat.completions.create({
      model: 'MiniMax-M2.7',
      max_tokens: 50,
      temperature: 1.0,
      messages: [{ role: 'user', content: 'Say hello in one word.' }],
    })

    res.status(200).json({
      success: true,
      response: response.choices[0]?.message?.content ?? null,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({
      success: false,
      error: message,
    })
  }
})

router.get('/', async (_req, res, next) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 }).limit(50)

    res.json({
      success: true,
      assignments,
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params
    const assignment = await Assignment.findOne({ jobId })

    if (!assignment) {
      res.status(404).json({
        success: false,
        message: 'Not found',
      })
      return
    }

    await Assignment.deleteOne({ jobId })
    await Result.deleteOne({ jobId })

    res.json({
      success: true,
      message: 'Deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  uploadFile,
  validate(assignmentSchema),
  async (req, res, next) => {
    try {
      const { subject, topic, gradeLevel, questionTypes, numQuestions, totalMarks, dueDate, additionalInstructions } =
        req.body as z.infer<typeof assignmentSchema>

      let fileContent = ''
      const uploadedFile = req.file

      if (uploadedFile) {
        if (uploadedFile.mimetype === 'text/plain') {
          fileContent = uploadedFile.buffer.toString('utf-8')
          console.log('[Upload] TXT file extracted, length:', fileContent.length)
        } else if (uploadedFile.mimetype === 'application/pdf') {
          try {
            const pdfData = await pdfParse(uploadedFile.buffer)
            fileContent = pdfData.text
            console.log('[Upload] PDF extracted, pages:', pdfData.numpages, 'length:', fileContent.length)
          } catch (err) {
            console.warn('[Upload] PDF parse failed, skipping:', err)
            fileContent = ''
          }
        }
      }

      const doc = await Assignment.create({
        subject,
        topic,
        gradeLevel,
        questionTypes,
        numQuestions,
        totalMarks,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        additionalInstructions,
        fileContent: fileContent.slice(0, 5000),
        status: 'pending',
        jobId: randomUUID(),
      })

      await assignmentQueue.add('generate-paper', {
        assignmentId: doc._id.toString(),
        jobId: doc.jobId,
      })
      console.log('[Route] Job enqueued for jobId:', doc.jobId)

      res.status(201).json({
        success: true,
        jobId: doc.jobId,
        assignmentId: doc._id,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:jobId', async (req, res, next) => {
  try {
    const assignment = await Assignment.findOne({ jobId: req.params.jobId })

    if (!assignment) {
      res.status(404).json({
        success: false,
        message: 'Assignment not found',
      })
      return
    }

    res.json(assignment)
  } catch (error) {
    next(error)
  }
})

export { router as assignmentsRouter }
export default router
