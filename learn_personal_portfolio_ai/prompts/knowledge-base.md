This is the knowledge base:
<knowledge-base>
<document>
    <title>Haoming Sun Resume</title>
    <markdown_content>
# Haoming Sun — AI Agent Developer

**Contact:** US Citizen, Bethesda, MD, USA | (617) 949-6758 | shmaugmini@outlook.com
**GitHub:** github.com/haoming-sun | **LinkedIn:** linkedin.com/in/haoming-sun-b63820312

## Summary
Built production-grade LLM agent systems across healthcare, fintech, and enterprise domains with focus on evaluation, reliability, and observability. Shipped 3 agentic systems in production, including a dental prior authorization agent automating 60% of 2M+ annual requests and a clinical scheduling assistant for OB/GYN wards.

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

#### Dental Prior Authorization Agent (https://github.com/shm6886/haoming-prompt-risk-eval.git)
- Built an LLM-powered dental prior authorization agent on AWS Bedrock AgentCore (Strand Agent) with Claude 3.5 Sonnet and Lambda, automating 60% of 2M+ annual requests with 93.5% decision accuracy.
- Designed a confidence-based decision routing system (auto-approve/deny/pend/human-review) with boundary-value auto-degradation and high-risk human escalation, achieving 0% false approval rate.
- Developed an evaluation framework with LLM-as-a-Judge assessing agent reasoning across 4 dimensions, running 200 annotated test cases with results persisted in PostgreSQL RDS.
- Improved clinical extraction recall from 78% to 91% through 5 rounds of structured prompt optimization with schema-enforced output, few-shot examples, and edge-case handling for 8,000+ character clinical notes.

#### Small Business Loan Business Intelligence Agent (https://smb-lens.haomingsun.me)
- Built a conversational AI agent that lets fintech lending teams analyze loan portfolios in natural language, turning ad-hoc SQL exploration into a chat-based workflow for underwriters and risk managers.
- Designed analytical logic for risk-pricing alignment, concentration risk, approval leakage, early-warning signals, and customer lifecycle value, translating fuzzy business concepts into reproducible SQL queries.
- Implemented an agent architecture with structured tool calling over a curated analytics catalog, enabling underwriters to drill from portfolio overviews into officer scorecards, late-payment trends, and recovery rates.
- Developed an evaluation framework that re-runs the SQL behind each agent answer and flags numerical mismatches, catching hallucinated figures before they reach underwriters.

#### AI Scheduling Assistant for OB/GYN Wards (https://haominghealth.me/)
- Built a conversational AI Agent on AWS Bedrock with Claude and Lambda, orchestrating 6 specialized tools with 1 read-only DB query and 5 validation Lambda invocations, enforcing safety-first patterns.
- Implemented 5 clinical reasoning scenarios, including shift handover, bed scheduling, length-of-stay prediction, and vital-sign alerting with Agent-driven orchestration.
- Designed PostgreSQL schema (11 tables) modeling obstetric workflows with time-series data, enabling Agent trend analysis and discharge-time prediction based on clinical rules.
- Built a full-stack system integrating Next.js, FastAPI, Agent Lambda orchestration, and NeonDB/S3 storage with IAM-based access control and Presigned URLs for secure clinical report generation.

## Key Achievements
- 93.5% decision accuracy on dental prior authorization agent
- 60% automation of 2M+ annual prior authorization requests
- 0% false approval rate on high-stakes medical decisions
- Improved clinical extraction recall from 78% to 91% (Dental Prior Authorization Agent)
- Built 3 production AI agent systems during single internship at EasyScaleCloud
    </markdown_content>
</document>
</knowledge-base>