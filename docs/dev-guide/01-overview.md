# Project Architecture Overview

This is an AI-powered personal portfolio website with two core features: a Landing Page and an AI Chatbot.

---

## Tech Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| Frontend | Next.js 16 + React 18 | App Router, TypeScript |
| UI | Tailwind CSS + Radix UI | Styling system + accessible component library |
| AI Frontend | Vercel AI SDK (`ai`, `@ai-sdk/react`) | Handles streaming responses |
| Backend | FastAPI (Python 3.12) | REST API, processes AI requests |
| AI Backend | AWS Bedrock (Claude) | LLM service |
| Deployment | Vercel | Frontend + Serverless Functions |

---

## Directory Structure

```
├── app/                    # Next.js frontend (App Router)
│   ├── (marketing)/        # Landing Page route group
│   ├── chat/               # Chat page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
│
├── components/             # React components
│   ├── chat/               # Chat-related components
│   └── ui/                 # shadcn/ui base components
│
├── lib/                    # Frontend utilities
├── data/                   # Static data (stats, suggested actions)
├── hooks/                  # React Hooks
│
├── api/                    # FastAPI entry point (Vercel Serverless)
│   └── index.py            # All API route definitions
│
├── learn_personal_portfolio_ai/   # Backend core logic
│   ├── config.py                  # Configuration management
│   ├── multi_round_bedrock_runtime_chat_manager.py  # Bedrock calls
│   ├── ai_sdk_adapter.py          # AI SDK protocol adapter
│   └── prompts/                   # System Prompt templates
│
├── mise.toml               # Dev environment config + task definitions
├── package.json            # Node.js dependencies
├── pyproject.toml          # Python dependencies
└── vercel.json             # Vercel deployment config
```

---

## Data Flow

```
User Input → Next.js Frontend → /api/chat (FastAPI)
                                    ↓
                               Bedrock (Claude)
                                    ↓
                          Streaming Response (AI SDK Protocol)
                                    ↓
                           Frontend Renders Message
```

---

## Running the Project on MacOS / Linux

### Prerequisites

1. Install [mise](https://mise.jdx.dev/) (version manager + task runner)
2. AWS account with Bedrock access configured

### Steps

```bash
# 1. Clone the project
git clone <repo-url>
cd learn_personal_portfolio_ai-project

# 2. Let mise install the toolchain (Python 3.12, Node 24, pnpm, uv)
mise install

# 3. Create Python virtual environment
mise run venv-create

# 4. Install all dependencies (Python + Node.js)
mise run inst

# 5. Configure environment variables
cp .env.example .env.local
# Edit .env.local with AWS credentials, etc.

# 6. Start development servers (Next.js + FastAPI)
mise run dev
```

After starting:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Common mise Commands

| Command | Description |
|---------|-------------|
| `mise run dev` | Start frontend + backend dev servers |
| `mise run kill` | Stop all dev servers |
| `mise run test` | Run all tests |
| `mise run inst` | Install all dependencies |

---

## Deployment

The project deploys to Vercel:
- Frontend is handled by Next.js
- Backend FastAPI runs as a Serverless Function (see `vercel.json` and `api/index.py`)

Environment variables need to be configured in the Vercel Dashboard.
