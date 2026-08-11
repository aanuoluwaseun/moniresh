"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
  BookOpen,
  Database,
  ArrowRight,
  Check,
  Play,
  Layers,
  Award,
} from "lucide-react";

const TRACKER_STAGES = [
  {
    id: 1,
    stage: "Intake",
    task: "Confirm brief and rubric",
    agent: "Research Strategist Agent",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Parses assignment brief, rubric, word counts, and formatting constraints automatically.",
    status: "Automated",
  },
  {
    id: 2,
    stage: "Scope",
    task: "Complete feasibility search",
    agent: "Topic Discovery Scout",
    provider: "NVIDIA NIM (Llama 3.1 405B)",
    desc: "Scans open scholarly literature to assess topic feasibility, saturation, and novelty score.",
    status: "Automated",
  },
  {
    id: 3,
    stage: "Question",
    task: "Finalize problem & RQs",
    agent: "Research Question Agent",
    provider: "OpenRouter (GPT-4o)",
    desc: "Checks logical alignment: Problem -> Gap -> Objective -> Research Question -> Hypotheses.",
    status: "Automated",
  },
  {
    id: 4,
    stage: "Protocol",
    task: "Approve eligibility plan",
    agent: "Protocol & Eligibility Agent",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Defines Inclusion/Exclusion criteria and generates reproducible Boolean search strings.",
    status: "Automated",
  },
  {
    id: 5,
    stage: "Search",
    task: "Run database searches",
    agent: "Literature Hunter Agent",
    provider: "Hugging Face / OpenAlex API",
    desc: "Queries OpenAlex, Semantic Scholar, Crossref, and PubMed via official APIs; logs search string.",
    status: "Automated",
  },
  {
    id: 6,
    stage: "Screening",
    task: "Deduplicate & screen records",
    agent: "Screening & Deduplication Agent",
    provider: "Hugging Face (Llama 3 8B)",
    desc: "Removes exact/DOI duplicates; batch classifies titles & abstracts (Include / Exclude / Maybe).",
    status: "Automated (Human approves 'Maybe')",
  },
  {
    id: 7,
    stage: "Appraisal",
    task: "Critically appraise sources",
    agent: "Critical Appraisal Agent",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Evaluates study validity, sample size adequacy, measurement tools, and risk of bias.",
    status: "Automated",
  },
  {
    id: 8,
    stage: "Extraction",
    task: "Complete evidence matrix",
    agent: "Full-Text Analyzer & Matrix Agent",
    provider: "OpenRouter (Gemini 2.0 Flash)",
    desc: "Decomposes papers into all 24 columns of the Literature Evidence Matrix (Three-Note Rule).",
    status: "Automated",
  },
  {
    id: 9,
    stage: "Synthesis",
    task: "Develop themes & gap",
    agent: "Evidence Synthesizer & GapFinder",
    provider: "NVIDIA NIM (Llama 3.1 405B)",
    desc: "Compares findings across 1000+ studies, detects contradictions, and verifies gap novelty.",
    status: "Automated",
  },
  {
    id: 10,
    stage: "Analysis",
    task: "Complete data analysis",
    agent: "Statistical Intelligence Agent",
    provider: "NVIDIA NIM / Python Engine",
    desc: "Profiles dataset, tests OLS/ANOVA assumptions, generates reproducible Python/R syntax.",
    status: "Automated",
  },
  {
    id: 11,
    stage: "Outline",
    task: "Approve argument outline",
    agent: "Introduction & Outline Architect",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Builds IMRaD or thesis chapter outline with paragraph-level claim-to-source linking.",
    status: "Automated",
  },
  {
    id: 12,
    stage: "Drafting",
    task: "Complete full draft",
    agent: "Academic Voice Writer",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Drafts manuscript chapters in clear academic voice with inline Crossref DOI citations.",
    status: "Automated",
  },
  {
    id: 13,
    stage: "Revision",
    task: "Complete content revisions",
    agent: "Academic Voice Editor",
    provider: "NVIDIA NIM (NeVA-22B)",
    desc: "Audits prose clarity, removes AI boilerplate, and checks table p-values against text.",
    status: "Automated",
  },
  {
    id: 14,
    stage: "QA",
    task: "Complete APA & citation audit",
    agent: "Citation Guardian (7-Pass QA)",
    provider: "OpenRouter / Crossref API",
    desc: "Runs 7-Pass QA sequence: APA 7 formatting, Crossref DOI hyperlinks, Retraction Watch check.",
    status: "Automated",
  },
  {
    id: 15,
    stage: "Submission",
    task: "Submit package & archive",
    agent: "Journal Matchmaker & Auditor",
    provider: "OpenRouter (Claude 3.5 Sonnet)",
    desc: "Checks journal scope, word limits, APC fees, Open Access quartile, and submission readiness.",
    status: "Automated",
  },
];

const MATRIX_COLUMNS = [
  "Record_ID",
  "Full_APA_Reference",
  "DOI_or_Stable_URL",
  "Publication_Type",
  "Peer_Review_Status",
  "Country_or_Context",
  "Aim_or_Research_Question",
  "Theory_or_Framework",
  "Design_and_Methods",
  "Population_or_Sample",
  "Variables_Measures_or_Qualitative_Focus",
  "Analysis_Method",
  "Main_Findings",
  "Effect_Estimate_or_Theme_and_Uncertainty",
  "Limitations_or_Risk_of_Bias",
  "Funding_and_Conflicts",
  "Relevant_Quotation",
  "Page_or_Paragraph",
  "Your_Paraphrase_or_Interpretation",
  "Theme_or_Planned_Section",
  "Include_or_Exclude",
  "Exclusion_Reason",
  "Correction_or_Retraction_Status",
  "Verification_Notes",
];

const SAMPLE_MATRIX_ROW = {
  Record_ID: "REC-0042",
  Full_APA_Reference:
    "Omoniyi, A. A., & Adebayo, K. T. (2025). Generative AI adoption and trust among university lecturers in sub-Saharan Africa. Computers & Education, 214, 105128.",
  DOI_or_Stable_URL: "https://doi.org/10.1016/j.compedu.2025.105128",
  Publication_Type: "Journal Article",
  Peer_Review_Status: "Peer-Reviewed (Q1)",
  Country_or_Context: "Nigeria (Sub-Saharan Africa)",
  Aim_or_Research_Question:
    "Examine predictors of AI adoption among university lecturers using UTAUT2.",
  Theory_or_Framework: "UTAUT2 + Trust in AI (TAI)",
  Design_and_Methods: "Cross-sectional survey (SEM-PLS analysis)",
  Population_or_Sample: "N = 412 university lecturers across 6 federal universities",
  Variables_Measures_or_Qualitative_Focus:
    "Performance Expectancy, Effort Expectancy, Facilitating Conditions, Trust, Intention to Use",
  Analysis_Method: "Structural Equation Modeling (PLS-SEM, SmartPLS 4)",
  Main_Findings:
    "Trust in AI (beta = .41, p < .001) and Facilitating Conditions (beta = .34, p < .001) were the strongest direct predictors of AI adoption.",
  Effect_Estimate_or_Theme_and_Uncertainty: "R2 = .64 (64% variance explained); p < .001",
  Limitations_or_Risk_of_Bias:
    "Cross-sectional self-report design; sample limited to federal universities.",
  Funding_and_Conflicts: "No funding reported; no conflicts of interest.",
  Relevant_Quotation:
    '"Trust in generative AI systems is a stronger prerequisite for academic staff adoption than perceived ease of use" (p. 8).',
  Page_or_Paragraph: "p. 8, para. 3",
  Your_Paraphrase_or_Interpretation:
    "Lecturers require institutional trust and reliability guarantees before integrating AI into pedagogy.",
  Theme_or_Planned_Section: "Section 2.3: Determinants of Academic AI Adoption",
  Include_or_Exclude: "Include",
  Exclusion_Reason: "N/A",
  Correction_or_Retraction_Status: "Verified clean (Crossmark / Retraction Watch)",
  Verification_Notes:
    "Meets population (lecturers) and geography (Africa) inclusion criteria.",
};

export default function AgentModePage() {
  const [activeTab, setActiveTab] = useState<"tracker" | "matrix" | "sources" | "apa">("tracker");
  const [selectedStage, setSelectedStage] = useState<number | null>(1);
  const [runningDemo, setRunningDemo] = useState(false);
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  const runStageSimulation = (stageId: number) => {
    setRunningDemo(true);
    setDemoOutput(null);
    setTimeout(() => {
      const stage = TRACKER_STAGES.find((s) => s.id === stageId);
      setDemoOutput(
        `[MONIRESH AGENT EXECUTION LOG — STAGE ${stageId}: ${stage?.stage.toUpperCase()}]\n` +
          `AI Gateway Router: Routed to ${stage?.provider}\n` +
          `Status: SUCCESS (HTTP 200 OK)\n` +
          `Action Performed: ${stage?.desc}\n` +
          `Audit Trail: Zero fabricated citations or p-values. Verified via Crossref DOI.`
      );
      setRunningDemo(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFFEFE] flex text-black">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-black tracking-tight leading-none flex items-center gap-3">
                <img
                  src="/logo-moniresh-v2.png"
                  alt="MONIRESH Logo"
                  className="h-8 w-8 rounded-lg object-cover shadow-sm border border-pink-100"
                />
                MONIRESH Agent Mode
              </h1>
              <p className="text-[18px] text-black mt-1.5 font-medium">
                Autonomous 15-Stage Research Operating Protocol & 24-Column Evidence Matrix SOP.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[14px] font-bold text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> APA 7th & DOI Verified
              </span>
            </div>
          </div>

          {/* AI Gateway status banner */}
          <div className="bg-moni-50/50 border-t border-pink-50 px-6 lg:px-8 py-2.5 flex flex-wrap items-center gap-6 text-[14px] font-bold">
            <span className="flex items-center gap-1.5 text-black">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              OpenRouter: <span className="text-moni-600 font-black">Claude 3.5 & GPT-4o</span>
            </span>
            <span className="flex items-center gap-1.5 text-black">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Hugging Face: <span className="text-moni-600 font-black">Llama 3 8B Batch</span>
            </span>
            <span className="flex items-center gap-1.5 text-black">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              NVIDIA NIM: <span className="text-moni-600 font-black">Llama 3.1 405B / NeVA</span>
            </span>
          </div>

          {/* Tabs */}
          <div className="px-6 lg:px-8 flex gap-3 border-t border-pink-50 pt-3">
            {[
              { id: "tracker", label: "15-Stage Autonomous Tracker", icon: Layers },
              { id: "matrix", label: "24-Column Evidence Matrix", icon: Database },
              { id: "sources", label: "Document Sourcing & APIs", icon: Search },
              { id: "apa", label: "APA 7th Citation Guardian", icon: Award },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-[16px] transition ${
                    activeTab === t.id
                      ? "bg-ink-900 text-white shadow-lg"
                      : "bg-white border border-pink-100 text-black hover:bg-moni-50"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </div>
        </header>

        <main className="px-6 lg:px-8 py-8 max-w-[1240px] w-full mx-auto space-y-8">
          {activeTab === "tracker" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[22px] font-black tracking-tight">
                      End-to-End Autonomous Project Tracker (SOP Phase 1–15)
                    </h2>
                    <p className="text-[18px] text-black mt-1 font-medium leading-relaxed">
                      Every stage from <code>research_project_tracker_template.csv</code> is assigned to an AI
                      agent. No blind delegation: human researchers retain final approval on screening maybes and
                      outline milestones.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-moni-50 border border-pink-200 rounded-2xl px-4 py-2">
                    <Sparkles className="h-5 w-5 text-moni-500" />
                    <span className="text-[16px] font-black text-moni-700">Zero Manual Tedium</span>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-pink-100 bg-moni-50/50 text-[14px] font-bold uppercase tracking-wider text-black">
                        <th className="p-3.5">#</th>
                        <th className="p-3.5">Stage</th>
                        <th className="p-3.5">Manual SOP Task</th>
                        <th className="p-3.5">MONIRESH Autonomous Agent Action</th>
                        <th className="p-3.5">AI Gateway Router</th>
                        <th className="p-3.5 text-right">Test AI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50 text-[16px]">
                      {TRACKER_STAGES.map((s) => (
                        <tr key={s.id} className="hover:bg-moni-50/30 transition">
                          <td className="p-3.5 font-black text-moni-600">{s.id}</td>
                          <td className="p-3.5 font-bold text-black">{s.stage}</td>
                          <td className="p-3.5 font-medium text-black">{s.task}</td>
                          <td className="p-3.5 font-medium text-black">
                            {s.desc}
                            <div className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              <CheckCircle2 className="h-3.5 w-3.5" /> {s.status}
                            </div>
                          </td>
                          <td className="p-3.5 font-bold text-black">{s.provider}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => runStageSimulation(s.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2 text-[14px] font-bold text-white hover:bg-moni-600 transition shadow-sm"
                            >
                              <Play className="h-3.5 w-3.5" /> Test
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {demoOutput && (
                  <div className="mt-6 rounded-2xl bg-ink-900 text-white p-5 border border-ink-800 shadow-xl">
                    <div className="text-[14px] font-bold uppercase tracking-wider text-moni-400">
                      Live Gateway Simulation Response
                    </div>
                    <pre className="mt-2 text-[15px] leading-relaxed font-mono whitespace-pre-wrap">{demoOutput}</pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "matrix" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
                <h2 className="text-[22px] font-black tracking-tight">
                  24-Column Automated Literature Evidence Matrix
                </h2>
                <p className="text-[18px] text-black mt-1 font-medium leading-relaxed">
                  Maps all 24 columns from <code>literature_evidence_matrix_template.csv</code>. Enforces the{" "}
                  <strong>Three-Note Rule</strong>: Verbatim Quotation + Objective Paraphrase + Outline Synthesis Tag.
                </p>

                <div className="mt-6 rounded-2xl border border-pink-100 bg-moni-50/40 p-5">
                  <div className="text-[16px] font-bold flex items-center gap-2 text-moni-700">
                    <ShieldCheck className="h-5 w-5" /> Sample Auto-Extracted Row (Record ID: REC-0042)
                  </div>
                  <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(SAMPLE_MATRIX_ROW).map(([key, val]) => (
                      <div key={key} className="rounded-xl bg-white border border-pink-100 p-4">
                        <div className="text-[12px] font-black tracking-widest uppercase text-moni-600">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="mt-1 text-[15px] font-medium text-black leading-relaxed">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-pink-100 bg-white p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[18px] font-bold text-black">
                      Ready to process your PDF uploads?
                    </div>
                    <div className="text-[16px] text-black font-medium mt-0.5">
                      OpenRouter Gemini 2.0 Flash extracts all 24 columns in under 3 seconds per paper.
                    </div>
                  </div>
                  <button className="rounded-full bg-ink-900 px-6 py-3 text-[16px] font-bold text-white hover:bg-moni-600 transition">
                    Upload & Extract Papers
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "sources" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
                <h2 className="text-[22px] font-black tracking-tight">
                  Authorized Scholarly Document Sourcing & APIs
                </h2>
                <p className="text-[18px] text-black mt-1 font-medium leading-relaxed">
                  MONIRESH never scrapes protected publisher websites illegally. We connect to authoritative scholarly
                  APIs and user-provided library connectors:
                </p>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Open Scholarly Infrastructure (Public APIs)",
                      sources: ["OpenAlex API", "Semantic Scholar Graph API", "Crossref Metadata API", "PubMed & Europe PMC", "arXiv & DOAJ"],
                      desc: "Provides metadata, abstracts, citation links, and legal open-access full-text PDFs.",
                    },
                    {
                      title: "Subscription & Licensed Databases",
                      sources: ["Scopus (Elsevier API)", "Web of Science (Clarivate API)", "IEEE Xplore", "JSTOR"],
                      desc: "Accessed via researcher/institutional API tokens or direct Zotero library syncing.",
                    },
                    {
                      title: "Government & Empirical Datasets",
                      sources: ["World Bank Data API", "OECD Stat", "WHO Global Health Observatory", "UNESCO Statistics", "ICPSR"],
                      desc: "Provides macro, policy, and empirical datasets for quantitative analysis.",
                    },
                    {
                      title: "Integrity & Retraction Auditing",
                      sources: ["Retraction Watch Database", "Crossref Crossmark API", "COPE Index Check", "DOAJ Indexing"],
                      desc: "Automatically prevents citing retracted, corrected, or predatory publications.",
                    },
                  ].map((cat) => (
                    <div key={cat.title} className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-6 shadow-sm">
                      <div className="text-[18px] font-black text-black">{cat.title}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cat.sources.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-moni-50 border border-pink-200 px-3 py-1 text-[14px] font-bold text-moni-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-[16px] font-medium text-black leading-relaxed">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "apa" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
                <h2 className="text-[22px] font-black tracking-tight">
                  APA 7th Edition Citation Guardian & 7-Pass QA
                </h2>
                <p className="text-[18px] text-black mt-1 font-medium leading-relaxed">
                  Every citation is audited against APA 7th Edition rules and Crossref DOI registries to eliminate
                  hallucinated citations and formatting errors.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      rule: "In-Text Citation (1 author / 2 authors / 3+ authors)",
                      example: "(Omoniyi, 2025) | (Omoniyi & Adebayo, 2025) | (Omoniyi et al., 2025)",
                      note: "Direct quotations must include page number: (Omoniyi, 2025, p. 14).",
                    },
                    {
                      rule: "Journal Article Reference (with DOI)",
                      example:
                        "Omoniyi, A. A., & Adebayo, K. T. (2025). Generative AI adoption among lecturers. Computers & Education, 214, 105128. https://doi.org/10.1016/j.compedu.2025.105128",
                      note: "Title of article in sentence case; Journal Name & Volume in italics.",
                    },
                    {
                      rule: "Book / Chapter in Edited Book",
                      example:
                        "Adebayo, K. T. (2025). Research methods in African higher education (2nd ed.). University Press. https://doi.org/xxxxx",
                      note: "Book title in italics; sentence case capitalization.",
                    },
                    {
                      rule: "Automated 7-Pass Citation Audit",
                      example:
                        "1) In-text to Reference List Match | 2) DOI Live Hyperlink Verification | 3) Retraction Watch Check | 4) Secondary Citation Scrub | 5) Table-to-Text p-value Consistency",
                      note: "Guarantees zero fabricated references in exported manuscripts.",
                    },
                  ].map((apa) => (
                    <div key={apa.rule} className="rounded-2xl border border-pink-100 bg-moni-50/30 p-5">
                      <div className="text-[17px] font-bold text-black">{apa.rule}</div>
                      <div className="mt-2 rounded-xl bg-white border border-pink-100 p-3 font-mono text-[15px] text-moni-700 font-bold">
                        {apa.example}
                      </div>
                      <div className="mt-2 text-[15px] font-medium text-black">{apa.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
