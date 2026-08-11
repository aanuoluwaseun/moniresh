# MONIRESH - USER JOURNEYS
> Phase 2 | Product-to-Production Protocol

## Primary Actors
- Researcher (author), Supervisor/Reviewer, Admin

## Journey 1: Idea → Gap → Question (Killer Loop)
```
Visitor → Landing → Signup → Onboarding (field, level, goal) → Dashboard
→ [Find Topic] → Topic Scout: emerging/under-researched/contradictory gaps
→ Select Opportunity (Overall 89/100) → Gap Verification (search against Nigeria, dissertations, 2024-26)
→ Gap Confidence 87% → Generate RQ + Objectives + Hypotheses → Save to Project
```
States: Empty (no idea) → Loading (searching 3 scholarly graphs) → Loaded (ranked map) → Verified → Error (rate limit fallback to cached)

## Journey 2: Upload → Screen → Matrix
```
Dashboard → Create Project → Upload RIS/BibTeX/PDF/CSV (or Search Builder)
→ Deduplication Engine (exact DOI + near-title + preprint) → 2847 → 2284
→ Define inclusion/exclusion → Screening Agent (Include 96%, Exclude 94%, Maybe 61%)
→ Human approves Maybe → PRISMA auto → Evidence Extraction → Matrix (Export Excel)
```
Edge: duplicate preprint vs journal, withdrawn article flag.

## Journey 3: Collect → Synthesize → Visualize
```
2284 → Full-Text Analyzer decomposes each paper (theory, variables, population, sample, stats)
→ Synthesis Agent: consensus vs contradiction → GapFinder grid (Theory × Geography × Population)
→ Gap Visualizer (bar/heatmap) → Contradiction Detector (X→Y positive vs null)
```

## Journey 4: Write Manuscript (Evidence Canvas)
```
Manuscript Workspace (Google Docs + Overleaf + Notion)
Left: Outline (Title/Abstract/Intro/Lit Review/Framework/Method/Results/Discussion)
Center: Editor (Tiptap) - every claim has citation pill [Zhang et al. 2024]
Right: AI Research Panel - Evidence (3 sources), Gap (missing link), Suggestion (connect contradiction)
Bottom: Sources / Comments / Audit Trail
Human writes → Citation Guardian checks claim→source alignment → Coverage score 91%
```

## Journey 5: Audit → Journal → Submit
```
Manuscript → Compliance Checker → Table Analyzer (text vs table vs output: p=.183 but says supported → flag)
→ Reference Freshness (42% last 5 years) → Retraction Checker → Similarity (integration)
→ Journal Matchmaker (Fit 94%, APC, Q1) → Risk Detector (predatory) → Formatting Agent
→ Submission Auditor → Cover Letter → Readiness 93/100
```

## Journey 6: Data Analysis (V3)
```
Upload CSV/Excel/SPSS → Profiler (missing, outliers, types) → Assumption Checker (normality, VIF)
→ Agent picks method (regression/SEM/ANOVA) → Generates Python/R/SPSS code → Output tables
→ Results Writer (no invented stats) → Discussion Agent (compare to literature)
```

## Permissions
- Owner: all
- Editor: write, cannot delete project
- Viewer: read
- Admin: cross-tenant audit
