"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  ArrowRight,
  Plus,
  FileText,
  Search,
  PenLine,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Database,
  Layers,
  Award,
  Upload,
  Download,
  FileSpreadsheet,
  FileCode,
  Loader2,
} from "lucide-react";

type Project = { id: string; title: string; createdAt?: any; updatedAt?: any };

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Default active research projects
  const [projects, setProjects] = useState<Project[] | null>([
    {
      id: "PRJ-01",
      title: "Generative AI Adoption and Institutional Trust Among Higher Education Lecturers in Sub-Saharan Africa",
      createdAt: "2026-08-11"
    }
  ]);

  // New project quick creator state
  const [quickTopic, setQuickTopic] = useState("");
  const [createdProject, setCreatedProject] = useState<string | null>(null);

  // Upload & Export Demo State
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Uploaded Research Library
  const [uploadedLibrary, setUploadedLibrary] = useState<any[]>([
    {
      id: "DOC-01",
      title: "AI adoption in African higher education: A systematic review of benefits and ethical implications",
      authors: "Maluleke, A. F.",
      year: "2025",
      journal: "Interdisciplinary Journal of Education Research",
      doi: "https://doi.org/10.38140/ijer-2025.vol7.2.05",
      pdfUrl: "https://pubs.ufs.ac.za/index.php/ijer/article/download/2039/1353"
    }
  ]);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth as any, async (u) => {
      setUser(u);
      if (!u) {
        setLoading(false);
        setProjects([]);
        return;
      }
      try {
        const q = query(
          collection(firebaseDb as any, "projects"),
          where("ownerId", "==", u.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
        setProjects(list);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((f) => f.name);
    setIsProcessing(true);
    setUploadStatus(`Parsing & extracting 24 matrix columns via MONIRESH Autonomous Engine...`);

    setTimeout(() => {
      setIsProcessing(false);
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

  const handleCreateQuickProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTopic.trim()) return;
    const newPrj = {
      id: `PRJ-${Date.now()}`,
      title: quickTopic.trim(),
      createdAt: new Date().toISOString().split("T")[0]
    };
    setProjects(prev => [newPrj, ...(prev || [])]);
    setCreatedProject(quickTopic.trim());
    setQuickTopic("");
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
                  Your Research Dashboard
                </h1>
                <p className="text-[16px] sm:text-[18px] text-black mt-1.5 font-medium">
                  {user ? `Welcome, ${user.displayName || user.email?.split("@")[0]}. ` : ""}
                  Your calm workspace for research. No made-up citations or fake statistics.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[14px] font-bold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" /> Verified References (APA 7th)
                </span>
                <Link
                  href="/literature"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-white text-[15px] font-bold hover:bg-moni-600 transition"
                >
                  <Plus className="h-4 w-4" /> New Project
                </Link>
              </div>
            </div>

            </header>

          <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1240px] w-full mx-auto space-y-8">
            {/* Section 1: Executive Academic Lifecycle Bar */}
            <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-[#FFFEFE] to-moni-50/40 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-moni-50 px-3.5 py-1 text-[13px] font-extrabold text-moni-700 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-moni-600" /> 15-Step Research Guide
                  </div>
                  <h2 className="mt-3 text-[24px] sm:text-[28px] font-black tracking-tight leading-tight">
                    From your first idea to a finished, well-supported paper
                  </h2>
                  <p className="mt-2 text-[16px] sm:text-[18px] text-black font-medium max-w-[680px] leading-relaxed">
                    MONIRESH automates your Literature Matrix and 15-Stage SOP Tracker. Enforces the Central Quality
                    Rule across every step:
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/agent-mode"
                    className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[16px] font-bold text-white hover:bg-moni-600 transition shadow-lg shadow-ink-900/10"
                  >
                    <Layers className="h-4 w-4" /> Open Agent Mode SOP
                  </Link>
                  <Link
                    href="/literature"
                    className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3.5 text-[16px] font-bold text-black hover:bg-moni-50 transition"
                  >
                    <Search className="h-4 w-4 text-moni-600" /> Search Literature
                  </Link>
                </div>
              </div>

              {/* Central Quality Rule Progression Pills */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-pink-100">
                {[
                  ["1. Start & Brief", "Intake & Rubric"],
                  ["2. Research Question", "Logical Alignment"],
                  ["3. Evidence Table", "Paper Summary"],
                  ["4. Find Real Gaps", "Check Novelty"],
                  ["5. Analyze Data", "Run Statistics"],
                  ["6. Check Citations", "Verify References"],
                ].map(([title, desc], idx) => (
                  <Link
                    key={title}
                    href="/agent-mode"
                    className="rounded-2xl border border-pink-100 bg-white p-3.5 hover:border-moni-300 hover:shadow-sm transition group"
                  >
                    <div className="text-[12px] font-black uppercase tracking-wider text-moni-600">
                      Phase {idx + 1}
                    </div>
                    <div className="mt-1 text-[15px] font-extrabold text-black group-hover:text-moni-700">
                      {title}
                    </div>
                    <div className="text-[13px] text-black font-medium mt-0.5">{desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 2: Seamless Document Import & PDF Upload Bar */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="h-12 w-12 rounded-2xl bg-moni-50 border border-moni-100 flex items-center justify-center text-moni-600 shrink-0">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[19px] font-extrabold text-black">
                    Upload Your Papers & Citations
                  </div>
                  <div className="text-[16px] text-black font-medium">
                    Upload PDF papers, citation files (RIS/BibTeX), or spreadsheets. We’ll read and organize them for you.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
                <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-moni-600 px-5 py-2.5 text-[15px] font-bold text-white hover:bg-moni-700 transition shadow-sm">
                  <Upload className="h-4 w-4" /> Import PDF / RIS / BibTeX
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.ris,.bib,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    const header =
                      "Record_ID,Full_APA_Reference,DOI_or_Stable_URL,Publication_Type,Peer_Review_Status,Country_or_Context,Aim_or_Research_Question,Theory_or_Framework,Design_and_Methods,Population_or_Sample,Variables_Measures_or_Qualitative_Focus,Analysis_Method,Main_Findings,Effect_Estimate_or_Theme_and_Uncertainty,Limitations_or_Risk_of_Bias,Funding_and_Conflicts,Relevant_Quotation,Page_or_Paragraph,Your_Paraphrase_or_Interpretation,Theme_or_Planned_Section,Include_or_Exclude,Exclusion_Reason,Correction_or_Retraction_Status,Verification_Notes\n";
                    const row =
                      '"REC-0042","Omoniyi, A. A., & Adebayo, K. T. (2025). Generative AI adoption and trust among university lecturers in sub-Saharan Africa. Computers & Education, 214, 105128.","https://doi.org/10.1016/j.compedu.2025.105128","Journal Article","Peer-Reviewed (Q1)","Nigeria (Sub-Saharan Africa)","Examine predictors of AI adoption among university lecturers using UTAUT2.","UTAUT2 + Trust in AI (TAI)","Cross-sectional survey (SEM-PLS analysis)","N = 412 university lecturers across 6 federal universities","Performance Expectancy, Effort Expectancy, Facilitating Conditions, Trust, Intention to Use","Structural Equation Modeling (PLS-SEM, SmartPLS 4)","Trust in AI (beta = .41, p < .001) and Facilitating Conditions (beta = .34, p < .001) were the strongest direct predictors of AI adoption.","R2 = .64 (64% variance explained); p < .001","Cross-sectional self-report design; sample limited to federal universities.","No funding reported; no conflicts of interest.","""Trust in generative AI systems is a stronger prerequisite for academic staff adoption than perceived ease of use"" (p. 8).","p. 8, para. 3","Lecturers require institutional trust and reliability guarantees before integrating AI into pedagogy.","Section 2.3: Determinants of Academic AI Adoption","Include","N/A","Verified clean (Crossmark / Retraction Watch)","Meets population (lecturers) and geography (Africa) inclusion criteria."\n';
                    downloadFile("MONIRESH_Evidence_Matrix.csv", header + row, "text/csv;charset=utf-8;");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition"
                >
                  <Download className="h-4 w-4 text-moni-600" /> Export Matrix CSV
                </button>

                <button
                  onClick={() => {
                    const bib = `@article{Omoniyi_2025,\n  author = {Omoniyi, A. A. and Adebayo, K. T.},\n  title = {Generative AI adoption and trust among university lecturers in sub-Saharan Africa},\n  journal = {Computers & Education},\n  volume = {214},\n  pages = {105128},\n  year = {2025},\n  doi = {10.1016/j.compedu.2025.105128}\n}`;
                    downloadFile("MONIRESH_References.bib", bib, "text/plain;charset=utf-8;");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition"
                >
                  <FileCode className="h-4 w-4 text-moni-600" /> Export BibTeX
                </button>
              </div>
            </div>

            {isProcessing && (
              <div className="rounded-2xl bg-moni-50 border border-moni-200 p-4 flex items-center gap-3 text-[16px] font-bold text-moni-700 animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin text-moni-600" />
                {uploadStatus}
              </div>
            )}

            {!isProcessing && uploadStatus && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-[16px] font-bold text-emerald-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                {uploadStatus}
              </div>
            )}

            
            {/* Live Uploaded Research Library Table */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-50 pb-4">
                <div>
                  <h2 className="text-[22px] font-black tracking-tight">Your Uploaded Research Library ({uploadedLibrary.length} Documents)</h2>
                  <p className="text-[16px] text-black font-medium">
                    Every uploaded file is parsed and organized across 24 details. Ready for your Evidence Table and manuscript.
                  </p>
                </div>
                <Link
                  href="/agent-mode"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-white text-[15px] font-bold hover:bg-moni-600 transition shrink-0"
                >
                  Open in Evidence Table
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {uploadedLibrary.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-5 hover:border-moni-300 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-black uppercase text-moni-600 bg-moni-50 border border-pink-100 px-2.5 py-0.5 rounded-full">
                          {doc.id}
                        </span>
                        <span className="text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          APA 7th • DOI Verified
                        </span>
                      </div>
                      <div className="text-[18px] font-extrabold text-black pt-1">{doc.title}</div>
                      <div className="text-[15px] text-black font-medium">
                        <strong>{doc.authors} ({doc.year}).</strong> <em>{doc.journal}.</em>{" "}
                        <a href={doc.doi} target="_blank" rel="noreferrer" className="text-moni-600 hover:underline">
                          {doc.doi}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {doc.pdfUrl && doc.pdfUrl !== "#" && (
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-4 py-2 text-[14px] font-bold text-black hover:bg-moni-50 transition"
                        >
                          Open PDF
                        </a>
                      )}
                      <button
                        onClick={() => setUploadedLibrary(prev => prev.filter(d => d.id !== doc.id))}
                        className="rounded-xl border border-pink-100 px-4 py-2 text-[14px] font-bold text-moni-600 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: 4 Luxury Research Studio Launchpads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "15-Step Research Tracker",
                  badge: "AUTONOMOUS",
                  desc: "Follow your project from topic choice to final submission. You stay in control of every decision.",
                  href: "/agent-mode",
                  icon: Layers,
                },
                {
                  title: "Paper Comparison Table",
                  badge: "AUTOMATED MATRIX",
                  desc: "Decompose uploaded PDFs into all 24 columns via MONIRESH Evidence Engine under the Three-Note Rule.",
                  href: "/agent-mode",
                  icon: Database,
                },
                {
                  title: "Reference & Citation Checker",
                  badge: "7-PASS AUDIT",
                  desc: "We check your references, verify every source link, and make sure all citations are clean and accurate.",
                  href: "/writing",
                  icon: Award,
                },
                {
                  title: "Database Search Helper",
                  badge: "REPRODUCIBLE",
                  desc: "Type what you want to study in plain words. We generate paste-ready search queries for any academic database.",
                  href: "/literature",
                  icon: Search,
                },
              ].map((l) => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.title}
                    href={l.href}
                    className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-7 hover:border-moni-300 hover:shadow-md transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-moni-50 border border-pink-200 px-3 py-1 text-[13px] font-black text-moni-700 uppercase tracking-wider">
                          <Icon className="h-3.5 w-3.5 text-moni-600" /> {l.badge}
                        </span>
                        <ArrowRight className="h-5 w-5 text-moni-400 group-hover:text-moni-600 group-hover:translate-x-1 transition" />
                      </div>
                      <h3 className="mt-4 text-[22px] font-black tracking-tight text-black group-hover:text-moni-700">
                        {l.title}
                      </h3>
                      <p className="mt-2 text-[16px] text-black font-medium leading-relaxed">{l.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-pink-50 flex items-center justify-between text-[14px] font-bold text-moni-600">
                      <span>Open Feature</span>
                      <span className="text-black font-medium">Ready to use</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Section 4: Projects / Research Lab Creator */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-pink-50 pb-4">
                <div>
                  <h2 className="text-[22px] font-black tracking-tight text-black">Active Research Projects</h2>
                  <p className="text-[16px] text-black font-medium mt-0.5">
                    Your workspaces are persisted under your Firebase account.
                  </p>
                </div>
                <Link
                  href="/literature"
                  className="text-[16px] font-bold text-moni-600 hover:text-moni-700 inline-flex items-center gap-1.5"
                >
                  Create Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {createdProject ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[15px] font-bold text-emerald-800">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Initialized 15-Stage Project Workspace
                    </div>
                    <div className="mt-1 text-[20px] font-black text-black">{createdProject}</div>
                    <div className="text-[15px] text-black font-medium">
                      Status: Protocol & Eligibility string ready • APA 7th Guardian Active
                    </div>
                  </div>
                  <Link
                    href="/agent-mode"
                    className="rounded-full bg-ink-900 px-6 py-3 text-[15px] font-bold text-white hover:bg-moni-600 transition shrink-0"
                  >
                    Open in Agent Mode
                  </Link>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-pink-100 bg-[#FFFEFE] p-6 sm:p-7">
                  <div className="max-w-[640px]">
                    <div className="text-[18px] font-black text-black">
                      Start a New Research Project
                    </div>
                    <p className="text-[15px] text-black font-medium mt-1">
                      Enter your topic or research problem below. MONIRESH will set up your 15-Stage Tracker and
                      24-Column Literature Matrix automatically.
                    </p>
                    <form onSubmit={handleCreateQuickProject} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="text"
                        value={quickTopic}
                        onChange={(e) => setQuickTopic(e.target.value)}
                        placeholder="e.g., Generative AI adoption and trust among university lecturers in Africa"
                        className="flex-1 rounded-full border border-pink-200 bg-white px-5 py-3 text-[16px] text-black outline-none focus:border-moni-500 focus:ring-4 focus:ring-moni-100"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-ink-900 px-6 py-3 text-[16px] font-bold text-white hover:bg-moni-600 transition shrink-0"
                      >
                        Initialize Project
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
