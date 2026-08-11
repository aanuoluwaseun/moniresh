"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { useState } from "react";
import { PenLine, ShieldCheck, BookMarked, AlertTriangle, CheckCircle2, Sparkles, FileCheck2 } from "lucide-react";

export default function WritingPage(){
  const [selectedSentence, setSelectedSentence] = useState(1);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
          <div className="px-6 lg:px-8 py-3 flex items-center gap-3">
            <PenLine className="h-4 w-4 text-slate-900" />
            <h1 className="text-[16px] font-black">Manuscript Workspace</h1>
            <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold">7,420 words</span>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Readiness 84%</span>
            <div className="ml-auto flex gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold">Export DOCX</button>
              <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white">Check Manuscript</button>
            </div>
          </div>
        </header>
        <div className="flex-1 flex min-h-0">
          {/* Outline left */}
          <div className="hidden lg:block w-[240px] border-r border-slate-200 bg-white p-4 overflow-auto">
            <div className="text-[11px] font-bold tracking-widest uppercase text-slate-500">Outline</div>
            <div className="mt-3 space-y-1 text-xs">
              {[
                "Title",
                "Abstract — 94% cited",
                "Introduction — 88% coverage",
                "Literature Review — 96%",
                "Theoretical Framework",
                "Conceptual Framework",
                "Methodology",
                "Results",
                "Discussion — 91%",
                "Conclusion",
                "References — 63 refs",
                "Appendices",
              ].map((s,i)=>(
                <div key={s} className={`rounded-lg px-3 py-2 font-medium ${i===2 ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'}`}>{s}</div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3">
              <div className="text-xs font-bold text-amber-900">Citation Coverage</div>
              <div className="mt-1 space-y-1 text-xs">
                <div className="flex justify-between"><span>Introduction</span><span className="font-bold">88%</span></div>
                <div className="flex justify-between"><span>Lit Review</span><span className="font-bold">96%</span></div>
                <div className="flex justify-between"><span>Discussion</span><span className="font-bold">91%</span></div>
              </div>
            </div>
          </div>

          {/* Center editor */}
          <div className="flex-1 bg-[#FCFCF9] overflow-auto">
            <div className="max-w-[720px] mx-auto bg-white my-6 border border-slate-200 rounded-xl shadow-card p-8 lg:p-10">
              <div className="text-center border-b border-slate-100 pb-6">
                <h1 className="text-[22px] font-extrabold leading-tight">AI Literacy, Institutional Trust, and Adoption Intention among University Lecturers in Sub-Saharan Africa: An Integrated UTAUT–TTF Perspective</h1>
                <div className="mt-2 text-xs text-slate-500">Aanuoluwa et al. • MONIRESH Draft • Target: Computers & Education</div>
              </div>
              <div className="prose-rigora mt-6">
                <h2>1. Introduction</h2>
                <p>
                  <span onClick={()=>setSelectedSentence(1)} className={`cursor-pointer rounded px-1 ${selectedSentence===1 ? 'bg-amber-100 border border-amber-200' : 'claim-highlight'}`}>
                    Artificial intelligence adoption is increasing in higher education, yet empirical evidence remains concentrated in developed economies
                  </span>{' '}
                  <span className="citation">[Zhang et al. 2024; Chen & Williams 2023]</span>. While 312 studies examine AI adoption through TAM/UTAUT lenses, only 12 focus on Sub-Saharan Africa, and just 3 examine lecturers as the primary population<span className="citation">[Adeyemi et al. 2024]</span>.
                </p>
                <p className={selectedSentence===2 ? 'bg-amber-100 border border-amber-200 rounded px-1' : ''} onClick={()=>setSelectedSentence(2)}>
                  This imbalance creates a critical gap: institutional pressures and AI literacy have been theorized as decisive factors <span className="citation">[Santos & Lim 2024]</span>, but they have rarely been tested together in a single model. Consequently, the mediating role of trust between literacy and adoption remains under-explored, particularly in resource-constrained settings.
                </p>
                <h3>Research Gap & Contribution</h3>
                <p>
                  Our Evidence Matrix of 163 included studies shows that most quantitative work is cross-sectional surveys of students in Asia and North America. Lecturer-focused, longitudinal, and mixed-method designs constitute less than 8% of the corpus. By integrating UTAUT, TTF, and institutional theory, this study addresses both a population gap and a theoretical gap.
                </p>
                <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 my-4">
                  <div className="text-xs font-bold flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Potential inconsistency flagged</div>
                  <div className="text-xs mt-1">Manuscript says H1 supported, but table shows p=.183 (Table 3). RIGORA suggests: revise text or re-run analysis. <span className="font-bold">Text → Table → Output must align.</span></div>
                </div>
                <h2>2. Literature Review</h2>
                <p>
                  UTAUT remains dominant (184 papers) yet often without contextual extension. TTF (76 papers) adds fit, but institutional theory (23 papers) is seldom integrated. This study proposes: <em>AI literacy → Trust → Adoption intention</em>, moderated by institutional support.
                </p>
                <p className="text-xs text-slate-500 border-l-2 border-slate-200 pl-3">Every claim has evidence. Click a sentence to see its sources on the right →</p>
              </div>
              <div className="mt-8 flex gap-2 border-t border-slate-100 pt-4">
                <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">Generate next section</button>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold">Improve academic voice</button>
              </div>
            </div>
          </div>

          {/* Right AI panel */}
          <div className="hidden xl:block w-[360px] border-l border-slate-200 bg-white overflow-auto">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-black flex items-center gap-2"><Sparkles className="h-4 w-4 text-amber-600" /> AI Research Panel</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-bold">Evidence for selected sentence</div>
                <div className="mt-2 text-xs leading-relaxed">
                  <div className="font-bold">{selectedSentence===1 ? 'Claim: Adoption increasing but concentrated' : 'Claim: Literacy + trust gap'}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="rounded-full bg-blue-100 border border-blue-200 px-2 py-1 text-[11px] font-bold">12 sources</span>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-1 text-[11px] font-bold text-emerald-700">Confidence: Moderate</span>
                    <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-1 text-[11px] font-bold text-amber-700">3 contradict</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="rounded-lg bg-white border p-2"><div className="font-bold">Study A — Zhang 2024</div><div className="text-slate-600">Supports increase, n=842, China</div></div>
                    <div className="rounded-lg bg-white border p-2"><div className="font-bold">Study B — Adeyemi 2024</div><div className="text-slate-600">Barriers in Africa, n=210, SA</div></div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <div className="text-xs font-bold text-blue-900">Gap</div>
                <div className="text-xs mt-1 text-slate-700">This paragraph has not yet established the research gap clearly. <button className="font-bold text-blue-700 underline">Connect contradiction between Studies A & B.</button></div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-xs font-bold flex items-center gap-1"><BookMarked className="h-3.5 w-3.5" /> Citation Guardian</div>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2"><span>Claim → Source alignment</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2"><span>Refs from Crossref (DOI)</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-100 px-3 py-2"><span>3 refs older than 5 years — justified (foundational)</span><AlertTriangle className="h-4 w-4 text-amber-600" /></div>
                </div>
                <div className="mt-2 text-[11px] text-slate-500">No fake citations. Every reference pulled via DOI metadata, not LLM invented.</div>
              </div>

              <div className="rounded-xl bg-slate-900 text-white p-4">
                <div className="text-xs font-bold">Academic Voice Editor</div>
                <div className="text-xs opacity-70 mt-1">Improve clarity, vary sentences, match your voice — not "bypass detector."</div>
                <button className="mt-2 w-full rounded-full bg-white py-2 text-xs font-bold text-slate-900">Refine paragraph</button>
              </div>

              <div className="rounded-xl border border-slate-200 p-3">
                <div className="text-xs font-bold flex items-center gap-1"><FileCheck2 className="h-3.5 w-3.5" /> Reference Freshness</div>
                <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-slate-900" style={{width: "42%"}} /></div>
                <div className="mt-1 text-xs flex justify-between"><span>Last 5 years: 42% (26/63)</span><span className="font-bold">58% older</span></div>
                <div className="text-[11px] text-slate-500 mt-1">Older refs flagged where not foundational theory.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
