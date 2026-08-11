"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sparkles, ShieldCheck, ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function GapsPage(){
  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5">
            <h1 className="text-[22px] font-black tracking-tight flex items-center gap-2"><img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100 inline-block mr-2.5 -mt-1" /> <Sparkles className="h-5 w-5 text-moni-500" /> Gaps</h1>
            <p className="text-[18px] text-black font-medium">Turn patterns into a gap statement you can defend.</p>
          </div>
        </header>
        <PageTransition><main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-6">
          <div className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7">
            <h2 className="font-black tracking-tight">How MONIRESH finds gaps - honestly</h2>
            <p className="text-[18px] text-black mt-1.5 leading-relaxed font-medium max-w-[640px]">We don’t invent gaps. We map what you collected: who was studied, where, how, and what was found. Contradictions and blind spots emerge from <em>your</em> evidence.</p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                ["Population", "Students vs lecturers vs admins - who’s missing?"],
                ["Geography", "Which countries appear, which don’t - and is it a real absence?"],
                ["Method & theory", "Cross-sectional vs longitudinal, TAM vs UTAUT - what’s overused?"],
              ].map(([k,d])=>(
                <div key={k} className="rounded-2xl border border-pink-50 bg-[#FFFEFE] p-4">
                  <div className="text-[16px] font-bold tracking-widest uppercase text-moni-500">{k}</div>
                  <div className="text-[18px] font-medium text-black mt-1 leading-relaxed">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-dashed border-pink-200 bg-white p-8 lg:p-10 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-moni-50 border border-moni-100 flex items-center justify-center"><Lightbulb className="h-5 w-5 text-moni-500" /></div>
            <h3 className="mt-4 font-black">No collection yet - no gaps to show</h3>
            <p className="text-[18px] text-black mt-1.5 max-w-[520px] mx-auto font-medium">Add and screen some papers first. Then this page will map your field and surface candidates - with a verification check so you don’t claim a gap that isn’t there.</p>
            <div className="mt-6 rounded-2xl bg-moni-50 border border-moni-100 p-4 text-left max-w-[640px] mx-auto">
              <div className="text-[18px] font-bold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Verification - not hallucination</div>
              <p className="text-[18px] text-black mt-1 leading-relaxed">For each candidate gap we re-search specifically against it (e.g., “Nigeria”, recent years, dissertations) and report whether we found counter-evidence. You get a confidence, not a slogan.</p>
            </div>
            <Link href="/literature" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-white font-bold">Start in Literature <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="rounded-[20px] border border-pink-100 bg-white p-6">
            <h3 className="font-black">What you’ll see when it’s real</h3>
            <p className="text-[18px] text-black font-medium">Your gap cards will show: type, evidence (“Only 3 of 12 included studies…”), verification result, and a draft research question - all linked to the papers they came from.</p>
          </div>
        </main></PageTransition>
      </div>
    </div>
  )
}
