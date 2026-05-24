import OpenAI from 'openai'
import { env } from '../config/env.js'
import { type IAssignment } from '../models/Assignment.js'
import type { GeneratedPaper } from '../types/paper.js'
import { buildPrompt } from './promptBuilder.js'

const client = new OpenAI({
  apiKey: env.MINIMAX_API_KEY,
  baseURL: 'https://api.minimax.io/v1',
  defaultHeaders: {
    Authorization: `Bearer ${env.MINIMAX_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export async function generatePaper(assignment: IAssignment): Promise<GeneratedPaper> {
  try {
    console.log('[AI] Key loaded:', env.MINIMAX_API_KEY?.slice(0, 10) + '...')
    console.log('[AI] BaseURL:', 'https://api.minimax.io/v1')
    const { system, user } = buildPrompt(assignment)
    console.log('[AI] Building prompt for:', assignment.subject, assignment.topic)

    const response = await client.chat.completions.create({
      model: 'MiniMax-M2.7',
      max_tokens: 4000,
      temperature: 1.0,
      messages: [
        {
          role: 'system',
          content: system,
        },
        {
          role: 'user',
          content: user,
        },
      ],
    })

    const raw = response.choices[0]?.message?.content
    if (!raw) {
      throw new Error('Empty response from MiniMax API')
    }
    console.log('[AI] Raw response length:', raw.length)
    console.log('[AI] Raw response preview:', raw.slice(0, 300))

    // Step 1: Remove <think>...</think> block entirely (MiniMax M2.7 reasoning)
    const withoutThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

    // Step 2: Strip markdown fences if present
    const cleaned = withoutThink
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    // Step 3: Extract JSON object if there's any text before it
    const jsonStart = cleaned.indexOf('{')
    const jsonEnd = cleaned.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('[AI] No JSON object found in response:', cleaned.slice(0, 300))
      throw new Error('AI response contains no valid JSON object')
    }
    const jsonOnly = cleaned.slice(jsonStart, jsonEnd + 1)

    // Step 4: Log what we're about to parse
    console.log('[AI] Extracted JSON preview:', jsonOnly.slice(0, 200))

    let parsed: GeneratedPaper
    try {
      parsed = JSON.parse(jsonOnly) as GeneratedPaper
    } catch (error) {
      console.error('[AI] Failed to parse JSON:', cleaned.slice(0, 500))
      throw new Error('AI returned invalid JSON — could not parse response')
    }

    if (!parsed.sections || !Array.isArray(parsed.sections) || parsed.sections.length === 0) {
      throw new Error('AI response missing sections array')
    }

    for (const section of parsed.sections) {
      if (!section.questions || !Array.isArray(section.questions)) {
        throw new Error(`Section "${section.title}" missing questions array`)
      }
    }

    console.log('[AI] Paper generated successfully with', parsed.sections.length, 'sections')
    return parsed
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown AI error'
    console.error('[AI] Generation failed:', message)
    throw new Error(`AI generation failed: ${message}`)
  }
}
