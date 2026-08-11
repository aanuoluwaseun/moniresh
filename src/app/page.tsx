"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { mockProjects, mockGaps, prismaData } from "@/lib/mockData";
import {
  Search, Sparkles, FileText, Table2, PenLine, ShieldCheck,
  ArrowUpRight, Clock, Layers, Target, TrendingUp, AlertTriangle,
  CheckCircle2, BookOpen, FlaskConical, BarChart3, Library, Zap, Heart
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FFF8FB] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar />
        {/* Header — pink premium */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-pink-100">
          <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-moni-50 border border-moni-100 px-3 py-1 text-[11px] font-black tracking-widest uppercase text-moni-600">
                <Heart className="h-3 w-3 fill-moni-500 text-moni-500" /> RESEARCH OPERATING SYSTEM
              </div>
              <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink-900 leading-none">Good afternoon, Aanuoluwa <span className="text-gradient">— let's make evidence</span></h1>
              <p className="text-[13px] text-ink-500 font-medium mt-1">What took 3 months, now takes 3 hours. Your Research OS is ready.</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/literature" className="inline-flex items-center gap-2 rounded-full pink-gradient px-5 py-2.5 text-xs font-black text-white shadow-pink hover:shadow-pink-lg transition-all hover:-translate-y-0.5">
                <Search className="h-3.5 w-3.5" /> New Search
              </Link>
              <Link href="/gaps" className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2.5 text-xs font-black text-moni-600 hover:bg-moni-50 transition">
                <Sparkles className="h-3.5 w-3.5" /> Find My Gap
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-8 py-7 space-y-7 max-w-[1400px] w-full mx-auto">
          {/* Copywriting hero — the transformation */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-[24px] bg-white border border-pink-100 p-6 lg:p-7 shadow-card overflow-hidden relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-moni-50 blur-2xl" />
            <div className="absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-pink-50 blur-2xl" />
            <div className="relative flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div>
                <p className="text-[13px] font-black tracking-widest uppercase text-moni-500">From chaos to clarity</p>
                <h2 className="text-[22px] font-black tracking-tight leading-tight text-ink-900 mt-1">Stop wrestling 11 tools.<br /><span className="text-gradient">Start orchestrating one evidence engine.</span></h2>
                <p className="text-sm text-ink-500 mt-2 max-w-[620px] font-medium leading-relaxed">Google Scholar + Zotero + Excel + SPSS + Word was never a workflow. MONIRESH is. Every claim linked to its source. Every gap verified. Every table checked.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <div className="rounded-2xl bg-moni-50 border border-moni-100 px-4 py-3 text-center min-w-[110px]">
                  <div className="text-[22px] font-black text-moni-600">8 min</div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-ink-500">2,284 screened</div>
                </div>
                <div className="rounded-2xl bg-ink-900 text-white px-4 py-3 text-center min-w-[110px]">
                  <div className="text-[22px] font-black">94<span className="text-moni-300">/100</span></div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">Quality score</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project cards — white/pink, hover lift */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black tracking-tight text-ink-900">Your research, beautifully organized</h2>
              <span className="text-xs font-semibold text-ink-500">{mockProjects.length} active • Evidence at every step</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mockProjects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="group rounded-[20px] border border-pink-100 bg-white p-5 shadow-card card-hover">
                  <div className="flex items-start justify-between">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-pink ${p.color === 'amber' ? 'pink-gradient' : p.color === 'blue' ? 'bg-ink-900' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                      {p.title.slice(0,2).toUpperCase()}
                    </div>
                    <span className="rounded-full bg-moni-50 border border-moni-100 px-3 py-1 text-[11px] font-black text-moni-600">{p.status}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-black leading-tight text-ink-900 line-clamp-2 group-hover:text-moni-600 transition">{p.title}</h3>
                  <p className="mt-1 text-[11px] font-medium text-ink-500 line-clamp-1">{p.field}</p>
                  <div className="mt-4 h-2 rounded-full bg-moni-50 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.1 }} className="h-full pink-gradient rounded-full" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-ink-700">{p.progress}% orchestrated</span>
                    <span className="text-ink-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {p.updated}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-moni-50 border border-moni-100 p-2.5 text-center">
                      <div className="text-[15px] font-black text-ink-900">{p.papersCollected}</div>
                      <div className="text-[9px] font-black tracking-widest uppercase text-moni-500">Collected</div>
                    </div>
                    <div className="rounded-xl bg-white border border-pink-100 p-2.5 text-center">
                      <div className="text-[15px] font-black text-ink-900">{p.included}</div>
                      <div className="text-[9px] font-black tracking-widest uppercase text-ink-500">Included</div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-moni-500 to-pink-400 border border-moni-200 p-2.5 text-center text-white">
                      <div className="text-[15px] font-black">{p.gapConfidence || '-' }{p.gapConfidence ? '%' : ''}</div>
                      <div className="text-[9px] font-black tracking-widest uppercase opacity-90">Gap conf.</div>
                    </div>
                  </div>
                  <Link href="/systematic" className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-ink-900 py-2.5 text-xs font-black text-white hover:bg-moni-600 transition">
                    Continue Research <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Research OS — pink architecture */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7 shadow-card">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-8 w-8 rounded-xl pink-gradient flex items-center justify-center"><Layers className="h-4 w-4 text-white" /></div>
              <h3 className="text-sm font-black tracking-tight">The Research Operating System</h3>
              <span className="ml-2 rounded-full pink-gradient px-3 py-1 text-[10px] font-black text-white shadow-pink">ORCHESTRATOR • 11 AGENTS</span>
            </div>
            <p className="text-xs font-medium text-ink-500 mb-5">Your idea becomes a graph. The graph becomes evidence. The evidence becomes your paper.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: "Literature Intel", icon: Library, count: "2,847 papers", accent: "bg-moni-50 text-moni-700 border-moni-200" },
                { label: "Screening + PRISMA", icon: FileText, count: "163 included", accent: "bg-white text-ink-800 border-pink-100" },
                { label: "Evidence Matrix", icon: Table2, count: "163 decomposed", accent: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                { label: "GapFinder", icon: Sparkles, count: "3 opportunities", accent: "bg-moni-500 text-white border-moni-500 shadow-pink" },
                { label: "Writing Studio", icon: PenLine, count: "7,420 words", accent: "bg-white text-ink-800 border-pink-100" },
                { label: "Citation Guardian", icon: ShieldCheck, count: "97% accurate", accent: "bg-teal-50 text-teal-700 border-teal-100" },
                { label: "Journal Intel", icon: BookOpen, count: "6 matches", accent: "bg-white text-ink-800 border-pink-100" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`rounded-2xl border p-4 card-hover ${s.accent}`}>
                  <s.icon className="h-5 w-5 mb-2" />
                  <div className="text-xs font-black leading-tight">{s.label}</div>
                  <div className="text-[11px] font-semibold opacity-70 mt-1">{s.count}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-ink-900 text-white p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <div className="text-xs font-black tracking-widest uppercase text-moni-300">How it really works</div>
                <div className="text-sm font-bold leading-relaxed mt-1">Not: <span className="text-white/50 line-through">User → LLM → Answer</span> &nbsp; But: <span className="text-moni-300">User → Orchestrator → Tools → Evidence → Agents → Validators → Output</span></div>
                <div className="text-xs font-medium opacity-60 mt-1">OpenRouter + Hugging Face + NVIDIA — routed for speed, cost, and truth.</div>
              </div>
              <div className="hidden md:block text-right shrink-0">
                <div className="text-[11px] uppercase tracking-widest opacity-60 font-bold">Research Quality</div>
                <div className="text-3xl font-black">94<span className="text-moni-400">/100</span></div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions — copywriting style */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-[20px] border border-pink-100 bg-white p-6 shadow-card">
                <h3 className="text-sm font-black">Start anywhere. MONIRESH meets you there.</h3>
                <p className="text-xs font-medium text-ink-500 mb-4">No rigid funnel — enter at your chaos point and watch it become order.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { title: "“I have no topic.”", desc: "We’ll find your unfair advantage", icon: Sparkles, href: "/gaps" },
                    { title: "“I have a topic.”", desc: "We’ll find the literature that matters", icon: Search, href: "/literature" },
                    { title: "“I have 1,000 papers.”", desc: "We’ll tame them in 8 minutes", icon: FileText, href: "/systematic" },
                    { title: "“I found a gap.”", desc: "We’ll weaponize it into an RQ", icon: Target, href: "/gaps" },
                    { title: "“I have data.”", desc: "We’ll profile, test, and write it", icon: BarChart3, href: "/data-analysis" },
                    { title: "“I have a draft.”", desc: "We’ll audit every claim flawlessly", icon: ShieldCheck, href: "/writing" },
                  ].map((a, i) => (
                    <motion.div key={a.title} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }}>
                      <Link href={a.href} className="group rounded-2xl border border-pink-100 bg-white p-4 hover:border-moni-200 hover:bg-moni-50 transition flex flex-col h-full">
                        <a.icon className="h-5 w-5 mb-2 text-moni-500 group-hover:text-moni-600" />
                        <div className="text-xs font-black text-ink-900">{a.title}</div>
                        <div className="text-xs font-medium text-ink-500">{a.desc}</div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-pink-100 bg-white p-6 shadow-card">
                <h3 className="text-sm font-black flex items-center gap-2"><FileText className="h-4 w-4 text-moni-500" /> PRISMA — reproducible, not regrettable</h3>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "Records identified", v: prismaData.identified },
                    { k: "Duplicates removed", v: prismaData.duplicates },
                    { k: "Records screened", v: prismaData.screened },
                    { k: "Excluded", v: prismaData.excludedScreening, muted: true },
                    { k: "Full-text assessed", v: prismaData.fullTextAssessed },
                    { k: "Studies included", v: prismaData.included, highlight: true },
                  ].map((i) => (
                    <div key={i.k} className={`rounded-2xl border p-3 ${i.highlight ? 'pink-gradient text-white border-moni-500 shadow-pink' : i.muted ? 'bg-moni-50 border-moni-100' : 'bg-white border-pink-100'}`}>
                      <div className="text-lg font-black">{i.v.toLocaleString()}</div>
                      <div className={`text-[11px] font-bold ${i.highlight ? 'text-white/80' : 'text-ink-500'}`}>{i.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs font-medium text-ink-500">Search string, database, date, filters — all preserved for your appendix. One click export.</div>
              </div>
            </div>

            {/* Right column — pink delight */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[20px] border border-moni-200 bg-gradient-to-br from-moni-500 to-pink-400 p-[1px] shadow-pink">
                <div className="rounded-[19px] bg-gradient-to-br from-white to-moni-50 p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-moni-500" />
                    <h3 className="text-sm font-black text-ink-900">Your next paper — already hiding</h3>
                  </div>
                  <p className="mt-2 text-sm font-black leading-tight text-ink-900">{mockGaps[0].title}</p>
                  <p className="mt-1 text-xs font-medium text-ink-600 leading-relaxed">{mockGaps[0].evidence}</p>
                  <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
                    {[
                      { l: "Novelty", v: 92 },
                      { l: "Feasib.", v: 84 },
                      { l: "Publish", v: 88 },
                      { l: "Overall", v: 89 },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl bg-white border border-pink-100 p-2 shadow-card">
                        <div className="text-sm font-black text-ink-900">{s.v}</div>
                        <div className="text-[9px] font-black tracking-widest uppercase text-moni-500">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-2xl bg-white border border-moni-100 p-3">
                    <div className="text-xs font-black text-ink-900 flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Verified — 87% real gap</div>
                    <div className="text-xs font-medium text-ink-600 mt-1">We hunted Nigeria, dissertations, 2024-26. 3 studies rejected. This one is yours.</div>
                  </div>
                  <Link href="/gaps" className="mt-4 flex w-full items-center justify-center rounded-full pink-gradient py-3 text-xs font-black text-white shadow-pink">Claim this gap →</Link>
                </div>
              </motion.div>

              <div className="rounded-[20px] border border-pink-100 bg-white p-5 shadow-card">
                <h3 className="text-sm font-black flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Integrity is not a feature. It’s the product.</h3>
                <div className="mt-3 space-y-2 text-xs font-bold">
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
                    <span className="text-emerald-800">No fabricated references</span><CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
                    <span className="text-emerald-800">No invented statistics</span><CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5">
                    <span className="text-amber-800">1 table ↔ text mismatch flagged</span><AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-medium text-ink-500 leading-relaxed">If data doesn’t exist, we say so: “I cannot produce results until dataset is supplied.”</div>
              </div>

              <div className="rounded-[20px] border border-pink-100 bg-white p-5 shadow-card">
                <h3 className="text-sm font-black">Under the hood</h3>
                <div className="mt-3 space-y-2 text-xs font-medium">
                  <div className="flex justify-between"><span className="text-ink-500">OpenRouter</span><span className="font-black text-ink-900">200+ models • failover</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Hugging Face</span><span className="font-black text-ink-900">Batch • 15× cheaper</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">NVIDIA NIM</span><span className="font-black text-moni-600">Ultra-fast • NV-Embed</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Storage</span><span className="font-black text-emerald-600">Supabase pgvector</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
