import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  MONGODB_URI: z.string().min(1).default('mongodb://localhost:27017/vedaai'),
  REDIS_URL: z.string().min(1).default('redis://localhost:6379'),
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  FRONTEND_URL: z.string().min(1).default('http://localhost:3000'),
  MINIMAX_API_KEY: z.string().min(1, 'MINIMAX_API_KEY is required'),
})

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'env'
      return `${path}: ${issue.message}`
    })
    .join('; ')
}

let parsedEnv: z.infer<typeof envSchema>

try {
  parsedEnv = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Invalid environment configuration: ${formatZodError(error)}`)
  }

  throw error instanceof Error
    ? new Error(`Invalid environment configuration: ${error.message}`)
    : new Error('Invalid environment configuration')
}

export const env = parsedEnv

console.log('[Env] MINIMAX_API_KEY loaded:', env.MINIMAX_API_KEY?.slice(0, 10) + '...')
