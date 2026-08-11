"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { mockGaps } from "@/lib/mockData";
import { Sparkles, ShieldCheck, AlertTriangle, TrendingUp, Target, FlaskConical } from "lucide-react";
import { useState } from "react";

export default function GapsPage(){
  const [selected, setSelected] = useState(mockGaps[0]);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-pink-100">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-extrabold tracking-tight flex items-center gap-2"><Sparkles className="h-5 w-5 text-amber-600" /> GapFinder — Research Opportunity Map</h1>
              <p className="text-xs text-ink-500">Killer feature: structured literature → gap types → verification → novelty score</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="rounded-full bg-moni-50 border border-moni-200 px-3 py-1 font-bold text-moni-600">3 opportunities • 163 papers analyzed</span>
            </div>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto space-y-6">
          {/* Visualizer */}
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
            <h3 className="text-sm font-black">Research Gap Visualizer</h3>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-pink-100 p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-ink-500">Theory distribution</div>
                <div className="mt-3 space-y-2">
                  {[
                    { t: "TAM", c: 312, w: "100%" },
                    { t: "UTAUT", c: 184, w: "59%" },
                    { t: "TTF", c: 76, w: "24%" },
                    { t: "TOE", c: 61, w: "19%" },
                    { t: "Institutional", c: 23, w: "7%" },
                  ].map(r=>(
                    <div key={r.t} className="flex items-center gap-2 text-xs">
                      <span className="w-24 font-bold">{r.t}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-ink-900" style={{width:r.w}} /></div>
                      <span className="w-14 text-right font-mono">{r.c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-pink-100 p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-ink-500">Geography</div>
                <div className="mt-3 space-y-2">
                  {[
                    { c: "USA", v: "███████████ 312" },
                    { c: "China", v: "█████████ 284" },
                    { c: "UK", v: "███████ 184" },
                    { c: "India", v: "██████ 142" },
                    { c: "Nigeria", v: "██ 12", highlight: true },
                    { c: "Ghana", v: "█ 6", highlight: true },
                  ].map(r=>(
                    <div key={r.c} className={`flex items-center gap-2 text-xs font-mono ${r.highlight ? 'text-moni-600 font-bold' : 'text-slate-600'}`}><span className="w-16 font-sans font-bold">{r.c}</span> {r.v} {r.highlight && '← GAP'}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-pink-100 p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-ink-500">Population</div>
                <div className="mt-3 space-y-2">
                  {[
                    { p: "Students", n: 420 },
                    { p: "Lecturers", n: 132 },
                    { p: "Admins", n: 61 },
                    { p: "Researchers", n: 43 },
                  ].map(r=>(
                    <div key={r.p} className="flex items-center gap-2 text-xs">
                      <span className="w-24 font-bold">{r.p}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-100"><div className="h-full bg-moni-500" style={{width: `${r.n/4.2}%`}} /></div>
                      <span className="font-mono">{r.n}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg bg-moni-50 border border-moni-200 p-2 text-xs"><span className="font-bold">Gap:</span> Lecturers under-studied vs students (3.2×).</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-bold">Ranked opportunities</h3>
              {mockGaps.map(g=>(
                <button key={g.id} onClick={()=>setSelected(g)} className={`w-full text-left rounded-2xl border p-4 ${selected.id===g.id ? 'bg-ink-900 text-white border-slate-900' : 'bg-white border-pink-100 hover:border-slate-300'}`}>
                  <div className="text-sm font-bold leading-tight">{g.title}</div>
                  <div className={`text-xs mt-1 ${selected.id===g.id ? 'text-white/70' : 'text-ink-500'}`}>{g.evidence}</div>
                  <div className="mt-2 flex gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${selected.id===g.id ? 'bg-white text-ink-900' : 'bg-slate-100 border border-pink-100'}`}>{g.overall}/100</span>
                    <span className={`text-[11px] ${selected.id===g.id ? 'text-white/60' : 'text-ink-500'}`}>{g.geography} • {g.method}</span>
                  </div>
                </button>
              ))}
              <div className="rounded-xl border border-pink-100 bg-white p-4">
                <div className="text-xs font-bold">Contradiction Detector</div>
                <div className="text-xs text-slate-600 mt-1">Study A: X → Y positive (β=0.42***, China). Study B: X → Y null (p=.41, Nigeria). Difference = context + measurement. → Research opportunity.</div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-600" />
                  <h3 className="text-sm font-black">{selected.title}</h3>
                  <span className="ml-auto rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">{selected.overall}/100 Strong opportunity</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {[
                    { k: "Novelty", v: selected.novelty },
                    { k: "Feasibility", v: selected.feasibility },
                    { k: "Publication", v: selected.publication },
                    { k: "Overall", v: selected.overall },
                  ].map(s=>(
                    <div key={s.k} className="rounded-xl border border-pink-100 bg-moni-50 p-3">
                      <div className="text-lg font-black">{s.v}</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-ink-500">{s.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-moni-50 border border-moni-200 p-4">
                    <div className="text-xs font-bold flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Gap Verification Engine</div>
                    <div className="text-xs mt-1 leading-relaxed text-slate-700">
                      Searched: Nigeria, Nigerian, Ghana, Sub-Saharan, dissertations, conference papers, 2024-2026.<br/>
                      <span className="font-bold text-emerald-700">Confidence: 87% — gap is real</span><br/>
                      Rejected: 3 studies already address partially (Adeyemi 2024, Okonkwo 2023). Future work suggested longitudinal.
                    </div>
                  </div>
                  <div className="rounded-xl bg-moni-50 border border-pink-100 p-4">
                    <div className="text-xs font-bold">Gap type</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {["Population","Geographic","Methodological","Variable"].map(t=>(
                        <span key={t} className="rounded-full bg-white border border-pink-100 px-2.5 py-1 text-xs font-bold">{t}</span>
                      ))}
                    </div>
                    <div className="text-xs font-bold mt-3">Suggested theory</div>
                    <div className="text-xs">UTAUT + TTF + Institutional — why: explains individual + fit + context.</div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-ink-900 text-white p-4">
                  <div className="text-xs font-bold tracking-widest uppercase opacity-60">Generated Research Question</div>
                  <div className="mt-1 text-sm font-bold">How does AI literacy influence trust and subsequent adoption intention among university lecturers in Sub-Saharan Africa, and how do institutional pressures moderate this relationship?</div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg bg-white/10 p-2"><div className="opacity-60">IV</div><div className="font-bold">AI literacy</div></div>
                    <div className="rounded-lg bg-white/10 p-2"><div className="opacity-60">Mediator</div><div className="font-bold">Trust</div></div>
                    <div className="rounded-lg bg-white/10 p-2"><div className="opacity-60">DV</div><div className="font-bold">Adoption intention</div></div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold">Evidence Matrix (excerpt)</h3>
                <div className="mt-3 overflow-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="text-left text-ink-500 border-b"><th className="pb-2 font-bold">Study</th><th className="pb-2 font-bold">Theory</th><th className="pb-2 font-bold">Finding</th><th className="pb-2 font-bold">Gap</th></tr></thead>
                    <tbody>
                      {[
                        ["Zhang 2024","UTAUT2","β0.42***","No trust"],
                        ["Santos 2024","UTAUT+TTF","Mediation","Single country"],
                        ["Adeyemi 2024","TOE","Qual low support","No quant"],
                      ].map(r=>(
                        <tr key={r[0]} className="border-b border-slate-100"><td className="py-2 font-bold">{r[0]}</td><td className="py-2">{r[1]}</td><td className="py-2 font-mono">{r[2]}</td><td className="py-2 text-moni-600">{r[3]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-white">Export Excel</button>
                  <button className="rounded-full border border-pink-100 px-4 py-2 text-xs font-bold">Export BibTeX</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
