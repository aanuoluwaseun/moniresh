# MONIRESH — AI Research Intelligence & Research Operations Platform

> **From Research Idea to Publication-Ready Evidence.**  
> The Research Operating System — not a chatbot wrapper.

**Product identity:** MONIRESH (architecture conceptualized as RIGORA) — multi-agent Research OS covering: idea → literature discovery → screening → extraction → synthesis → gap discovery → RQ → framework → methodology → data analysis → manuscript → references → journal → submission → QC.

**User can enter at any point:** no topic, has topic, has papers, has gap, has dataset, has manuscript.

## Product → Production Master Plan (fully followed)
0 Intake → 1 Product Discovery → 2 User Journeys → 3 Market → 4 Requirements → 5 MVP → 6 Product Arch → 7 Tech Arch → 8 Layers → 9 Data → 10 API → 11 UX → 12 Security → 13 Foundation → 14 Vertical slices → 15 Test → 16 Audit → 17 Optimize → 18 Deploy → 19 Monitor

Docs: `docs/PROJECT_BRIEF.md`, `USER_JOURNEYS.md`, `TECH_STACK.md`, `DATABASE_SCHEMA.md`, `API_CONTRACT.md`, `MVP_SCOPE.md`, `REQUIREMENTS.md`

## Architecture
```
USER
 ↓
PRESENTATION (Next.js 14, Tailwind, Tiptap, Recharts)
 ↓
APPLICATION (CreateProject, ScreenPaper, VerifyGap, etc.)
 ↓
DOMAIN (Project, Paper, Gap, Manuscript, Reference)
 ↓
AI ORCHESTRATION (LangGraph Orchestrator → 56 agents, Memory, Guardrails, Cost)
 ↓
RETRIEVAL (Postgres + pgvector + FTS + citation graph + reranker)
 ↓
DATA ACCESS (Supabase Postgres + Storage)
 ↓
INFRASTRUCTURE (Vercel, Redis, Sentry)
```

## Tech Stack
- **Frontend:** Next.js 14 + TypeScript + Tailwind + Tiptap
- **Backend:** Next.js API routes + Python stats service
- **DB:** Supabase Postgres + Auth + Storage + pgvector (chosen over Firebase — relational + RLS)
- **AI:** LangGraph + n8n + OpenAI/Claude/Gemini router
- **Infra:** Vercel

## Quick start
```bash
npm install
cp .env.example .env.local # fill Supabase + AI keys
npm run dev
# open http://localhost:3000
```

## Deployment (Vercel)
1. Push to GitHub: `git init; git add .; git commit -m "moniresh v1"; git remote add origin <your-repo>; git push -u origin main`
2. Vercel → Import Project → Add env vars from `.env.example` → Deploy
3. Supabase: create project → run `docs/DATABASE_SCHEMA.md` SQL → enable RLS → add URL/keys to Vercel
4. Verify: homepage, signup, create project, search, screen, gap, manuscript, quality 94/100

## Key principle
> Every claim → Source → Evidence → Confidence.  
> Never invent citations, stats, data, or ethics approval. If data doesn't exist: "I cannot produce results until dataset is supplied." (Integrity Agent)

## MVP (V1) — Literature → Gap → Manuscript
Upload/search → analysis → matrix → compare → gap discovery+verification → RQ → synthesis → Intro/Lit review with Evidence Canvas → Citation Guardian → Reference checking → Quality score

V2: Systematic Review + PRISMA + bibliometrics  
V3: Data Analysis (Python/R/SPSS)  
V4: Journal Intelligence + Submission

---
Built for Africa/Lagos — Team MONIRESH
