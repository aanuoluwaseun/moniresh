# MONIRESH - API CONTRACT
> Phase 11 | REST (Next.js Route Handlers) + Python stats service

All routes under `/api/v1`, JSON, Zod validation, RLS via Supabase auth.

## Projects
```
POST   /api/projects            auth: required, perm: project:create
  { title, field, description } → { id, title, progress }

GET    /api/projects            → { projects: [...] }
GET    /api/projects/:id
PATCH  /api/projects/:id        { title, researchQuestion, theory }
DELETE /api/projects/:id

POST   /api/projects/:id/search-build
  { idea: "AI adoption in higher education" } 
  → { keywords, synonyms, boolean, dbQueries: {scopus, wos, openalex} }

POST   /api/projects/:id/papers/search
  { query, sources: ["openalex","semantic_scholar","crossref"], filters }
  → { papers: [...], counts, searchMeta }

POST   /api/projects/:id/papers/upload  multipart RIS/BibTeX/CSV/PDF[]
  → { imported, duplicates }

POST   /api/projects/:id/deduplicate   → { before: 2847, after: 2284, clusters }

POST   /api/projects/:id/screen
  { inclusionCriteria, exclusionCriteria } → jobId (async)
GET    /api/jobs/:jobId        → { status, decisions: [{paperId, decision, confidence, reason}] }

GET    /api/projects/:id/prisma → { identified, duplicates, screened, included, flow }

POST   /api/papers/:id/extract  → { extraction } (LangGraph analyzer)
GET    /api/projects/:id/matrix?format=excel|csv|json

POST   /api/projects/:id/gaps/find       → { gaps: [...], noveltyScores }
POST   /api/projects/:id/gaps/verify     { gapId } → { confidence, counterEvidence }

POST   /api/projects/:id/synthesize   { theme } → { synthesis, claims: [{claim, sources, confidence}] }

POST   /api/projects/:id/questions/generate → { questions, objectives, hypotheses }

POST   /api/manuscripts/:id/generate     { section: "introduction"|"literature_review" }
  → { content, citations, evidenceLinks }

POST   /api/manuscripts/:id/audit
  → { citationAccuracy, evidenceCoverage, statisticalConsistency, readiness }

POST   /api/references/resolve   { doi } → { metadata, apa }
POST   /api/references/check-retraction { doi } → { retracted, notices }

POST   /api/journals/match     { manuscriptId } → { matches: [{journal, fit, apc, quartile, risk}] }

POST   /api/stats/analyze      (proxied to Python)
  { fileUrl, analysisType } → { tables, figures, interpretation, code: {python, r} }
```

### Auth & Security
- Supabase JWT in Authorization: Bearer
- All mutating routes check ownership via RLS
- Rate: 60 req/min free, 600 pro; AI routes 20/min
- Never expose OPENAI_API_KEY, SUPABASE_SERVICE_ROLE

### Errors
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": {...} } }
```
