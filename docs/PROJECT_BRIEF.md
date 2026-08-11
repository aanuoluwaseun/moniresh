# MONIRESH — PROJECT BRIEF
> Phase 0: Project Intake | Product-to-Production Protocol

**Product:** MONIRESH (conceptualized as RIGORA)
**Category:** AI Research Intelligence & Research Operations Platform (SaaS)
**Tagline:** From Research Idea to Publication-Ready Evidence.
**Type:** Web App (SaaS) — Desktop-first Research OS, responsive tablet/mobile

### Core Problem
Researchers go through 11+ disconnected tools (Google Scholar + Zotero + Excel + SPSS + Word + citation managers + journal finders) with no evidence trail, no gap verification, no audit, and hallucinations. ChatGPT + wrappers generate text but not structured research.

### Proposed Solution
MONIRESH is a **Research Operating System** — not a chatbot. Multi-agent orchestrator that takes user from idea → literature discovery → screening → extraction → synthesis → gap discovery → question → framework → methodology → data analysis → manuscript → references → journal selection → submission readiness → quality control. User can enter at any point.

### Primary Value
Evidence at every step. Every claim linked to sources, every gap verified, every statistic checked (text ↔ table ↔ output), every citation audited against Crossref/retraction DB.

### Target Users
1. **Primary:** Masters/PhD researchers, early-career academics, research assistants (Africa, Asia, Europe)
2. **Secondary:** Supervisors, research labs, consultants, systematic review teams
3. **Operators:** Admin, QA, platform ops

### Business Model
Freemium SaaS: Free (1 project, 50 papers), Pro ($19/mo - unlimited projects, 2000 papers, AI credits), Team ($49/mo - collaboration, audit trail), Institution (custom). Credits model for LLM + extraction.

### Platforms
Web app Next.js on Vercel + backend workers. Mobile web responsive. No native app in V1.

### Expected Scale (V1)
1k-10k users, ~50k papers indexed, ~10k analysis jobs/month. Supabase Postgres + storage.

### MVP Scope (V1) — as per your direction
Literature → Analysis → Gap → Question → Manuscript
1. Upload/search papers (manual + OpenAlex/Semantic Scholar + Crossref + user upload)
2. Paper analysis & decomposition (metadata, method, variables, findings, limitations)
3. Literature matrix (Excel/CSV/BibTeX export)
4. Compare & synthesis
5. GapFinder + Gap Verification + Novelty Score
6. Research question generation
7. Introduction & literature review generators with evidence canvas
8. Citation Guardian + Reference Manager (APA7 etc via DOI)
9. Manuscript workspace (Tiptap-like)
10. Research quality score

**V2:** Systematic Review (PRISMA, deduplication, screening, bibliometrics)
**V3:** Data Analysis (Python, R, SPSS, stats, assumption checker, code generation)
**V4:** Journal Intelligence (matchmaker, integrity, formatting, submission auditor)
**V5:** Full lifecycle + collaboration

### Success Metrics
- Time from idea to gap verification < 15 min (vs days manually)
- Citation accuracy > 98% (vs 60% wrappers)
- Screening speed: 2000 abstracts in <10 min with audit trail
- Manuscript readiness score
- User retention (weekly active researching)

### Constraints
- No scraping where prohibited. Use authorized APIs (Scopus, WoS where user has subscription, Semantic Scholar, OpenAlex, Crossref, Europe PMC, arXiv, DOAJ, CORE)
- Never invent statistics, references, data, ethics approval
- GDPR + research ethics compliant

### Unknowns / Assumptions
- User has at least one of: research idea, papers, dataset, or manuscript
- Approx 60% need literature gap work, 30% manuscript, 10% data analysis first
- Initial LLM: OpenAI + Claude router; embeddings: OpenAI text-embedding-3

### Gate 0 Exit Criteria
✅ Brief approved → Proceed to Product Discovery & User Journeys
