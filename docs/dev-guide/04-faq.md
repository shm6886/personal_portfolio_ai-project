# FAQ & Cookbook

This document contains common code modification examples, debugging tips, and deployment workflows.

---

## Frontend Code Modification Examples

### 1. Modify Website Title and Metadata

**Requirement:** Change website title from "John Doe" to your own name

**Location:** `lib/constants.ts`

```ts
export const METADATA = {
  TITLE: "Your Name - Software Engineer",  // Change here
  DESCRIPTION: "Personal website of Your Name",
  AI_ASSISTANT_NAME: "AI Assistant",
};
```

**Affected areas:** Browser tab title, SEO meta tags

---

### 2. Modify Landing Page Stats

**Requirement:** Update years of experience, project count, etc. on the homepage

**Location:** `data/achievement-stats.ts`

```ts
export const stats = [
  { value: "10+", label: "Years Experience" },  // Change here
  { value: "50+", label: "Projects" },
  // ...
];
```

**Affected areas:** `StatsSection` component on Landing Page

---

### 3. Modify Chat Page Shortcut Buttons

**Requirement:** Add or modify preset question buttons on the chat page

**Location:** `data/suggested-actions.json`

```json
[
  {
    "title": "About Me",
    "label": "Tell me about yourself",
    "action": "Tell me about yourself"
  },
  {
    "title": "New Button",           // Add new button
    "label": "Your custom question",
    "action": "Your custom question"
  }
]
```

**Affected areas:** `components/chat/multimodal-input.tsx` reads this file

---

### 4. Modify UI Styles (Colors, Fonts, etc.)

**Requirement:** Change theme colors or fonts

**Locations:**
- Color variables: CSS variables in `app/globals.css`
- Fonts: Google Fonts import in `app/layout.tsx`
- Tailwind config: `tailwind.config.ts`

```css
/* app/globals.css */
:root {
  --accent: 210 100% 50%;  /* Modify accent color */
}
```

---

## Backend Code Modification Examples

### 1. Modify AI System Prompt

**Requirement:** Adjust AI behavior, tone, or role definition

**Location:** `learn_personal_portfolio_ai/prompts/instruction.md`

```markdown
You are a helpful AI assistant for [Your Name]'s portfolio website.
Your role is to answer questions about [Your Name]'s experience...
```

**Note:** This file is passed as the `system` parameter when calling Bedrock

---

### 2. Update Knowledge Base Content

**Requirement:** Update background info the AI references (resume, project experience, etc.)

**Location:** `learn_personal_portfolio_ai/prompts/knowledge-base.md`

```markdown
# About Me
- Name: Your Name
- Role: Software Engineer
- Experience: ...

# Projects
- Project A: ...
- Project B: ...
```

**How it works:** This file is injected into the Bedrock session at the start of each conversation, and the AI references this info when answering questions

---

### 3. Switch AI Model

**Requirement:** Switch from Nova Micro to another model (e.g., Claude)

**Location:** `learn_personal_portfolio_ai/config.py`

```python
@dataclasses.dataclass
class Config:
    model_id: str | None = dataclasses.field(
        default="us.anthropic.claude-3-haiku-20240307-v1:0"  # Change here
    )
```

**Available models:** Check AWS Bedrock Console for supported Model IDs

---

### 4. Add New API Endpoint

**Requirement:** Add an API to get user info

**Location:** `api/index.py`

```python
@app.get("/api/user-info")
async def get_user_info():
    return JSONResponse(content={
        "name": "Your Name",
        "role": "Software Engineer",
    })
```

**Note:** Vercel automatically deploys `api/index.py` as a Serverless Function

---

## Debugging Tips

### 1. View Frontend AI SDK Requests

Open browser DevTools → Network → filter `chat` → view Request Payload

```json
{
  "messages": [...],
  "id": "session-id"
}
```

### 2. View Backend Logs

During local development, FastAPI logs print to the terminal. Key log locations:

- `debug_ai_sdk_request()` in `api/index.py` prints request content
- `ChatSession.debug_response()` prints Bedrock response

### 3. Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `403 Forbidden` from Bedrock | Invalid AWS credentials or no permission | Check `~/.aws/credentials` or environment variables |
| `useChat` not updating | API response format incorrect | Ensure returning AI SDK Data Stream format |
| CORS error | Cross-origin request rejected | Next.js rewrites should handle this, check `next.config.js` |
| Messages not displaying | SSE response format error | Check `ai_sdk_message_generator()` output |

### 4. Test API Locally

```bash
# Test hello endpoint
curl http://localhost:8000/api/hello

# Test chat endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "parts": [{"type": "text", "text": "Hello"}]}], "id": "test"}'
```

---

## Development Environment Setup

### First-time Setup

```bash
# 1. Install mise
curl https://mise.jdx.dev/install.sh | sh

# 2. Let mise install toolchain
mise install

# 3. Create virtual environment + install dependencies
mise run venv-create
mise run inst

# 4. Configure environment variables
cp .env.example .env.local
# Edit .env.local
```

### Daily Development

```bash
# Start dev servers
mise run dev

# Stop servers
mise run kill

# Run tests
mise run test
```

### Common Ports

| Service | Port | URL |
|---------|------|-----|
| Next.js | 3000 | http://localhost:3000 |
| FastAPI | 8000 | http://localhost:8000 |

---

## Vercel Deployment Workflow

### First Deployment

1. Fork or push code to GitHub
2. Log in to [Vercel Dashboard](https://vercel.com)
3. Import project
4. Configure environment variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
5. Click Deploy

### Update Deployment

```bash
# Pushing to main branch automatically triggers deployment
git push origin main
```

### Environment Variable Management

| Variable | Purpose | Where to Configure |
|----------|---------|-------------------|
| `AWS_ACCESS_KEY_ID` | AWS access key | Vercel Dashboard → Settings → Environment Variables |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Same as above |
| `VERCEL` | Auto-set by Vercel | Automatic |

### View Deployment Logs

Vercel Dashboard → Deployments → Select deployment → View Build Logs / Function Logs

---

## Code Structure Quick Reference

| What to Change | Where to Change It |
|----------------|-------------------|
| Website title/description | `lib/constants.ts` |
| Landing Page content | `app/(marketing)/_components/` |
| Chat UI | `components/chat/` |
| AI behavior | `learn_personal_portfolio_ai/prompts/instruction.md` |
| AI knowledge base | `learn_personal_portfolio_ai/prompts/knowledge-base.md` |
| AI model | `learn_personal_portfolio_ai/config.py` |
| API endpoints | `api/index.py` |
| Global styles | `app/globals.css` |
| Tailwind config | `tailwind.config.ts` |
