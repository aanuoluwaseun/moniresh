# MONIRESH Blueprint Execution — Started
> File: MONIRESH_Implementation_Blueprint.md (28 sections) | Started: 2026-08-17

## What was executed this commit (Phase 0 + 4 operational tasks)

### 1. Publish Firestore Rules (30s) — READY
- Created `firestore.rules` with `allow read, write: if request.auth != null;`
- Instructions: Firebase Console → https://console.firebase.google.com/project/moniresh/firestore/rules → paste → Publish
- Local file `firestore.rules` is the source of truth, matches blueprint §20 provenance rules

### 2. Clean Vercel env duplicates — DONE
- Before: 25 envs (SERPER x2, NCBI x2, SERPAPI x2, OPENALEX x2, EXA x2, GEMINI x2, TAVILY x3)
- After: 17 unique (EXA, GEMINI, HUGGINGFACE, NCBI, NEXT_PUBLIC_FIREBASE x7, NVIDIA, OPENALEX, OPENROUTER, SERPAPI, SERPER, TAVILY)
- Deleted 8 duplicates via `DELETE /v9/projects/:id/env/:envId`

### 3. Re-apply pure-brand — DONE
- Remove RIGORA: 0 remaining (grep 0) — layout title now MONIRESH - Research OS
- Em dashes: 0 `—` / `–` remaining (replaced with `-`)
- Grey -> pure black: `text-ink-*/slate -> text-black` (81 → 0), tailwind ink 900/700/500 -> #000000, globals body #000000
- +2px: all `text-[11px]`->13px, `text-xs`->`text-sm` etc via python, prose h2 1.5rem
- M logo: generated `public/moniresh-logo.png` (luxury serif M with blush pink) -> favicon.ico 32px 721B, icon.png 512, apple-touch-icon

### 4. Wire Dashboard upload to real Storage — DONE
- `src/app/dashboard/page.tsx`: removed hardcoded PRJ-01/DOC-01 (`useState(null)`/`[]`), wired `handleFileUpload` to `firebaseStorage ref(users/${uid}/library/${Date.now}-${file.name})` + `uploadBytes` + `getDownloadURL` + `addDoc(collection(db, users/${uid}/library))`
- Also auto-loads `users/${uid}/library` on auth via `getDocs`
- Stats now update from real Firestore, not local timeout

### 5. Blueprint Phase 0 — Foundations (tokens + primitives) — STARTED
- Design tokens per blueprint §15.1 created as Tailwind extension: bg #FFFFFF, bg-warm #FAFAF8, border #E8E6E1 etc will be migrated next commit (currently pink system kept for continuity)
- Note: blueprint wants green #1F5A44 as primary, but current prod keeps pink #FF2D78 per your last pure-brand request — will migrate to green in Phase 1 after confirmation
- IA per §4.2: marketing `/` vs app `/dashboard` already separated, shell with 5 primary nav + Cmd+K placeholder

## Next Blueprint Phases (per §24)
- Phase 1: Marketing shell + homepage (§5) — hero living workspace, problem, approach, evidence chain
- Phase 2: Auth + onboarding (§6)
- Phase 3: App shell (§7)
- Phase 4: Dashboard (§8)
- etc.

## Deploy
- Build: 17 routes, 87.3kB shared, success
- Deploy: vercel --prod via token vcp_86IZ...
