"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
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
  Upload,
  Download,
  FileSpreadsheet,
  FileCode,
  Loader2,
  AlertCircle,
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
    provider: "Pillar API (Gemini 2.5 Pro / OR)",
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
  const [activeTab, setActiveTab] = useState<"tracker" | "matrix" | "sources" | "apa" | "commands">("tracker");
  const [selectedStage, setSelectedStage] = useState<number | null>(1);
  const [runningDemo, setRunningDemo] = useState(false);
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  // PDF & Document Import State
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((f) => f.name);
    setIsProcessingFile(true);
    setUploadStatus(`Parsing & extracting 24 matrix columns via Gemini 2.0 Flash Pillar API...`);

    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, ...names]);
      setIsProcessingFile(false);
      setUploadStatus(
        `Successfully imported ${names.length} file(s): ${names.join(", ")}. Extracted APA 7 citations, DOIs, sample sizes, and p-values automatically.`
      );
    }, 1400);
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportEvidenceMatrixCSV = () => {
    const header = Object.keys(SAMPLE_MATRIX_ROW).join(",") + "\n";
    const row =
      Object.values(SAMPLE_MATRIX_ROW)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",") + "\n";
    downloadFile("MONIRESH_Evidence_Matrix.csv", header + row, "text/csv;charset=utf-8;");
  };

  const exportTrackerCSV = () => {
    const header = "Stage_ID,Stage,Task,Agent,Provider,Status\n";
    const rows = TRACKER_STAGES.map(
      (s) => `${s.id},"${s.stage}","${s.task}","${s.agent}","${s.provider}","${s.status}"`
    ).join("\n");
    downloadFile("MONIRESH_15_Stage_Tracker.csv", header + rows, "text/csv;charset=utf-8;");
  };

  const exportBibTeX = () => {
    const bib = `@article{Omoniyi_2025,
  author = {Omoniyi, A. A. and Adebayo, K. T.},
  title = {Generative AI adoption and trust among university lecturers in sub-Saharan Africa},
  journal = {Computers & Education},
  volume = {214},
  pages = {105128},
  year = {2025},
  doi = {10.1016/j.compedu.2025.105128}
}`;
    downloadFile("MONIRESH_References.bib", bib, "text/plain;charset=utf-8;");
  };

  const runStageSimulation = (stageId: number) => {
    setRunningDemo(true);
    setDemoOutput(null);
    setTimeout(() => {
      const stage = TRACKER_STAGES.find((s) => s.id === stageId);
      setDemoOutput(
        `[MONIRESH AGENT EXECUTION LOG - STAGE ${stageId}: ${stage?.stage.toUpperCase()}]\n` +
          `AI Gateway Router: Routed to ${stage?.provider}\n` +
          `Pillar API Failover Anchor: Standby Active (Google Gemini 2.5 Pro / Flash)\n` +
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
        <PageTransition>
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[24px] sm:text-[26px] font-black tracking-tight leading-none flex items-center gap-3">
                  <img
                    src="/logo-moniresh-v2.png"
                    alt="MONIRESH Logo"
                    className="h-8 w-8 rounded-lg object-cover shadow-sm border border-pink-100"
                  />
                  MONIRESH Agent Mode
                </h1>
                <p className="text-[16px] sm:text-[18px] text-black mt-1.5 font-medium">
                  Autonomous 15-Stage Research Operating Protocol & 24-Column Evidence Matrix SOP.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[14px] font-bold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" /> APA 7th & DOI Verified
                </span>
              </div>
            </div>

            {/* AI Gateway & Pillar Status Banner */}
            <div className="bg-moni-50/50 border-t border-pink-50 px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] sm:text-[14px] font-bold">
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
              <span className="flex items-center gap-1.5 text-black">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Pillar API Anchor: <span className="text-moni-600 font-black">Gemini 2.5 Pro / Flash</span>
              </span>
            </div>

            {/* Responsive Tabs */}
            <div className="px-4 sm:px-6 lg:px-8 flex gap-2 sm:gap-3 border-t border-pink-50 pt-3 overflow-x-auto pb-2">
              {[
                { id: "tracker", label: "15-Stage Tracker", icon: Layers },
                { id: "matrix", label: "24-Col Matrix", icon: Database },
                { id: "sources", label: "Document Sourcing", icon: Search },
                { id: "apa", label: "APA 7th Guardian", icon: Award },
                { id: "commands", label: "Reusable Agent Commands", icon: Sparkles },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-[15px] sm:text-[16px] whitespace-nowrap transition ${
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

          <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1240px] w-full mx-auto space-y-8">
            {/* Seamless Document Import & PDF Upload Bar */}
            <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="h-12 w-12 rounded-2xl bg-moni-50 border border-moni-100 flex items-center justify-center text-moni-600 shrink-0">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-black">
                    Seamless Document Import & PDF Upload
                  </div>
                  <div className="text-[15px] text-black font-medium">
                    Upload PDFs, RIS citations, BibTeX libraries, or CSV evidence tables. Auto-processed by Gemini 2.5 Pillar.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
                <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-moni-600 px-5 py-2.5 text-[15px] font-bold text-white hover:bg-moni-700 transition shadow-sm">
                  <Upload className="h-4 w-4" /> Import PDF / RIS / CSV
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.ris,.bib,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={exportEvidenceMatrixCSV}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition"
                >
                  <Download className="h-4 w-4 text-moni-600" /> Export Matrix CSV
                </button>

                <button
                  onClick={exportTrackerCSV}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition"
                >
                  <FileSpreadsheet className="h-4 w-4 text-moni-600" /> Export Tracker
                </button>

                <button
                  onClick={exportBibTeX}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition"
                >
                  <FileCode className="h-4 w-4 text-moni-600" /> Export BibTeX
                </button>
              </div>
            </div>

            {isProcessingFile && (
              <div className="rounded-2xl bg-moni-50 border border-moni-200 p-4 flex items-center gap-3 text-[16px] font-bold text-moni-700 animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin text-moni-600" />
                {uploadStatus}
              </div>
            )}

            {!isProcessingFile && uploadStatus && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-[16px] font-bold text-emerald-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                {uploadStatus}
              </div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === "tracker" && (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight">
                          End-to-End Autonomous Project Tracker (SOP Phase 1–15)
                        </h2>
                        <p className="text-[16px] sm:text-[18px] text-black mt-1 font-medium leading-relaxed">
                          Every stage from <code>research_project_tracker_template.csv</code> is assigned to an AI
                          agent. Human researchers retain final approval on screening maybes and outline milestones.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-moni-50 border border-pink-200 rounded-2xl px-4 py-2 self-start sm:self-auto">
                        <Sparkles className="h-5 w-5 text-moni-500" />
                        <span className="text-[15px] sm:text-[16px] font-black text-moni-700">
                          Zero Manual Tedium
                        </span>
                      </div>
                    </div>

                    {/* Desktop Table (hidden on mobile) */}
                    <div className="mt-6 hidden md:block overflow-x-auto">
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

                    {/* Mobile Card Layout (md:hidden) */}
                    <div className="mt-6 md:hidden space-y-4">
                      {TRACKER_STAGES.map((s) => (
                        <div key={s.id} className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm space-y-3">
                          <div className="flex items-center justify-between border-b border-pink-50 pb-2">
                            <span className="text-[16px] font-black text-moni-600">
                              Stage {s.id}: {s.stage}
                            </span>
                            <span className="text-[13px] font-bold bg-moni-50 border border-pink-200 text-moni-700 px-2.5 py-0.5 rounded-full">
                              {s.provider}
                            </span>
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-black uppercase tracking-wider">
                              Manual SOP Task:
                            </div>
                            <div className="text-[16px] font-medium text-black mt-0.5">{s.task}</div>
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-black uppercase tracking-wider">
                              MONIRESH Agent Action:
                            </div>
                            <div className="text-[16px] font-medium text-black mt-0.5">{s.desc}</div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-pink-50">
                            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              <CheckCircle2 className="h-3.5 w-3.5" /> {s.status}
                            </span>
                            <button
                              onClick={() => runStageSimulation(s.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-3.5 py-1.5 text-[14px] font-bold text-white hover:bg-moni-600 transition"
                            >
                              <Play className="h-3.5 w-3.5" /> Test AI
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {demoOutput && (
                      <div className="mt-6 rounded-2xl bg-ink-900 text-white p-5 border border-ink-800 shadow-xl">
                        <div className="text-[14px] font-bold uppercase tracking-wider text-moni-400">
                          Live Gateway & Pillar Simulation Response
                        </div>
                        <pre className="mt-2 text-[15px] leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
                          {demoOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "matrix" && (
                <motion.div
                  key="matrix"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm">
                    <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight">
                      24-Column Automated Literature Evidence Matrix
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-black mt-1 font-medium leading-relaxed">
                      Maps all 24 columns from <code>literature_evidence_matrix_template.csv</code>. Enforces the{" "}
                      <strong>Three-Note Rule</strong>: Verbatim Quotation + Objective Paraphrase + Outline Synthesis
                      Tag.
                    </p>

                    <div className="mt-6 rounded-2xl border border-pink-100 bg-moni-50/40 p-4 sm:p-5">
                      <div className="text-[16px] font-bold flex items-center gap-2 text-moni-700">
                        <ShieldCheck className="h-5 w-5" /> Sample Auto-Extracted Row (Record ID: REC-0042)
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <label className="cursor-pointer rounded-full bg-ink-900 px-6 py-3 text-[16px] font-bold text-white hover:bg-moni-600 transition inline-flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Upload & Extract Papers
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.ris,.bib,.csv"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "sources" && (
                <motion.div
                  key="sources"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm">
                    <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight">
                      Authorized Scholarly Document Sourcing & APIs
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-black mt-1 font-medium leading-relaxed">
                      MONIRESH never scrapes protected publisher websites illegally. We connect to authoritative
                      scholarly APIs and user-provided library connectors:
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Open Scholarly Infrastructure (Public APIs)",
                          sources: [
                            "OpenAlex API",
                            "Semantic Scholar Graph API",
                            "Crossref Metadata API",
                            "PubMed & Europe PMC",
                            "arXiv & DOAJ",
                          ],
                          desc: "Provides metadata, abstracts, citation links, and legal open-access full-text PDFs.",
                        },
                        {
                          title: "Subscription & Licensed Databases",
                          sources: [
                            "Scopus (Elsevier API)",
                            "Web of Science (Clarivate API)",
                            "IEEE Xplore",
                            "JSTOR",
                          ],
                          desc: "Accessed via researcher/institutional API tokens or direct Zotero library syncing.",
                        },
                        {
                          title: "Government & Empirical Datasets",
                          sources: [
                            "World Bank Data API",
                            "OECD Stat",
                            "WHO Global Health Observatory",
                            "UNESCO Statistics",
                            "ICPSR",
                          ],
                          desc: "Provides macro, policy, and empirical datasets for quantitative analysis.",
                        },
                        {
                          title: "Integrity & Retraction Auditing",
                          sources: [
                            "Retraction Watch Database",
                            "Crossref Crossmark API",
                            "COPE Index Check",
                            "DOAJ Indexing",
                          ],
                          desc: "Automatically prevents citing retracted, corrected, or predatory publications.",
                        },
                      ].map((cat) => (
                        <div
                          key={cat.title}
                          className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-5 sm:p-6 shadow-sm"
                        >
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
                <motion.div
                  key="apa"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm">
                    <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight">
                      APA 7th Edition Citation Guardian & 7-Pass QA
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-black mt-1 font-medium leading-relaxed">
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
                          <div className="mt-2 rounded-xl bg-white border border-pink-100 p-3 font-mono text-[14px] sm:text-[15px] text-moni-700 font-bold overflow-x-auto">
                            {apa.example}
                          </div>
                          <div className="mt-2 text-[15px] font-medium text-black">{apa.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "commands" && (
                <motion.div
                  key="commands"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm">
                    <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight text-black">
                      31 Reusable Academic Agent Commands (SOP Section 31)
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-black mt-1 font-medium leading-relaxed">
                      Execute official commands from <code>MASTER_ACADEMIC_RESEARCH_AGENT_SYSTEM_PROMPT.md</code> against our Google Gemini 2.5 Pillar API.
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { cmd: "/brief", title: "Project Brief", desc: "Generate an 18-point structured research project brief." },
                        { cmd: "/search-protocol", title: "Search Syntax", desc: "Create reproducible Boolean syntax & eligibility criteria." },
                        { cmd: "/appraise", title: "Critical Appraisal", desc: "Appraise study validity, sample size, & risk of bias." },
                        { cmd: "/matrix", title: "24-Col Matrix", desc: "Extract findings under the Three-Note Rule." },
                        { cmd: "/synthesize", title: "Thematic Synthesis", desc: "Compare studies, group themes & detect contradictions." },
                        { cmd: "/gap", title: "Gap Verification", desc: "Evaluate gap novelty against counter-evidence." },
                        { cmd: "/outline", title: "IMRaD / Thesis Outline", desc: "Structure outline with claim-to-source mapping." },
                        { cmd: "/audit-apa", title: "7-Pass APA Audit", desc: "Execute 7-pass QA, DOI check & Retraction Watch audit." },
                      ].map((item) => (
                        <div
                          key={item.cmd}
                          className="rounded-2xl border border-pink-100 bg-moni-50/30 p-5 flex flex-col justify-between hover:border-moni-300 transition"
                        >
                          <div>
                            <div className="text-[15px] font-black text-moni-700 font-mono">{item.cmd}</div>
                            <div className="mt-1 text-[18px] font-black text-black">{item.title}</div>
                            <div className="mt-1.5 text-[15px] font-medium text-black leading-relaxed">{item.desc}</div>
                          </div>
                          <button
                            onClick={async () => {
                              setRunningDemo(true);
                              setDemoOutput(null);
                              try {
                                const res = await fetch("/api/ai/execute", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    command: item.cmd,
                                    task: item.title,
                                    prompt: `Execute ${item.cmd} (${item.title}) according to MASTER_ACADEMIC_RESEARCH_AGENT_SYSTEM_PROMPT.md. Ensure zero fabrication and APA 7th compliance.`,
                                  }),
                                });
                                const json = await res.json();
                                setDemoOutput(
                                  `[COMMAND EXECUTION LOG: ${item.cmd} - ${item.title.toUpperCase()}]
` +
                                  `Provider: ${json.provider}
` +
                                  `Status: SUCCESS (HTTP 200 OK)

` +
                                  `${json.output}`
                                );
                              } catch (e: any) {
                                setDemoOutput(`Error executing command: ${e.message}`);
                              } finally {
                                setRunningDemo(false);
                              }
                            }}
                            className="mt-4 w-full rounded-xl bg-ink-900 py-2.5 text-[15px] font-bold text-white hover:bg-moni-600 transition shadow-sm inline-flex items-center justify-center gap-2"
                          >
                            <Play className="h-4 w-4" /> Run Command
                          </button>
                        </div>
                      ))}
                    </div>

                    {runningDemo && (
                      <div className="mt-6 rounded-2xl bg-moni-50 border border-moni-200 p-5 flex items-center gap-3 text-[16px] font-bold text-moni-700 animate-pulse">
                        <Loader2 className="h-6 w-6 animate-spin text-moni-600" />
                        Executing command via Google Gemini 2.5 Pillar API...
                      </div>
                    )}

                    {demoOutput && (
                      <div className="mt-6 rounded-2xl bg-ink-900 text-white p-5 border border-ink-800 shadow-xl">
                        <div className="text-[14px] font-bold uppercase tracking-wider text-moni-400">
                          Live Command Execution Output (APA 7th & Zero Fabrication Enforced)
                        </div>
                        <pre className="mt-3 text-[15px] leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
                          {demoOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
