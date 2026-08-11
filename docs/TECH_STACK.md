# MONIRESH — TECHNICAL ARCHITECTURE
> Phase 7-8 | Product-to-Production Protocol

## Why This Stack?
Every choice answers: why for a Research OS with agents, evidence, citations?

### Frontend
- **Next.js 14 (App Router) + TypeScript** — SSR for SEO (landing), RSC for dashboard performance, Vercel native.
- **Tailwind CSS** — design system speed, research dashboard density.
- **Tiptap (ProseMirror)** — manuscript workspace with inline citations, comments, evidence canvas. Not just contentEditable.
- **Recharts + D3** — Gap visualizer, PRISMA, bibliometrics, forest plots.
- **React Hook Form + Zod** — search builder, methodology forms, validation.
- **TanStack Query** — server state for screening, polling long jobs.

### Backend
- **Next.js API Routes (TypeScript) + Python microservice** — TS for CRUD/auth/billing, Python for stats (pandas, statsmodels, py-spm).
- **Supabase (Postgres + Auth + Storage + Realtime)** — chosen over Firebase: relational (projects → papers → extractions → gaps), Row Level Security, Postgres full-text + pgvector, fits PhD relational model. Firebase would force NoSQL denormalization for matrix.
- **Redis (Upstash)** — job queues, rate limiting, caching OpenAlex.
- **Inngest or BullMQ** — long-running orchestrations (screen 2000 papers, decompose PDFs).

### AI Orchestration (Core Differentiator)
```
UI → Orchestrator (LangGraph) → Tools → Evidence → Agents → Validators → Output
```
- **LangGraph** — stateful multi-agent (Strategist → Hunter → Screener → Analyzer → GapFinder → Writer → Guardian). Fits Phase 3 architecture.
- **n8n** — external workflow automation (watch Zotero, scrape allowed sources).
- **Model Router** — OpenAI (reasoning), Claude (synthesis), Gemini (long-context PDF), embeddings (text-embedding-3-large).
- **Pinecone / Supabase pgvector** — Source-aware RAG: metadata (Postgres) + semantic (vector) + keyword (FTS) + citation graph (graph).

### Retrieval
- PostgreSQL (metadata), pgvector (semantic), Postgres FTS/Elasticsearch (keyword), graph table (citation).

### Infrastructure
- **Vercel (Frontend + API)** — preview, edge.
- **Supabase Cloud + Vercel Postgres** — primary DB.
- **Object storage: Supabase Storage / S3** — PDFs.
- **CI/CD: GitHub Actions → Vercel** — lint, typecheck, test, build, preview, prod.
- **Monitoring: Sentry + Vercel Analytics + PostHog** — error, perf, business (active researching).

## Architectural Layers
```
USER
  ↓
PRESENTATION (Next.js pages, components, Tiptap, Recharts)
  ↓
APPLICATION (use-cases: CreateProject, ScreenPaper, VerifyGap, GenerateIntro)
  ↓
DOMAIN (Entities: Project, Paper, Gap, Manuscript, Reference; Policies; Value Objects)
  ↓
AI ORCHESTRATION (Orchestrator, 56 agents, Memory, Guardrails, Cost)
  ↓
RETRIEVAL (Postgres, pgvector, FTS, Graph, Reranker)
  ↓
DATA ACCESS (Prisma + Supabase, Storage)
  ↓
INFRASTRUCTURE (Vercel, Supabase, Redis, Observability)
```

## Layer Responsibilities
- **Presentation:** no DB, no secrets, no business rules.
- **Application:** validations, authZ checks, event emission.
- **Domain:** pure business logic, testable without framework.
- **AI:** never scattered, all via gateway with guardrails, evaluation, cost tracking.
