"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { FileScan, ShieldCheck, Check, ArrowRight, Download, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const INITIAL_RECORDS = [
  {
    id: "REC-101",
    title: "AI adoption in African higher education: A systematic review of benefits and ethical implications",
    authors: "Maluleke, A. F. (2025)",
    journal: "Interdisciplinary Journal of Education Research",
    abstract: "The accelerated adoption of artificial intelligence within African higher education presents both challenges and benefits. This study employed the PRISMA methodology to select 113 articles from Web of Science and Scopus.",
    decision: "Include",
    confidence: "98%",
    reason: "Meets African higher education and AI adoption criteria."
  },
  {
    id: "REC-102",
    title: "Exploring the use and impact of artificial intelligence in higher education in Africa",
    authors: "Pasipamire, N., et al. (2025)",
    journal: "Journal of Pedagogical Sociology and Psychology",
    abstract: "A systematic analysis of AI's impact on higher education institutions across African universities.",
    decision: "Include",
    confidence: "95%",
    reason: "Directly addresses AI impact in African higher education."
  },
  {
    id: "REC-103",
    title: "Artificial intelligence in secondary schools: Student perceptions in Western Europe",
    authors: "Schneider, M. (2024)",
    journal: "Journal of Secondary Education",
    abstract: "A survey of high school student use of generative AI tools in German secondary education.",
    decision: "Exclude",
    confidence: "99%",
    reason: "Wrong population (secondary schools) and geography (Europe)."
  },
  {
    id: "REC-104",
    title: "AI governance in African higher education: Status, challenges, and a futureproof policy framework",
    authors: "Sangwa, S., et al. (2025)",
    journal: "SSRN Electronic Journal",
    abstract: "Synthesizes AI governance readiness continent-wide across African universities.",
    decision: "Maybe",
    confidence: "74%",
    reason: "Preprint / working paper - requires researcher approval on peer-review status."
  }
];

export default function SystematicPage() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [filter, setFilter] = useState<"All" | "Include" | "Exclude" | "Maybe">("All");

  const includedCount = records.filter(r => r.decision === "Include").length;
  const excludedCount = records.filter(r => r.decision === "Exclude").length;
  const maybeCount = records.filter(r => r.decision === "Maybe").length;

  const updateDecision = (id: string, newDec: "Include" | "Exclude" | "Maybe") => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, decision: newDec } : r));
  };

  const downloadPRISMA = () => {
    const csv = "Phase,Count,Notes\n" +
      `Identified Records,${records.length + 71},Retrieved from Serper / OpenAlex / PubMed / Crossref\n` +
      `Duplicates Removed,71,Automated DOI & title deduplication\n` +
      `Records Screened,${records.length},Screened via Llama 3 8B batch engine\n` +
      `Records Excluded,${excludedCount},Did not meet eligibility criteria\n` +
      `Full-Text Assessed,${includedCount + maybeCount},Full-text PDF retrieval via Unpaywall & OpenAlex\n` +
      `Studies Included,${includedCount},Final included set for 24-Column Evidence Table`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MONIRESH_PRISMA_Flow.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredRecords = records.filter(r => filter === "All" || r.decision === filter);

  return (
    <div className="min-h-screen bg-[#FFFEFE] flex text-black">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <PageTransition>
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
            <div className="px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[26px] sm:text-[28px] font-black tracking-tight flex items-center gap-3">
                  <FileScan className="h-6 w-6 text-moni-600" />
                  Screening & PRISMA Studio
                </h1>
                <p className="text-[18px] sm:text-[20px] text-black font-medium">
                  Screen titles & abstracts step by step - with an audit trail you can show your supervisor.
                </p>
              </div>
              <button
                onClick={downloadPRISMA}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[17px] font-bold text-white hover:bg-moni-600 transition shadow-sm self-start sm:self-auto"
              >
                <Download className="h-4 w-4" /> Export PRISMA CSV
              </button>
            </div>

            {/* Filter pills */}
            <div className="px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-pink-50 pt-3 pb-2 overflow-x-auto">
              {(["All", "Include", "Exclude", "Maybe"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl font-bold text-[17px] transition ${
                    filter === f
                      ? "bg-ink-900 text-white shadow-sm"
                      : "bg-white border border-pink-100 text-black hover:bg-moni-50"
                  }`}
                >
                  {f} {f === "Include" ? `(${includedCount})` : f === "Exclude" ? `(${excludedCount})` : f === "Maybe" ? `(${maybeCount})` : `(${records.length})`}
                </button>
              ))}
            </div>
          </header>

          <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1240px] w-full mx-auto space-y-8">
            {/* PRISMA Numbers Box */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="text-[24px] font-black tracking-tight">PRISMA Flow Tracking</h2>
              <p className="text-[18px] text-black font-medium mt-1">
                Your screening counts update automatically from your library searches.
              </p>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-5">
                  <div className="text-[16px] font-bold uppercase tracking-wider text-moni-600">Total Found</div>
                  <div className="text-[30px] font-black text-black mt-1">{records.length + 71}</div>
                </div>
                <div className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-5">
                  <div className="text-[16px] font-bold uppercase tracking-wider text-moni-600">Duplicates Removed</div>
                  <div className="text-[30px] font-black text-black mt-1">71</div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <div className="text-[16px] font-bold uppercase tracking-wider text-emerald-800">Included Studies</div>
                  <div className="text-[30px] font-black text-emerald-900 mt-1">{includedCount}</div>
                </div>
                <div className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-5">
                  <div className="text-[16px] font-bold uppercase tracking-wider text-moni-600">Needs Review</div>
                  <div className="text-[30px] font-black text-moni-700 mt-1">{maybeCount}</div>
                </div>
              </div>
            </div>

            {/* Screening Cards */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-7 shadow-sm space-y-6">
              <h2 className="text-[24px] font-black tracking-tight">Screening Queue ({filteredRecords.length} Studies)</h2>

              {filteredRecords.map(r => (
                <div key={r.id} className="rounded-2xl border border-pink-100 bg-[#FFFEFE] p-6 hover:border-moni-300 transition space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[16px] font-black uppercase text-moni-600 bg-moni-50 border border-pink-200 px-3 py-1 rounded-full">
                      {r.id} • Confidence: {r.confidence}
                    </span>
                    <span className="text-[16px] font-bold text-black bg-white border border-pink-200 px-3 py-1 rounded-full">
                      Current Decision: <strong className={r.decision === "Include" ? "text-emerald-700" : r.decision === "Exclude" ? "text-red-700" : "text-moni-700"}>{r.decision}</strong>
                    </span>
                  </div>

                  <div className="text-[22px] font-extrabold text-black">{r.title}</div>
                  <div className="text-[17px] font-semibold text-black">
                    {r.authors} - <em>{r.journal}</em>
                  </div>
                  <div className="text-[18px] text-black font-medium leading-relaxed">
                    <strong>Abstract:</strong> {r.abstract}
                  </div>
                  <div className="text-[17px] font-bold text-black bg-moni-50/50 border border-pink-100 p-3.5 rounded-xl">
                    <strong>Screening Reason:</strong> {r.reason}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-pink-50">
                    <span className="text-[17px] font-bold text-black">Change Decision:</span>
                    <button
                      onClick={() => updateDecision(r.id, "Include")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[16px] font-bold transition ${
                        r.decision === "Include" ? "bg-emerald-600 text-white shadow-sm" : "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Include
                    </button>
                    <button
                      onClick={() => updateDecision(r.id, "Exclude")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[16px] font-bold transition ${
                        r.decision === "Exclude" ? "bg-red-600 text-white shadow-sm" : "border border-red-200 bg-red-50 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      <XCircle className="h-4 w-4" /> Exclude
                    </button>
                    <button
                      onClick={() => updateDecision(r.id, "Maybe")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[16px] font-bold transition ${
                        r.decision === "Maybe" ? "bg-moni-600 text-white shadow-sm" : "border border-pink-200 bg-moni-50 text-moni-800 hover:bg-moni-100"
                      }`}
                    >
                      <HelpCircle className="h-4 w-4" /> Maybe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
