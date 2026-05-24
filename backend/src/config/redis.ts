import Redis from 'ioredis'
import { env } from './env.js'

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
})

export const redisClient = redis

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('error', (error) => {
  console.error('Redis connection error:', error)
})
