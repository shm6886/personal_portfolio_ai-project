# AI Personal Portfolio

A full-stack AI-powered personal portfolio website. Visitors can read about you on the landing page or chat with an AI that answers questions about your background using a custom knowledge base.

**Live:** [personal-portfolio-ai-project.vercel.app](https://personal-portfolio-ai-project.vercel.app) *(deploy and update this link)*

---

## What It Does

- **Marketing page** — Hero section, achievement stats, contact links
- **AI chatbot** — Answers questions about you based on your resume/knowledge base, streamed in real-time via Server-Sent Events

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), Tailwind CSS, shadcn/ui |
| Backend | FastAPI (Vercel Serverless Functions) |
| AI | AWS Bedrock — Amazon Nova Micro |
| AI SDK | Vercel AI SDK v5 (Data Stream Protocol) |
| Package mgmt | pnpm (Node), uv (Python) |
| Deployment | Vercel |
| Dev toolchain | mise |

---

## Architecture

```
Browser → Next.js (Vercel)
              ↓ POST /api/chat
         FastAPI (Vercel Serverless)
              ↓ Bedrock Converse API
         AWS Bedrock (Nova Micro)
              ↓ SSE stream
         Browser (streamed response)
```

The backend converts Vercel AI SDK message format to Bedrock format, seeds the conversation with a cached knowledge base, then streams the response back using the AI SDK Data Stream Protocol.

**Prompt caching** — The system prompt and knowledge base are cached with Bedrock's `cachePoint` to reduce latency and cost on repeat calls.

---

## Project Structure

```
api/index.py                              # FastAPI entry (Vercel Serverless)
learn_personal_portfolio_ai/
├── config.py                             # Config pattern (local vs Vercel)
├── runtime.py                            # Runtime environment detection
├── boto_ses.py                           # Pre-configured Bedrock client
├── ai_sdk_adapter.py                     # Vercel AI SDK ↔ Bedrock format
├── multi_round_bedrock_runtime_chat_manager.py  # Chat session manager
└── prompts/
    ├── instruction.md                    # System prompt
    └── knowledge-base.md                 # Your resume / background
app/
├── (marketing)/                          # Landing page route group
├── chat/                                 # AI chat route
└── _components/                          # Shared layout components
components/
├── chat/                                 # Chat UI components
└── ui/                                   # shadcn/ui primitives
lib/                                      # Frontend utilities (SEO, etc.)
data/                                     # Static data (stats, suggested prompts)
```

---

## Setup

### Prerequisites

- [mise](https://mise.jdx.dev/) — manages Python, Node, pnpm, uv
- AWS account with Bedrock access (Nova Micro model enabled)

### Install

```bash
# Install all toolchain versions
mise install

# Create Python venv + install all deps (Python + Node)
mise run venv-create
mise run inst
```

### Environment Variables

Create `.env.local`:

```env
# Local dev: leave blank — uses ~/.aws/credentials automatically
# Vercel: set these explicitly in Vercel dashboard
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

For local dev, configure AWS credentials via `~/.aws/credentials` or `aws configure`.

### Run

```bash
mise run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## Customization

### Change the AI persona

Edit `learn_personal_portfolio_ai/prompts/instruction.md` — update the name and behavior rules.

### Update the knowledge base

Edit `learn_personal_portfolio_ai/prompts/knowledge-base.md` — replace with your actual resume, projects, and background. The more detail you add, the better the chatbot answers.

### Change the landing page

Edit `app/(marketing)/HomePageContent.tsx` and the components under `app/(marketing)/_components/`. Update `data/achievement-stats.ts` for your stats.

---

## Tests

```bash
mise run test-python   # pytest
mise run test-node     # Node built-in test runner
```

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
4. Deploy — Vercel auto-detects Next.js and the Python serverless functions

The `vercel.json` sets `PYTHON_VERSION=3.12` and enables Corepack for pnpm.
