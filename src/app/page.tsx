"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { mockProjects, mockPapers, mockGaps, prismaData } from "@/lib/mockData";
import {
  Search, Sparkles, FileText, Table2, PenLine, ShieldCheck,
  ArrowUpRight, Clock, Layers, Target, TrendingUp, AlertTriangle,
  CheckCircle2, BookOpen, FlaskConical, BarChart3, Library
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [activeProject] = useState(mockProjects[0]);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar />
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900">Dashboard</h1>
              <p className="text-[13px] text-slate-500">Welcome back, Aanuoluwa — your Research OS is ready.</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/literature" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
                <Search className="h-3.5 w-3.5" /> New Search
              </Link>
              <Link href="/gaps" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                <Sparkles className="h-3.5 w-3.5" /> Find Gaps
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-8 py-6 space-y-6 max-w-[1400px] w-full mx-auto">
          {/* Project cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold tracking-tight text-slate-900">Active Research Projects</h2>
              <span className="text-xs text-slate-500">{mockProjects.length} projects • Evidence at every step</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockProjects.map((p) => (
                <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-lg transition">
                  <div className="flex items-start justify-between">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-black ${p.color === 'amber' ? 'bg-amber-600' : p.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                      {p.title.slice(0,2).toUpperCase()}
                    </div>
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600">{p.status}</span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-bold leading-tight text-slate-900 line-clamp-2">{p.title}</h3>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{p.field}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-900" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">{p.progress}% complete</span>
                    <span className="text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {p.updated}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 text-center">
                      <div className="text-[13px] font-extrabold text-slate-900">{p.papersCollected}</div>
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">Collected</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 text-center">
                      <div className="text-[13px] font-extrabold text-slate-900">{p.included}</div>
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">Included</div>
                    </div>
                    <div className="rounded-lg bg-amber-50 border border-amber-100 p-2 text-center">
                      <div className="text-[13px] font-extrabold text-amber-700">{p.gapConfidence || '-' }{p.gapConfidence ? '%' : ''}</div>
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-amber-700">Gap conf.</div>
                    </div>
                  </div>
                  <Link href="/systematic" className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    Continue Research <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* The whole workflow - Research Operating System */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="h-4 w-4 text-slate-900" />
              <h3 className="text-sm font-black tracking-tight">The Research Operating System</h3>
              <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">ORCHESTRATOR</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Idea → Literature → Screening → Extraction → Synthesis → Gap → Question → Framework → Method → Data → Manuscript → Journal → Publication</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {[
                { label: "Literature Intelligence", icon: Library, count: "2,847 papers", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "Screening + PRISMA", icon: FileText, count: "163 included", color: "bg-violet-50 text-violet-700 border-violet-200" },
                { label: "Evidence Matrix", icon: Table2, count: "163 decomposed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { label: "GapFinder", icon: Sparkles, count: "3 opportunities", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { label: "Writing Studio", icon: PenLine, count: "7,420 words", color: "bg-sky-50 text-sky-700 border-sky-200" },
                { label: "Citation Guardian", icon: ShieldCheck, count: "97% accurate", color: "bg-teal-50 text-teal-700 border-teal-200" },
                { label: "Journal Intel", icon: BookOpen, count: "6 matches", color: "bg-slate-50 text-slate-700 border-slate-200" },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl border p-3 ${s.color}`}>
                  <s.icon className="h-4 w-4 mb-2 opacity-70" />
                  <div className="text-xs font-bold leading-tight">{s.label}</div>
                  <div className="text-[11px] opacity-70 mt-1">{s.count}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 rounded-xl bg-slate-900 text-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">Orchestrator decides what runs next.</div>
                  <div className="text-xs opacity-60">Not: User → LLM → Answer. But: User → Orchestrator → Tools → Evidence → Agents → Validators → Output</div>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-[11px] uppercase tracking-widest opacity-60">Research Quality Score</div>
                  <div className="text-2xl font-black">94<span className="text-amber-400">/100</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold mb-3">Quick actions — enter at any point</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { title: "I have no topic", desc: "Find promising opportunities", icon: Sparkles, href: "/gaps" },
                    { title: "I have a topic", desc: "Find the literature", icon: Search, href: "/literature" },
                    { title: "Here are 1,000 papers", desc: "Conduct systematic review", icon: FileText, href: "/systematic" },
                    { title: "Here is my gap", desc: "Build the study", icon: Target, href: "/gaps" },
                    { title: "Here is my dataset", desc: "Analyze it (CSV/SPSS)", icon: BarChart3, href: "/data-analysis" },
                    { title: "Here is my manuscript", desc: "Audit everything", icon: ShieldCheck, href: "/writing" },
                  ].map((a) => (
                    <Link key={a.title} href={a.href} className="group rounded-xl border border-slate-200 p-4 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition">
                      <a.icon className="h-5 w-5 mb-2 text-slate-500 group-hover:text-white" />
                      <div className="text-xs font-bold">{a.title}</div>
                      <div className="text-xs opacity-70">{a.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* PRISMA mini */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold flex items-center gap-2"><FileText className="h-4 w-4" /> PRISMA Flow — AI Adoption project</h3>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "Records identified", v: prismaData.identified },
                    { k: "Duplicates removed", v: prismaData.duplicates },
                    { k: "Records screened", v: prismaData.screened },
                    { k: "Excluded (screening)", v: prismaData.excludedScreening, muted: true },
                    { k: "Full-text assessed", v: prismaData.fullTextAssessed },
                    { k: "Studies included", v: prismaData.included, highlight: true },
                  ].map((i) => (
                    <div key={i.k} className={`rounded-xl border p-3 ${i.highlight ? 'bg-slate-900 text-white border-slate-900' : i.muted ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200'}`}>
                      <div className="text-lg font-black">{i.v.toLocaleString()}</div>
                      <div className={`text-[11px] font-semibold ${i.highlight ? 'text-white/70' : 'text-slate-500'}`}>{i.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-500">Auto-generated, reproducible — search string, database, date, filters preserved.</div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-700" />
                  <h3 className="text-sm font-black text-amber-900">GapFinder — Top Opportunity</h3>
                </div>
                <p className="mt-2 text-sm font-bold leading-tight text-slate-900">{mockGaps[0].title}</p>
                <p className="mt-1 text-xs text-slate-600">{mockGaps[0].evidence}</p>
                <div className="mt-3 grid grid-cols-4 gap-1 text-center">
                  {[
                    { l: "Novelty", v: 92 },
                    { l: "Feasib.", v: 84 },
                    { l: "Publish", v: 88 },
                    { l: "Overall", v: 89 },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg bg-white border border-amber-100 p-2">
                      <div className="text-sm font-black text-slate-900">{s.v}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-white border border-amber-200 p-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Gap Verification</div>
                  <div className="text-xs text-slate-600 mt-1">Searched Nigeria, dissertations, 2024-26. Confidence <span className="font-bold text-emerald-700">87% real gap</span>. 3 studies rejected (already address it).</div>
                </div>
                <Link href="/gaps" className="mt-3 flex w-full items-center justify-center rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white">Explore Gap →</Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Integrity Guard</h3>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                    <span className="font-semibold text-emerald-800">No fabricated refs</span><CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                    <span className="font-semibold text-emerald-800">No invented stats</span><CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                    <span className="font-semibold text-amber-800">1 table ↔ text mismatch flagged</span><AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
                    <span className="font-semibold text-slate-700">Retraction check: clean</span><CheckCircle2 className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-slate-500">Evidence-first • Every claim → source → confidence. If data doesn't exist, MONIRESH says: "I cannot produce results until dataset is supplied."</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold">System status</h3>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Database</span><span className="font-bold text-emerald-600">Supabase • Connected</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Vector (pgvector)</span><span className="font-bold text-emerald-600">Ready</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Orchestrator</span><span className="font-bold text-slate-900">LangGraph • 11 agents</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Build</span><span className="font-mono text-slate-700">Production • Vercel</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture strip */}
          <div className="rounded-2xl bg-slate-900 text-white p-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-widest uppercase opacity-60">
              <span>Frontend Next.js</span> <span>•</span> <span>Supabase Postgres+Auth+Storage</span> <span>•</span> <span>LangGraph</span> <span>•</span> <span>pgvector</span> <span>•</span> <span>Python stats</span> <span>•</span> <span>Vercel</span>
            </div>
            <div className="mt-3 text-sm leading-relaxed opacity-80">
              Built per your <span className="text-amber-400 font-bold">Product → Production Protocol</span>: Intake → Product → Research → Requirements → Architecture → Data → API → UX → Security → Foundation → Vertical slices → Test → Audit → Optimize → Production → Monitor. Never code before understanding requirement. Never trust client-side authorization.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
