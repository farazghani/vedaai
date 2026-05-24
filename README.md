# VedaAI — AI Assessment Creator

> A full-stack application that allows teachers to create assignments and generate AI-powered question papers using MiniMax M2.7.

## Live Demo
- Frontend: https://vedaai-eight.vercel.app/
- Backend: https://vedaai-backend-9vyj.onrender.com/

## Architecture Overview

```
┌─────────────────┐     HTTP/WS      ┌──────────────────────┐
│   Next.js 14    │ ──────────────▶  │  Express + TypeScript │
│   (Frontend)    │                  │    (Backend API)      │
│                 │  WebSocket       │                       │
│  Zustand Store  │ ◀────────────── │  BullMQ Worker        │
│  React Hook Form│                  │  WebSocket Server     │
└─────────────────┘                  └──────────┬───────────┘
                                                │
                               ┌────────────────┼────────────────┐
                               │                │                │
                        ┌──────▼──────┐  ┌──────▼──────┐  ┌────▼──────┐
                        │   MongoDB   │  │    Redis    │  │  MiniMax  │
                        │ Assignments │  │  Cache +    │  │   M2.7    │
                        │  Results    │  │   Queue     │  │    API    │
                        └─────────────┘  └─────────────┘  └───────────┘
```

## Request Flow

1. Teacher fills assignment form on frontend
2. Frontend POSTs to `/api/assignments`
3. Backend saves to MongoDB + enqueues BullMQ job
4. Frontend opens WebSocket connection with jobId
5. BullMQ worker picks up job → calls MiniMax AI API
6. AI generates structured JSON question paper
7. Worker saves result to MongoDB → emits WebSocket events
8. Frontend receives `job:complete` → navigates to result page
9. Result page renders structured question paper
10. Teacher can download as PDF

## Tech Stack

### Frontend
- **Next.js 14** — App router, TypeScript
- **Zustand** — State management
- **React Hook Form + Zod** — Form validation
- **Axios** — HTTP client
- **Tailwind CSS** — Styling

### Backend
- **Node.js + Express** — TypeScript, REST API
- **BullMQ** — Background job queue
- **MongoDB + Mongoose** — Data persistence
- **Redis (ioredis)** — Caching + job state
- **WebSocket (ws)** — Real-time notifications
- **Puppeteer** — PDF generation

### AI
- **MiniMax M2.7** — Via OpenAI-compatible SDK
- Structured prompt engineering
- JSON output parsing with `<think>` tag stripping

## Project Structure

```
vedaai/
├── frontend/                 # Next.js 14 app
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── assignments/  # Assignment list
│   │   │   ├── assignments/new/  # Create form
│   │   │   ├── generating/[jobId]/  # Progress page
│   │   │   └── result/[jobId]/     # Question paper
│   │   ├── components/
│   │   │   ├── layout/       # Sidebar, Navbar
│   │   │   ├── assignments/  # Cards, Grid, Filter
│   │   │   ├── form/         # Create form components
│   │   │   └── paper/        # Question paper renderer
│   │   ├── store/            # Zustand stores
│   │   ├── hooks/            # useWebSocket, useAssignments
│   │   ├── lib/              # API client, localStorage
│   │   └── types/            # Shared TypeScript types
│   └── package.json
│
└── backend/                  # Express API
    ├── src/
    │   ├── config/           # DB, Redis, env validation
    │   ├── models/           # Assignment, Result schemas
    │   ├── routes/           # REST endpoints
    │   ├── queue/            # BullMQ queue + worker
    │   ├── services/         # AI, prompt builder, PDF
    │   ├── websocket/        # WS server + manager
    │   └── middleware/       # Validation, error handler
    └── package.json
```

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI
- Redis running locally or Upstash URL
- MiniMax API key from platform.minimax.io

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/vedaai.git
cd vedaai
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Fill in your values in .env.local
npm run dev
```

### 4. Open the app
```
http://localhost:3000
```

## Environment Variables

### Backend (.env)
| Variable | Description | Example |
|---|---|---|
| PORT | Server port | 3001 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/vedaai |
| REDIS_URL | Redis connection URL | redis://localhost:6379 |
| MINIMAX_API_KEY | MiniMax API key | sk-... |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

### Frontend (.env.local)
| Variable | Description | Example |
|---|---|---|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3001 |
| NEXT_PUBLIC_WS_URL | WebSocket URL | ws://localhost:3001 |

## Key Features

- **AI Question Generation** — MiniMax M2.7 generates structured question papers
- **Real-time Progress** — WebSocket events show generation progress live
- **Background Jobs** — BullMQ ensures jobs survive server restarts
- **Redis Caching** — Generated papers cached for 1 hour
- **PDF Export** — Puppeteer renders professional exam paper PDF
- **File Upload** — PDF/TXT reference material fed into AI prompt
- **Mobile Responsive** — Full mobile layout with bottom tab navigation

## AI Approach

Prompts are structured to:
1. Enforce JSON-only output (no markdown, no explanation)
2. Distribute questions across difficulty levels (30% easy, 40% medium, 30% hard)
3. Group into sections (A, B, C) by difficulty
4. Strip MiniMax `<think>` reasoning tags before parsing
5. Validate JSON structure before saving
