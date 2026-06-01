This is the knowledge base:
<knowledge-base>
<document>
    <title>Haoming Sun Resume</title>
    <markdown_content>
# Haoming Sun — AI Agent Developer

**Contact:** US Citizen, Bethesda, MD, USA | (617) 949-6758 | shmaugmini@outlook.com
**GitHub:** github.com/haoming-sun | **LinkedIn:** linkedin.com/in/haoming-sun

## Summary
Built production-grade LLM agent systems with focus on evaluation, reliability, and observability. Shipped agentic app serving 5,000+ DAU with <5% bounce rate, delivering reliable AI workflows in production.

## Education
**Rutgers University** — Bachelor's in Computer Science
Aug 2022 – May 2026, New Brunswick, NJ

## Skills
- **Languages:** Java, Python, JavaScript, SQL
- **Cloud & AI:** AWS S3, Lambda, Bedrock, AgentCore
- **Frameworks:** LangChain, Strands Agents
- **Evaluation:** LLM-as-a-Judge, LangSmith, precision/recall regression pipelines
- **Databases:** PostgreSQL RDS, Chroma (vector store)

## Professional Experience

### EasyScaleCloud — AI Agent Developer Intern
**Sep 2025 – Feb 2026 | Rockville, MD**
- Built an LLM-powered dental prior authorization agent on AWS Bedrock AgentCore (Strand Agent) with Claude 3.5 Sonnet and Lambda, automating 60% of 2M+ annual requests with 93.5% decision accuracy.
- Designed a confidence-based decision routing system (auto-approve/deny/pend/human-review) with boundary-value auto-degradation and high-risk human escalation, achieving 0% false approval rate.
- Developed an evaluation framework with LLM-as-a-Judge assessing agent reasoning across 4 dimensions, running 200 annotated test cases with results persisted in PostgreSQL RDS.
- Improved clinical extraction recall from 78% to 91% through 5 rounds of structured prompt optimization with schema-enforced output, few-shot examples, and edge-case handling for 8,000+ character clinical notes.

### Ask Gene — Software Engineer Intern
**Jun 2025 – Aug 2025 | Remote US**
- Redesigned consultant matching engine from single-pass LLM to RAG architecture using LangChain + Chroma with two-layer embedding, improving precision@3 from 0.41 to 0.74 across 3,000 profiles.
- Built a multi-turn ReAct Agent with 2 custom LangChain tools (semantic search, clarification), replacing vague triggers with a quantified 4-dimension checklist, raising match-within-2-turns from 62% to 89%.
- Developed an evaluation framework with 100 golden cases and automated precision/recall regression, running 3-version comparative eval (LLM > RAG > RAG+Agent) adopted as standard QA gate for AI releases.

### TalkMeUp Inc — Software Engineer Intern
**Jun 2025 – Aug 2025 | Pittsburgh, PA**
- Redesigned AI tutoring agent from single-pass GPT-4 to RAG architecture with multi-tenant Chroma vector store (tenant_id filtering), serving 5,000+ DAU across isolated school curricula with source-cited responses.
- Built automated eval regression pipeline with LangSmith tracing and prompt versioning, catching a chunk-size regression (precision@3: 0.79 to 0.61) before merge, adopted as QA gate for all prompt changes.

## Key Achievements
- 5,000+ Daily Active Users served with <5% bounce rate
- 93.5% decision accuracy on dental prior authorization agent
- 60% automation of 2M+ annual prior authorization requests
- 0% false approval rate on high-stakes medical decisions
- Improved precision@3 from 0.41 to 0.74 (RAG redesign at Ask Gene)
- Improved clinical extraction recall from 78% to 91% (EasyScaleCloud)
- Raised match-within-2-turns from 62% to 89% (Ask Gene ReAct Agent)
    </markdown_content>
</document>
</knowledge-base>