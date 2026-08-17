"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, ShieldCheck, ArrowRight, Play, Search, Layers } from "lucide-react";

export default function GapsPage() {
  const [topic, setTopic] = useState("");
  const [gaps, setGaps] = useState([
    { id: "GAP-01", type: "Population Gap", title: "Lecturers in Africa — almost absent", evidence: "3 of 42 studies examined lecturers; 39 focused on students in North America/Asia.", verification: "Crossref + OpenAlex • Confidence 92%", draftRQ: "What drives Generative AI adoption among lecturers in Africa?" },
  ]);

  const onFind = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setGaps([{ id: Date.now().toString(), type: "Theoretical Gap", title: `Trust + UTAUT2 in ${topic.trim()}`, evidence: "No study integrates institutional trust with UTAUT2 in this context.", verification: "Crossref Polite Pool • 91%", draftRQ: `Does trust mediate AI adoption in ${topic.trim()}?` }, ...gaps]);
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#E2E8F0]">
          <div className="px-6 lg:px-8 py-5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-[10px] bg-[#4F46E5] text-white grid place-items-center"><Sparkles className="h-4 w-4" /></div>
            <div>
              <h1 className="text-[18px] font-semibold tracking-tight">GapFinder</h1>
              <p className="text-[13px] text-[#64748B]">Real gaps, verified — not invented.</p>
            </div>
          </div>
        </header>

        <main className="px-6 lg:px-8 py-6 max-w-[1120px] w-full mx-auto space-y-6">
          {/* Hero with image */}
          <div className="card p-0 overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 lg:p-7">
              <h2 className="text-[20px] font-semibold tracking-tight">Find a gap you can defend</h2>
              <p className="text-[14px] text-[#475569] mt-1.5 leading-relaxed">We map who was studied, where, and how — then re-search against each candidate to check counter-evidence.</p>
              <form onSubmit={onFind} className="mt-5 flex gap-2">
                <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., AI adoption among lecturers in Africa" className="flex-1 rounded-[10px] border border-[#E2E8F0] px-4 py-3 text-[14px] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF]" />
                <button type="submit" className="btn-primary !py-3 gap-2 hidden sm:inline-flex"><Search className="h-4 w-4" /> Find gaps</button>
              </form>
              <button onClick={onFind as any} className="sm:hidden mt-2 w-full btn-primary">Find gaps</button>
              <div className="mt-3 flex items-center gap-2 text-[12px] text-[#64748B]"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Verification checks Crossref & OpenAlex for contradictory studies</div>
            </div>
            <div className="relative hidden lg:block bg-[#F8FAFC] border-l border-[#E2E8F0]">
              <Image src="/images/use-case-researcher.jpg" alt="Researcher" width={440} height={320} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 bg-white border border-[#E2E8F0] rounded-[10px] p-3 flex gap-2">
                <span className="h-8 w-8 rounded-full bg-[#4F46E5] text-white grid place-items-center"><Layers className="h-4 w-4" /></span>
                <div className="text-[12px]"><div className="font-medium">Population • Geography • Method</div><div className="text-[#64748B]">Gaps by type, not slogans</div></div>
              </div>
            </div>
          </div>

          {/* Video + Gap list */}
          <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6">
            <div className="space-y-4">
              {gaps.map(g => (
                <div key={g.id} className="card p-5">
                  <div className="flex items-center gap-2">
                    <span className="badge-bright">{g.type}</span>
                    <span className="text-[12px] text-[#64748B]">{g.verification}</span>
                  </div>
                  <div className="font-semibold mt-2">{g.title}</div>
                  <p className="text-[14px] text-[#475569] mt-1 leading-relaxed">{g.evidence}</p>
                  <div className="mt-3 rounded-[10px] bg-[#EEF2FF] border border-[#C7D2FE] p-3">
                    <div className="text-[12px] font-semibold text-[#4338CA]">Draft RQ</div>
                    <div className="text-[13px] mt-1">{g.draftRQ}</div>
                  </div>
                  <Link href="/writing" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4F46E5]">Use in manuscript <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="card overflow-hidden">
                <video autoPlay muted loop playsInline poster="/images/hero-workspace.jpg" className="w-full h-[160px] object-cover">
                  <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
                </video>
                <div className="p-4">
                  <div className="font-medium text-[14px] flex items-center gap-2"><Play className="h-4 w-4 text-[#4F46E5]" /> How verification works</div>
                  <p className="text-[13px] text-[#64748B] mt-1">We re-query for counter-evidence so you don’t claim a gap that isn’t there.</p>
                </div>
              </div>
              <div className="card p-4">
                <Image src="/images/use-case-team.jpg" alt="Team" width={400} height={160} className="rounded-[10px] w-full h-[140px] object-cover border border-[#E2E8F0]" />
                <div className="font-medium mt-3">For teams, for theses, for labs</div>
                <p className="text-[13px] text-[#64748B] mt-1">Share gaps, keep one source of truth, and export the verification log for your appendix.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
