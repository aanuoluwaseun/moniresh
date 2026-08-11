# MONIRESH — AGENT MODE RESEARCH OPERATING PROTOCOL
**Autonomous 15-Stage Research Lifecycle, 24-Column Evidence Matrix Automation & APA 7th Edition SOP**  
**Style Baseline:** APA 7th Edition (with DOI metadata verification via Crossref)  
**AI Gateway Stack:** OpenRouter (Claude 3.5 Sonnet / GPT-4o) + Hugging Face (Llama 3 8B Batch) + NVIDIA NIM (Llama 3.1 405B / NV-Embed / NeVA-22B)

---

## 1. What Academic Research Writing Entails

Academic research writing is a formal, evidence-based process of discovering, appraising, synthesizing, and communicating scholarly knowledge. In MONIRESH Agent Mode, research writing is treated as a structured **Research Operating System** rather than an unstructured chatbot prompt. A rigorous study aligns six core elements:

> **CENTRAL QUALITY RULE:**  
> **Problem → Question → Objective → Evidence & Method → Analysis → Conclusion**

Every claim in a manuscript must be traceable to empirical findings or published evidence. MONIRESH enforces an absolute ethical boundary:
- **No invented citations** — references are fetched via Crossref/DOI.
- **No invented statistical results** — p-values, effect sizes, and degrees of freedom are derived from real dataset execution or published tables.
- **No fabricated ethics approval** — if ethics approval or dataset files do not exist, the agent explicitly flags the requirement.

---

## 2. The 15-Stage Autonomous Agent Mode Protocol

Traditionally, researchers manually manage project progression across 15 distinct stages. MONIRESH Agent Mode automates every stage from `research_project_tracker_template.csv`, assigning each step to a specialized AI orchestrator:

| Stage | Manual Research Task | MONIRESH Autonomous Agent Mode Action | AI Gateway Provider |
| :--- | :--- | :--- | :--- |
| **1. Intake** | Confirm brief, rubric, word counts, and formatting constraints. | **Research Strategist Agent** parses project parameters, deadline, and target journal guidelines. | OpenRouter (Claude 3.5) |
| **2. Scope** | Conduct initial feasibility search to check existing literature. | **Topic Discovery Scout** searches scholarly landscape, ranks opportunities by novelty and feasibility score. | NVIDIA NIM (Llama 3.1 405B) |
| **3. Question** | Finalize problem statement, research questions, and hypotheses. | **Research Question Agent** checks logical alignment from problem → gap → objective → hypotheses. | OpenRouter (GPT-4o) |
| **4. Protocol** | Define eligibility criteria, Boolean search strings, and databases. | **Protocol & Eligibility Agent** generates reproducible Boolean syntax for Scopus, OpenAlex, PubMed. | OpenRouter (Claude 3.5) |
| **5. Search** | Run database queries, download metadata, and document search logs. | **Literature Hunter Agent** connects to legal APIs (OpenAlex, Semantic Scholar, Crossref) and logs hits. | Hugging Face / OpenAlex API |
| **6. Screening** | De-duplicate records and screen titles/abstracts against criteria. | **Deduplication & Screening Agent** removes duplicates and batch-classifies papers (Include / Exclude / Maybe). | Hugging Face (Llama 3 8B) |
| **7. Appraisal** | Critically appraise included studies for methodology and bias. | **Critical Appraisal Agent** evaluates study validity, sampling adequacy, and risk of bias. | OpenRouter (Claude 3.5) |
| **8. Extraction** | Manually transcribe data into 24-column evidence matrix. | **Full-Text Analyzer** automatically decomposes papers into all 24 columns of the Literature Matrix. | OpenRouter (Gemini 2.0 Flash) |
| **9. Synthesis** | Group findings into themes and identify research gaps. | **Evidence Synthesizer & GapFinder** compares 1000+ papers, detects contradictions, and verifies gaps. | NVIDIA NIM (Llama 3.1 405B) |
| **10. Analysis** | Clean dataset, test statistical assumptions, run regressions. | **Statistical Intelligence Agent** profiles CSV/SPSS, tests OLS/ANOVA assumptions, generates Python syntax. | NVIDIA NIM / Python engine |
| **11. Outline** | Build detailed IMRaD or thesis argument outline. | **Introduction & Outline Architect** structures paper with paragraph-level claim-to-evidence mapping. | OpenRouter (Claude 3.5) |
| **12. Drafting** | Write manuscript chapters while citing supporting studies. | **Academic Voice Writer** drafts text in a clear academic tone with inline DOI-linked citations. | OpenRouter (Claude 3.5) |
| **13. Revision** | Check flow, transitions, and text-to-table statistical agreement. | **Academic Voice Editor & Table Analyzer** audits p-values against tables and improves prose clarity. | NVIDIA NIM (NeVA-22B) |
| **14. QA** | Audit APA 7th formatting, citation completeness, and retractions. | **Citation Guardian** runs 7-Pass Quality Control, Crossref DOI check, and Retraction Watch audit. | OpenRouter / Crossref API |
| **15. Submission** | Prepare cover letter, check journal scope, APC, and word count. | **Journal Matchmaker & Submission Auditor** verifies journal quartile, OA status, and compliance. | OpenRouter (Claude 3.5) |

---

## 3. Document Sourcing & Authorized APIs

MONIRESH retrieves scholarly literature via legal, authorized APIs and open scholarly infrastructure rather than unauthorized scraping. The platform categorizes document sources into six reliable domains:

1. **Open Scholarly Infrastructure (Public / Open Access):** OpenAlex, Semantic Scholar API, Crossref, DOAJ, CORE, arXiv (for preprints/computer science), Europe PMC, and PubMed Central. Provides rich metadata, abstracts, citation graphs, and open-access PDFs.
2. **Subscription & Licensed Scholarly Databases:** Scopus (Elsevier Developer Portal API), Web of Science (Clarivate Developer API), IEEE Xplore, and JSTOR. Accessed via user/institutional API tokens or Zotero library connectors.
3. **Government, Policy, and Statistical Datasets:** World Bank Data API, OECD Stat, WHO Global Health Observatory, UNESCO Institute for Statistics, ICPSR, and national statistical bureaus for empirical datasets.
4. **The Researcher's Local Library:** Zotero libraries, BibTeX/RIS export files, institutional repository uploads, and direct PDF uploads analyzed locally.
5. **Citation Chaining Engines:** Backward reference chaining (cited works) and forward citation chaining (later citing works) via Crossref and Semantic Scholar citation networks.
6. **Integrity & Retraction Verification:** Retraction Watch database, Crossref Crossmark, and COPE / DOAJ indexing checks to prevent citing retracted or predatory publications.

---

## 4. The 24-Column Literature Evidence Matrix Automation

The uploaded `literature_evidence_matrix_template.csv` defines 24 critical columns required for systematic reviews and empirical synthesis. MONIRESH Agent Mode automatically populates this matrix for every included paper using Gemini 2.0 Flash (for full-text PDF decomposition) and Claude 3.5 Sonnet (for thematic synthesis):

1. **Columns 1–5 (Bibliographic & Identification):** `Record_ID`, `Full_APA_Reference` (formatted automatically via Crossref DOI), `DOI_or_Stable_URL`, `Publication_Type` (journal, book, conf), `Peer_Review_Status`.
2. **Columns 6–11 (Study Design & Methods):** `Country_or_Context`, `Aim_or_Research_Question`, `Theory_or_Framework`, `Design_and_Methods`, `Population_or_Sample` (with sample size N), `Variables_Measures_or_Qualitative_Focus`.
3. **Columns 12–16 (Findings & Appraisal):** `Analysis_Method`, `Main_Findings`, `Effect_Estimate_or_Theme_and_Uncertainty` (e.g., $r = .42, p < .01$), `Limitations_or_Risk_of_Bias`, `Funding_and_Conflicts`.
4. **Columns 17–20 (Evidence Extraction — Three-Note Rule):** `Relevant_Quotation` (verbatim text), `Page_or_Paragraph`, `Your_Paraphrase_or_Interpretation`, `Theme_or_Planned_Section` (e.g., Intro, Lit Review Theme A).
5. **Columns 21–24 (Screening & Integrity Audit):** `Include_or_Exclude` (Include / Exclude / Maybe), `Exclusion_Reason`, `Correction_or_Retraction_Status` (verified via Crossmark), `Verification_Notes`.

The **Three-Note Rule** is strictly enforced: every cell in the matrix stores (1) the verbatim quotation and exact page, (2) the researcher's objective paraphrase, and (3) the synthesis tag showing where the finding fits into the paper outline.

---

## 5. APA 7th Edition Citation Guardian & Reference SOP

MONIRESH enforces APA 7th Edition rules across all inline citations and reference lists. The Citation Guardian audits the manuscript before export to ensure 100% citation integrity:

- **In-Text Citation Formatting:** One author: `(Author, 2025)`. Two authors: `(Author & Author, 2025)`. Three or more authors: `(Author et al., 2025)`. Direct quotations require page numbers: `(Author, 2025, p. 42)`.
- **Journal Article Reference Template:**  
  Author, A. A., & Author, B. B. (Year). Title of article in sentence case. *Title of Journal in Title Case and Italics*, *Volume*(Issue), Page–range. `https://doi.org/xxxxx`
- **Book Reference Template:**  
  Author, A. A. (Year). *Title of book in italic sentence case* (2nd ed.). Publisher Name. `https://doi.org/xxxxx`
- **Edited Chapter Reference Template:**  
  Author, A. A. (Year). Title of chapter. In E. E. Editor (Ed.), *Title of book in italics* (pp. xx–xx). Publisher Name.
- **Automated 7-Pass Citation Audit:**
  1. Every in-text citation has a corresponding reference list entry.
  2. Every reference list entry is cited at least once in-text.
  3. Crossref DOI hyperlinks are valid and active.
  4. No retracted articles are cited without explicit disclaimer.
  5. No secondary citations (*as cited in*) are used when primary sources are accessible.
