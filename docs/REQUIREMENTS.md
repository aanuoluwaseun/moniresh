# MONIRESH - REQUIREMENTS
> Phase 4

## Functional Requirements
FR-001 User can sign up / sign in (email + Google OAuth) via Supabase Auth
FR-002 User can create / rename / delete research projects
FR-003 User can build Boolean search (keywords, synonyms, DB-specific) and preserve reproducibility
FR-004 User can search scholarly sources (OpenAlex, Semantic Scholar, Crossref) + upload RIS/BibTeX/PDF
FR-005 System deduplicates (DOI, title, near-title, preprint) and reports clusters
FR-006 User can define inclusion/exclusion criteria
FR-007 System screens each paper: decision, confidence, reason + audit trail
FR-008 System auto-generates PRISMA flow + export
FR-009 System decomposes papers: problem, theory, variables, pop, sample, method, findings, limitations
FR-010 System builds Evidence Matrix and exports Excel/CSV/BibTeX/RIS
FR-011 Synthesis Agent produces consensus/contradiction summary across studies
FR-012 GapFinder discovers population/geographic/methodological/theoretical/variable gaps
FR-013 Gap Verification searches against gap claim and returns confidence %
FR-014 System scores novelty/feasibility/publication/overall 0-100
FR-015 System generates RQ, objectives, hypotheses linked to gap
FR-016 Manuscript workspace with inline citation pills [Author Year] linked to evidence canvas
FR-017 Citation Guardian verifies claim→source alignment, no fake citations (DOI→Crossref)
FR-018 Reference Manager supports APA7/Harvard/IEEE etc via DOI metadata
FR-019 System tracks citation coverage per section + reference freshness
FR-020 Quality score aggregated (citation accuracy, coverage, alignment, statistical consistency, novelty, journal compliance)
FR-021 (V2) Journal Matchmaker returns fit, APC, quartile, OA, scope
FR-022 (V2) Table Analyzer checks text↔table↔output consistency
FR-023 (V3) Data Analysis upload + assumption check + code generation (Python/R)

## Non-Functional
NFR-001 Performance: dashboard < 1.5s, screening 2000 papers <10 min (async job), manuscript editor 60fps
NFR-002 Availability 99.5% (Vercel + Supabase)
NFR-003 Security: RLS, OWASP (XSS, CSRF, IDOR, SSRF, prompt injection), no secrets in client, rate limits 60/min free
NFR-004 Privacy: GDPR, project isolation, RLS, no cross-user context leakage
NFR-005 Accessibility WCAG 2.1 AA, keyboard nav, ARIA
NFR-006 Maintainability: layered architecture, domain isolated, tests >80% domain
NFR-007 Observability: error rate, latency, job status, cost per generation, business (signups, WAU)
NFR-008 SEO: landing public, app behind auth
