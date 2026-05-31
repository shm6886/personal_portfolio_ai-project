# Backend Code Walkthrough

This document details the backend code directory structure, each file's responsibilities, and the AWS Bedrock call flow.

---

## Directory Structure

```
├── api/                           # FastAPI entry point (Vercel Serverless)
│   └── index.py                   # All API route definitions
│
└── learn_personal_portfolio_ai/   # Core business logic
    ├── __init__.py
    ├── config.py                  # Configuration management (env detection, AWS credentials)
    ├── runtime.py                 # Runtime detection (local vs Vercel)
    ├── paths.py                   # File path enums (prompts location)
    ├── boto_ses.py                # boto3 Session / Client initialization
    ├── multi_round_bedrock_runtime_chat_manager.py  # Bedrock multi-turn conversation manager
    ├── ai_sdk_adapter.py          # AI SDK ↔ Bedrock format conversion
    ├── utils.py                   # Utility functions
    └── prompts/                   # Prompt templates
        ├── instruction.md         # System Prompt (AI behavior definition)
        └── knowledge-base.md      # Knowledge base (background info for AI reference)
```

---

## Key Files Explained

### `api/index.py` - API Entry Point

This is the FastAPI application entry point, defining two endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/hello` | GET | Health check |
| `/api/chat` | POST | Main chat endpoint, processes AI conversations |

**`/api/chat` core flow:**

```python
@app.post("/api/chat")
async def handle_chat_data(request: Request):
    # 1. Parse AI SDK request format
    request_body = RequestBody(**request_body_data)

    # 2. Initialize Bedrock session
    chat_session = ChatSession(
        client=bedrock_runtime_client,
        model_id=config.model_id,
        system=[{"text": path_enum.instruction_content}],  # System Prompt
    )

    # 3. Inject knowledge base
    chat_session._messages = [
        {"role": "user", "content": [{"text": knowledge_base_content}]},
        {"role": "assistant", "content": [{"text": "I've reviewed..."}]},
    ]

    # 4. Append conversation history from frontend
    messages = request_body_to_bedrock_converse_messages(request_body)
    chat_session._messages.extend(messages)

    # 5. Call Bedrock to generate response
    response = chat_session.send_message([])

    # 6. Return SSE Streaming response
    return StreamingResponse(ai_sdk_message_generator(output_text))
```

---

### `learn_personal_portfolio_ai/config.py` - Configuration Management

**Design Pattern:** Config Pattern

Core idea: Centralize all environment-related configuration in one place, so other code only needs `from config import config`.

```python
@dataclasses.dataclass
class Config:
    aws_region: str | None
    aws_access_key_id: str | None
    aws_secret_access_key: str | None
    model_id: str | None

    @classmethod
    def new_in_local_runtime(cls):
        # Local dev: use ~/.aws/credentials
        return cls(aws_region="us-east-1")

    @classmethod
    def new_in_vercel_runtime(cls):
        # Vercel: read from environment variables
        return cls(
            aws_region="us-east-1",
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        )

# Singleton, auto-detects environment at startup
config = Config.new()
```

**Benefit:** Adding new config only requires modifying this one file, no need to add `if runtime.is_vercel()` checks everywhere.

---

### `learn_personal_portfolio_ai/runtime.py` - Runtime Detection

Detects whether running locally or on Vercel:

```python
class Runtime:
    def is_local(self) -> bool:
        return not self.is_vercel()

    def is_vercel(self) -> bool:
        return os.environ.get("VERCEL", "0") == "1"

runtime = Runtime()
```

---

### `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` - Conversation Manager

Wraps AWS Bedrock Converse API, manages multi-turn conversations:

```python
@dataclasses.dataclass
class ChatSession:
    client: "Client"           # boto3 Bedrock Runtime client
    model_id: str              # e.g., "us.amazon.nova-micro-v1:0"
    system: Sequence[...]      # System Prompt
    _messages: list            # Conversation history

    def send_message(self, content):
        """Send message and get AI response"""
        response = self.client.converse(
            modelId=self.model_id,
            system=self.system,
            messages=self._messages,
        )
        return response
```

**Features:**
- Automatically manages conversation history
- Wraps Bedrock API calls
- Provides debug methods

---

### `learn_personal_portfolio_ai/ai_sdk_adapter.py` - Format Conversion

AI SDK (frontend) and Bedrock (backend) use different message formats. This module handles the conversion:

**AI SDK format:**
```json
{
  "messages": [
    {"role": "user", "parts": [{"type": "text", "text": "Hello"}]}
  ]
}
```

**Bedrock format:**
```json
{
  "messages": [
    {"role": "user", "content": [{"text": "Hello"}]}
  ]
}
```

**Key functions:**
- `request_body_to_bedrock_converse_messages()` - Batch convert message list
- `ai_sdk_message_generator()` - Generate AI SDK Data Stream format response

---

### `learn_personal_portfolio_ai/boto_ses.py` - AWS Client Initialization

Creates boto3 Session and Bedrock Runtime Client based on config:

```python
# Decide whether to pass explicit credentials based on config
session = boto3.Session(
    region_name=config.aws_region,
    aws_access_key_id=config.aws_access_key_id,
    aws_secret_access_key=config.aws_secret_access_key,
)

bedrock_runtime_client = session.client("bedrock-runtime")
```

---

### `learn_personal_portfolio_ai/prompts/` - Prompt Templates

| File | Purpose |
|------|---------|
| `instruction.md` | System Prompt, defines AI behavior and role |
| `knowledge-base.md` | Knowledge base with background info (resume, project experience, etc.) |

These files are loaded via `paths.py` and injected into the Bedrock session in `api/index.py`.

---

## Data Flow

```
Frontend useChat()
    ↓ POST /api/chat (AI SDK format)
api/index.py
    ↓ Parse request
    ↓ Load config
    ↓ Initialize ChatSession
    ↓ Inject System Prompt + knowledge base
    ↓ Convert message format (ai_sdk_adapter)
    ↓ Call Bedrock Converse API
    ↓
AWS Bedrock (Claude/Nova)
    ↓ Return response
    ↓
ai_sdk_adapter.ai_sdk_message_generator()
    ↓ Convert to AI SDK Data Stream format
    ↓ SSE Streaming
Frontend useChat() renders
```

---

## Python Dependencies

| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `uvicorn` | ASGI server |
| `boto3` | AWS SDK |
| `vercel-ai-sdk-mate` | AI SDK request/response format parsing |
| `boto3-dataclass-bedrock-runtime` | Typed Bedrock responses |
| `func-args` | Optional parameter handling |

---

## Where to Add New Features

| Requirement | Where to Modify |
|-------------|-----------------|
| Change AI model | `config.py` `model_id` |
| Modify System Prompt | `prompts/instruction.md` |
| Update knowledge base | `prompts/knowledge-base.md` |
| Add new API endpoint | `api/index.py` |
| Add new config option | `config.py` |
