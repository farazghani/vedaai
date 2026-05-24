import type { IAssignment } from '../models/Assignment.js'

export function buildPrompt(assignment: IAssignment): { system: string; user: string } {
  const system =
    'You are an expert educational assessment creator for school students.\n' +
    'You create structured, pedagogically sound question papers.\n' +
    'You ALWAYS respond with valid JSON only.\n' +
    'No markdown fences, no explanation, no preamble, no trailing text.\n' +
    'Your entire response must be a single valid JSON object.'

  const user = `Create a complete question paper with these specifications:
- Subject: ${assignment.subject}
- Topic: ${assignment.topic}
- Grade Level: ${assignment.gradeLevel}
- Requested question types: ${assignment.questionTypes.join(', ')}
- Total number of questions: ${assignment.numQuestions}
- Total marks: ${assignment.totalMarks}
- Additional instructions: ${assignment.additionalInstructions || 'None'}
${assignment.fileContent ? `- Reference material: ${assignment.fileContent.slice(0, 2000)}` : ''}

Distribution rules:
- Section A: Easy questions — 30% of total marks — MCQ or True/False type
- Section B: Medium questions — 40% of total marks — Short answer type  
- Section C: Hard questions — 30% of total marks — Long answer type
- Total marks across ALL sections must exactly equal ${assignment.totalMarks}
- Each MCQ must have exactly 4 options
- All question text must be specific to the topic "${assignment.topic}"
- Suggested exam duration: calculate based on number and type of questions

Respond with ONLY this JSON structure, nothing else:
{
  "subject": string,
  "topic": string,
  "gradeLevel": string,
  "totalMarks": number,
  "duration": number,
  "sections": [
    {
      "title": "Section A",
      "instruction": string,
      "totalMarks": number,
      "questions": [
        {
          "id": string,
          "text": string,
          "difficulty": "easy" | "medium" | "hard",
          "marks": number,
          "type": "mcq" | "short" | "long" | "truefalse",
          "options": string[]
        }
      ]
    }
  ]
}`

  return { system, user }
}
