# -*- coding: utf-8 -*-

"""
FastAPI backend for AI chat powered by OpenAI.
"""

import os
import sys
import json

from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse, StreamingResponse
from vercel_ai_sdk_mate.api import RequestBody

from learn_personal_portfolio_ai.paths import path_enum
from learn_personal_portfolio_ai.ai_sdk_adapter import debug_ai_sdk_request, ai_sdk_message_generator

# Load .env.local if present
try:
    from dotenv import load_dotenv
    load_dotenv(".env.local")
    load_dotenv()
except ImportError:
    pass

from openai import OpenAI

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

app = FastAPI()
openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


def request_body_to_openai_messages(request_body: RequestBody) -> list[dict]:
    """Convert AI SDK request messages to OpenAI chat format."""
    messages = []
    for message in request_body.messages:
        if message.role in ("user", "assistant"):
            text = " ".join(
                part.text for part in message.parts
                if hasattr(part, "text") and part.text
            )
            if text:
                messages.append({"role": message.role, "content": text})
    return messages


@app.get("/api/hello")
async def hello_world():
    return JSONResponse(content={"message": "Hello from FastAPI!", "status": "success"})


@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    request_body_data = await debug_ai_sdk_request(request=request)
    request_body = RequestBody(**request_body_data)

    # Build system prompt: instruction + full knowledge base
    system_content = (
        path_enum.instruction_content
        + "\n\n"
        + path_enum.knowledge_base_content
    )

    # Build conversation
    messages = [{"role": "system", "content": system_content}]
    messages.extend(request_body_to_openai_messages(request_body))

    # Call OpenAI
    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7,
    )
    output_text = completion.choices[0].message.content or ""

    response = StreamingResponse(
        ai_sdk_message_generator(output_text=output_text),
        media_type="text/event-stream",
    )
    response.headers["x-vercel-ai-ui-message-stream"] = "v1"
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Connection"] = "keep-alive"
    return response
