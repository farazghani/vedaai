import { Router } from 'express'
import { redisClient } from '../config/redis.js'
import { Result } from '../models/Result.js'
import type { GeneratedPaper } from '../types/paper.js'
import { generatePDF } from '../services/pdfService.js'

const router = Router()

router.post('/:jobId/pdf', async (req, res, next) => {
  try {
    const { jobId } = req.params
    const result = await Result.findOne({ jobId })

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Result not found',
      })
      return
    }

    if (result.status !== 'done') {
      res.status(400).json({
        success: false,
        message: 'Paper not ready yet',
      })
      return
    }

    const pdfBuffer = await generatePDF(result.paper as GeneratedPaper)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="question-paper-${jobId}.pdf"`)
    res.setHeader('Content-Length', pdfBuffer.length)
    res.send(pdfBuffer)
    console.log('[PDF] Sent PDF for jobId:', jobId)
  } catch (error) {
    next(error)
  }
})

router.get('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params
    const cacheKey = `result:${jobId}`
    const cached = await redisClient.get(cacheKey)

    if (cached) {
      console.log('[Cache] Hit for jobId:', jobId)
      return res.json({
        success: true,
        fromCache: true,
        ...JSON.parse(cached),
      })
    }

    console.log('[Cache] Miss for jobId:', jobId)
    const result = await Result.findOne({ jobId })

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Result not found',
      })
      return
    }

    if (result.status === 'done') {
      const payload = {
        status: result.status,
        paper: result.paper,
      }

      await redisClient.setex(cacheKey, 3600, JSON.stringify(payload))
      console.log('[Cache] Stored result for jobId:', jobId)

      return res.json({
        success: true,
        fromCache: false,
        ...payload,
      })
    }

    if (result.status === 'processing' || result.status === 'pending') {
      return res.status(202).json({
        success: true,
        status: result.status,
        message: 'Still processing',
      })
    }

    return res.status(500).json({
      success: false,
      status: result.status,
      error: result.error,
    })
  } catch (error) {
    next(error)
  }
})

export { router as resultsRouter }
export default router
