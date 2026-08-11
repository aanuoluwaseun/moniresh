# MONIRESH - DATA ARCHITECTURE
> Phase 10 | Supabase Postgres

```sql
-- Enable extensions
create extension if not exists "pgcrypto";
create extension if not exists vector; -- pgvector

-- USERS (via supabase auth.users)
-- profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  field text,
  level text,
  created_at timestamptz default now()
);

-- PROJECTS (Research Memory root)
create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) not null,
  title text not null,
  field text,
  status text default 'active', -- active, screening, writing, done
  research_question text,
  theory text,
  journal_target text,
  progress int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index on projects(owner_id);

-- PAPERS
create table papers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  doi text,
  title text not null,
  authors text[],
  year int,
  journal text,
  abstract text,
  citations int,
  source text, -- openalex, semantic_scholar, upload
  pdf_url text,
  unique (project_id, doi)
);
create index on papers(project_id);
create index on papers using gin(to_tsvector('english', title || ' ' || coalesce(abstract,'')));

-- SCREENING DECISIONS (audit trail)
create table screening (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid references papers(id) on delete cascade,
  decision text check (decision in ('Include','Exclude','Maybe')),
  confidence numeric(5,2),
  reason text,
  inclusion_criteria jsonb,
  reviewed_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- EXTRACTIONS (Paper Intelligence)
create table extractions (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid references papers(id) on delete cascade unique,
  research_problem text,
  objectives text[],
  theory text,
  variables jsonb, -- {iv, dv, mediators, moderators}
  population text,
  country text,
  sample_size int,
  method text,
  findings text,
  limitations text,
  future_research text,
  quality_score numeric
);

-- GAPS
create table gaps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  type text, -- population, geographic, methodological, theoretical
  evidence text,
  novelty int, feasibility int, publication int, overall int,
  verification_status text, -- verified, rejected, pending
  confidence int
);

-- MANUSCRIPT
create table manuscripts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text,
  content jsonb, -- tiptap JSON
  word_count int,
  citation_coverage numeric,
  readiness int,
  updated_at timestamptz default now()
);

-- REFERENCES (pull from Crossref via DOI, never LLM invent)
create table references (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  doi text,
  raw jsonb, -- crossref metadata
  style_apa text,
  retracted boolean default false
);

-- VECTORS (source-aware RAG)
create table embeddings (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid references papers(id) on delete cascade,
  chunk text,
  embedding vector(1536),
  source_layer text -- metadata, semantic, evidence
);

-- JOBS (long-running orchestrator)
create table jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  type text, -- screen, extract, gap_find, synthesize
  status text, -- queued, running, done, error
  payload jsonb,
  result jsonb,
  created_at timestamptz default now()
);

-- RLS: enable and policies (owner can read/write own project data)
alter table projects enable row level security;
create policy "owner CRUD" on projects for all using (auth.uid() = owner_id);
-- similar policies for papers where project.owner_id = auth.uid() via join
```

Relationships: Project 1-N Papers 1-1 Extraction, Project 1-N Gaps, Project 1-1 Manuscript.

Indexes: GIN full-text on papers, IVFFlat on embeddings.

Soft deletion via deleted_at where needed; timestamps everywhere; audit via screening table.
