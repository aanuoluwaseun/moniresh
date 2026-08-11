"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { mockPapers, prismaData } from "@/lib/mockData";
import { useState } from "react";
import { FileScan, Check, X, HelpCircle, Download, Filter } from "lucide-react";

export default function SystematicPage(){
  const [filter, setFilter] = useState<'All'|'Include'|'Exclude'|'Maybe'>('All');
  const shown = mockPapers.filter(p=> filter==='All' ? true : p.decision===filter);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-pink-100">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-extrabold tracking-tight flex items-center gap-2"><FileScan className="h-5 w-5" /> Screening & PRISMA</h1>
              <p className="text-xs text-ink-500">Study Screening Agent • Audit trail • Human approves uncertain</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-white"><Download className="h-3.5 w-3.5" /> Export PRISMA</button>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto space-y-6">
          {/* PRISMA */}
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
            <h3 className="text-sm font-black">PRISMA Flow Diagram (auto)</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-center">
              {[
                ["Identification", prismaData.identified.toString(), "Records from databases"],
                ["Dedup", `-${prismaData.duplicates}`, "Removed"],
                ["Screening", prismaData.screened.toString(), "Titles/abstracts"],
                ["Excluded", prismaData.excludedScreening.toString(), "Wrong population etc"],
                ["Full-text", prismaData.fullTextAssessed.toString(), "Assessed"],
                ["Excluded FT", prismaData.excludedFullText.toString(), "Reasons"],
                ["Included", prismaData.included.toString(), "Studies in review"],
              ].map(([k,v,sub],i)=>(
                <div key={k} className="relative">
                  <div className={`rounded-2xl border p-4 ${k==="Included" ? "bg-ink-900 text-white border-slate-900" : "bg-white border-pink-100"}`}>
                    <div className="text-xs font-bold tracking-widest uppercase opacity-60">{k}</div>
                    <div className="text-xl font-black mt-1">{v}</div>
                    <div className="text-[11px] opacity-70">{sub}</div>
                  </div>
                  {i<6 && <div className="hidden md:block absolute top-1/2 -right-3 h-0.5 w-6 bg-slate-200" />}
                </div>
              ))}
            </div>
          </div>

          {/* Criteria */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-xs font-black text-emerald-800">Inclusion Criteria</div>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4">
                <li>Population: university lecturers</li>
                <li>Intervention: AI adoption / acceptance</li>
                <li>Design: empirical, peer-reviewed</li>
                <li>Lang: English, 2020-2026</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="text-xs font-black text-red-800">Exclusion Criteria</div>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4">
                <li>Population: only students</li>
                <li>Grey literature / non peer-reviewed</li>
                <li>Duplicate/preprint without new data</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-white p-4">
              <div className="text-xs font-bold">Screening Agent</div>
              <div className="text-xs text-slate-600 mt-1">Not silently deciding. Produces decision + confidence + reason + audit trail.</div>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-1 font-bold">Include 96%</span>
                <span className="rounded-full bg-red-50 border border-red-200 px-2 py-1 font-bold">Exclude 94%</span>
                <span className="rounded-full bg-moni-50 border border-moni-200 px-2 py-1 font-bold">Maybe 61% → human</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-pink-100 bg-white shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-ink-500" />
                <div className="flex gap-1">
                  {(["All","Include","Exclude","Maybe"] as const).map(f=>(
                    <button key={f} onClick={()=>setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold border ${filter===f ? 'bg-ink-900 text-white border-slate-900' : 'bg-white border-pink-100'}`}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="text-xs text-ink-500">{shown.length} papers</div>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-xs">
                <thead className="bg-moni-50 text-left">
                  <tr className="border-b border-pink-100">
                    <th className="px-4 py-3 font-bold">Paper</th>
                    <th className="px-4 py-3 font-bold">Decision</th>
                    <th className="px-4 py-3 font-bold">Confidence</th>
                    <th className="px-4 py-3 font-bold">Reason</th>
                    <th className="px-4 py-3 font-bold">Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map(p=>(
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-moni-50">
                      <td className="px-4 py-3 max-w-[420px]">
                        <div className="font-bold leading-tight line-clamp-2">{p.title}</div>
                        <div className="text-ink-500">{p.authors} • {p.journal} • {p.year} • {p.citations} cites • {p.theory}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border ${p.decision==='Include' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.decision==='Exclude' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-moni-50 text-moni-600 border-moni-200'}`}>
                          {p.decision==='Include' ? <Check className="h-3 w-3" /> : p.decision==='Exclude' ? <X className="h-3 w-3" /> : <HelpCircle className="h-3 w-3" />} {p.decision}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">{p.confidence}%</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[260px]">{p.decision==='Include' ? 'Meets population and intervention criteria' : p.decision==='Exclude' ? 'Wrong population' : 'Abstract insufficient'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-white">Approve</button>
                          <button className="rounded-full border border-pink-100 px-3 py-1 text-xs font-bold">Override</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
