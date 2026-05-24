import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
}
