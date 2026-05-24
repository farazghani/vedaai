import { Queue } from 'bullmq'
import { redis } from '../config/redis.js'

export const assignmentQueue = new Queue('assignment-generation', {
  connection: redis as any,
})
