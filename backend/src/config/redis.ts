import { Redis } from 'ioredis'
import { env } from './env.js'

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
})

export const redisClient = redis

redis.on('error', (error: Error) => {
  console.error('[Redis] Connection error:', error.message)
})

redis.on('connect', () => {
  console.log('Redis connected')
})

export default redis
