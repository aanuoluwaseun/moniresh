"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { GraduationCap, ShieldAlert, FileCheck2, Search } from "lucide-react";

const journals = [
  { name: "Computers & Education", fit: 94, apc: "$$$", quartile: "Q1", oa: "Hybrid", risk: "Low", scope: "AI in education, strong fit with lecturer focus" },
  { name: "British J. Educ. Technol.", fit: 91, apc: "$$", quartile: "Q1", oa: "Hybrid", risk: "Low", scope: "Tech acceptance, UTAUT" },
  { name: "Education & Info Technologies", fit: 88, apc: "$$", quartile: "Q2", oa: "Hybrid", risk: "Low", scope: "Broad, Africa context appreciated" },
  { name: "Tech. Soc. (Technology in Society)", fit: 81, apc: "$$$", quartile: "Q1", oa: "Hybrid", risk: "Low", scope: "Cross-cultural AI acceptance" },
];

export default function JournalsPage(){
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-pink-100">
          <div className="px-6 lg:px-8 py-4">
            <h1 className="text-[20px] font-extrabold tracking-tight flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Journal Intelligence</h1>
            <p className="text-xs text-ink-500">Matchmaker • Integrity detector • Formatting agent • Submission auditor</p>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto space-y-6">
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <h3 className="text-sm font-black">Journal Matchmaker — Manuscript: AI Literacy → Trust → Adoption</h3>
              <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-ink-900 text-white">4 matches</span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {journals.map(j=>(
                <div key={j.name} className="rounded-2xl border border-pink-100 bg-white p-4 hover:shadow-card-lg transition">
                  <div className="text-sm font-bold leading-tight">{j.name}</div>
                  <div className="text-xs text-ink-500 mt-1">{j.scope}</div>
                  <div className="mt-3 flex gap-1.5 flex-wrap">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs font-bold text-emerald-700">{j.fit}% fit</span>
                    <span className="rounded-full bg-moni-50 border border-pink-100 px-2 py-1 text-xs font-bold">{j.quartile}</span>
                    <span className="rounded-full bg-moni-50 border border-moni-200 px-2 py-1 text-xs font-bold">{j.apc}</span>
                  </div>
                  <div className="mt-2 text-xs"><span className="font-bold">OA:</span> {j.oa} • <span className="font-bold">Risk:</span> <span className="text-emerald-700 font-bold">{j.risk}</span></div>
                  <button className="mt-3 w-full rounded-full bg-ink-900 py-2 text-xs font-bold text-white">Prepare for this journal</button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-amber-600" /> Journal Integrity Agent</h3>
              <div className="mt-3 space-y-2 text-xs">
                {[
                  ["Predatory check","Clean — not in Beall's, verified indexing","ok"],
                  ["Fake impact factor","Verified via JCR: IF 12.8 correct","ok"],
                  ["Editorial board","Verified editors, not hijacked","ok"],
                  ["APC transparency","APC $3200 stated, waiver for low-income","ok"],
                ].map(([k,v,s])=>(
                  <div key={k} className="flex items-center justify-between rounded-xl border border-slate-100 bg-moni-50 px-3 py-2">
                    <div><div className="font-bold">{k}</div><div className="text-slate-600">{v}</div></div><div className={`h-2 w-2 rounded-full ${s==='ok' ? 'bg-emerald-500' : 'bg-moni-500'}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-emerald-600" /> Submission Auditor — Readiness 84 → 93 after formatting</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Word count","7,420 / 8,000","ok"],
                  ["Abstract","168 words, structured","ok"],
                  ["References","APA7, 63 refs, 0 errors","ok"],
                  ["Tables","3 tables, style OK","ok"],
                  ["Ethics","Statement present","ok"],
                  ["Anonymization","Author info removed","warn"],
                ].map(([k,v,s])=>(
                  <div key={k} className={`rounded-xl border p-3 ${s==='ok' ? 'bg-emerald-50 border-emerald-200' : 'bg-moni-50 border-moni-200'}`}>
                    <div className="font-bold">{k}</div><div>{v}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-full bg-ink-900 py-2.5 text-xs font-bold text-white">Format for Computers & Education</button>
              <div className="mt-2 text-xs text-ink-500">Auto: structure, headings, ref style, title page, declarations, funding, COI, ethics, data availability.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
